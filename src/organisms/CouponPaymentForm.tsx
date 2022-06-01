/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, ChangeEvent } from 'react'

import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Typography, Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { jsx } from '@emotion/core'

import { SquareButton, CloseIcon } from 'atoms'
import { FormRow } from 'molecules'
import {
  ConfirmationModal,
  TermsOfService,
  Alert,
  ConfirmationSection,
  LoadingModal,
} from 'organisms'
import { usePreventClickMashing } from 'utilities/CommonHooks'

const SETTING = {
  api: {
    url: process.env.REACT_APP_CLOUD_RUN_CADU_API_URL,
    //url: "https://cadu-apiserver-3itmlfcdwa-an.a.run.app",
    //url: "http://localhost:8000"
  },
}

type Props = {
  goodsIds: string[]
  items: {
    image: string
    brand: string
    name: string
  }[]
  price: number
  message: string
  loginUser: {
    name: string
    email: string
    phone: string
  }
  setExpire: (arg: string) => void
  isNewsletter: boolean
}

const defaultProps: Props = {
  goodsIds: ['5liIy9sCl2O8C32sZtjlLp'],
  items: [],
  price: 5000,
  message: 'happy birth day to you',
  loginUser: {
    name: 'Asdf Asdf',
    email: 'sadf@gmail.com',
    phone: '09099993333',
  },
  setExpire: (arg) => alert(`expires at ${arg}`),
  isNewsletter: false,
}

const useStyles = makeStyles({
  title: {
    textTransform: 'none',
    fontWeight: 700,
    fontSize: '14px',
  },
})

const CouponPaymentForm: React.FC<Props> = (props) => {
  const classes = useStyles()
  const [coupon, setCoupon] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [trunsactionState, setTransactionState] = useState<undefined | 'running'>(
    undefined
  )
  const [error, setError] = useState<string>('')
  const { withClickStopSideEffect, setClickableStatus } = usePreventClickMashing()

  const history = useHistory()

  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const onChangeCouponInput = (e: ChangeEvent<HTMLInputElement>) =>
    setCoupon(e.target.value)

  const onSubmitFinally = async () => {
    setTransactionState('running')
    const reqUrl = `${SETTING.api.url}/cardwithcoupon`
    const reqBody = JSON.stringify({
      coupon: coupon,
      selected: props.goodsIds,
      idToken: 'NOIDTOKENFORNOW',
      amount: props.price,
      message: props.message.trim(),
      name: props.loginUser.name,
      email: props.loginUser.email,
      phone: props.loginUser.phone,
      isNewsletter: props.isNewsletter,
    })
    const successCallback = (json: { Expires: string; Token: string }) => {
      props.setExpire(json.Expires)
      history.push(`/product/success?token=${json.Token}`)
    }
    try {
      const response = await fetch(reqUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: reqBody,
      })
      const json = await response.json()
      if (json.Success == true) {
        successCallback(json)
      } else {
        setTransactionState(undefined)
        setClickableStatus('CLICKABLE')
        setError('決済に失敗しました。クーポンコードに誤りがないかご確認ください。')
      }
    } catch (err) {
      closeModal()
      setTransactionState(undefined)
      setClickableStatus('CLICKABLE')
      setError('エラーが発生しました。通信環境をご確認ください。')
      console.log(err)
      // TODO: send error to google analytics
      // setError('エラーが発生しました:' + err);
    }
  }

  return (
    <form onSubmit={handleSubmit(openModal)}>
      <Box width="100%" mb={1}>
        {/* TODO: dynamically change collaborator name */}
        <Typography className={classes.title}>Ploom X CLUB クーポンコード</Typography>
      </Box>
      <FormRow
        value={coupon}
        onChange={onChangeCouponInput}
        type="text"
        id="senderCouponCode"
        register={register({
          required: true,
          pattern: /^[0-9a-zA-Z]{1,15}$/,
        })}
        invalid={!!errors.senderCouponCode}
        placeholder="クーポンコードを入力してください"
        errorMessage="クーポンコードに誤りがあります。"
      />
      <Box width="100%" mt={5}>
        <TermsOfService />
      </Box>
      <SquareButton buttonType={'primary'} fullWidth={true} type="submit">
        確認する
      </SquareButton>
      <ConfirmationModal onClose={closeModal} isOpen={isModalOpen}>
        <Box>
          <Box display="grid" gridTemplateColumns="1fr 1fr" px="18px">
            <Box gridColumn="1 / 3" gridRow="1 / 2">
              <Typography
                variant="h6"
                css={{
                  textAlign: 'center',
                  padding: '23px 0',
                  fontWeight: 700,
                  fontSize: '18px',
                  letterSpacing: '0.05em',
                }}
              >
                ご注文内容の確認
              </Typography>
            </Box>
            <Box gridColumn=" 2/ 3" gridRow="1 / 2" alignSelf="center" justifySelf="end">
              <CloseIcon onClick={closeModal} />
            </Box>
          </Box>
          <ConfirmationSection
            sender={props.loginUser}
            items={props.items}
            price={props.price}
          />
          <Box mt={3} mb={2} px="18px">
            <SquareButton
              buttonType={'primary'}
              fullWidth={true}
              onClick={withClickStopSideEffect(onSubmitFinally)}
            >
              注文する
            </SquareButton>
          </Box>
        </Box>
      </ConfirmationModal>
      {trunsactionState === 'running' && <LoadingModal />}
      {error && <Alert message={error} handleClose={() => setError('')} />}
    </form>
  )
}

CouponPaymentForm.defaultProps = defaultProps
export { CouponPaymentForm }
