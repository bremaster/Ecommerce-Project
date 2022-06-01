import React, { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { Checkbox, SquareButton } from 'atoms'
import { FormRow, PullDownFormRow } from 'molecules'
import { TermsOfService } from 'organisms'
import { Layout } from 'templates/Layout'
import { InputProps, Box, Typography, Divider, SelectChangeEvent } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

import { COLOR } from 'theme'
import { TODOFUKEN_LIST } from 'constants/address'

const useStyles = makeStyles((theme) => ({
  formRoot: {
    width: '100%',
  },
  section: {
    fontSize: '14px',
    fontWeight: 700,
  },
  divider: {
    borderColor: COLOR.subtleGray,
    width: '100vw',
    maxWidth: theme.breakpoints.values.md,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  checkboxForm: {
    '& .MuiFormControlLabel-label': {
      fontSize: '14px',
    },
    '& .Mui-checked': {
      color: COLOR.primaryNavy,
    },
    '& .MuiIconButton-colorSecondary:hover': {
      // change opacity
      backgroundColor: `${COLOR.primaryNavy}11`,
    },
  },
}))

type Props = {
  recieverName?: string
  onChangeRecieverName?: InputProps['onChange']
  email?: string
  onChangeEmail: InputProps['onChange']
  postalCode?: string
  onChangePostalCode: InputProps['onChange']
  prefecture?: string
  onChangePrefecture?: InputProps['onChange']
  address1?: string
  onChangeAddress1: InputProps['onChange']
  address2?: string
  onChangeAddress2: InputProps['onChange']
  phoneNumber?: string
  onChangePhoneNumber: InputProps['onChange']
  isNewsletter?: boolean
  toggleNewsLetter: () => void
  onClickNextButton: () => void
  children?: React.ReactNode
}

export const AddressForm: React.FC<Props> = ({
  recieverName,
  onChangeRecieverName,
  email,
  onChangeEmail,
  postalCode,
  onChangePostalCode,
  prefecture,
  onChangePrefecture,
  address1,
  onChangeAddress1,
  address2,
  onChangeAddress2,
  phoneNumber,
  onChangePhoneNumber,
  isNewsletter,
  toggleNewsLetter,
  onClickNextButton,
  children,
}) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const onSubmit = () => {
    onClickNextButton()
  }

  const classes = useStyles()

  // タップした後に、初期位置が下の方になるのを防ぐため
  // グローバルに設定しても良いかも
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      {/* gift info */}
      <Box width="100%" mb={1} mt={2}>
        <Typography className={classes.section}>お受取りギフト</Typography>
      </Box>
      {children}

      <Divider className={classes.divider} />

      {/* reciever info */}
      <Box width="100%" mb={1}>
        <Typography className={classes.section}>お届け先情報（必須）</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formRoot}>
        <FormRow
          label="お名前"
          value={recieverName}
          onChange={onChangeRecieverName}
          type="text"
          id="recieverName"
          register={register({ required: true })}
          invalid={!!errors.recieverName}
          errorMessage="お名前に誤りがあります。"
        />
        <FormRow
          label="電話番号(ハイフンなし)"
          value={phoneNumber}
          onChange={onChangePhoneNumber}
          type="tel"
          id="phoneNumber"
          register={register({
            required: true,
            pattern: /^[0-9]{10,11}$/,
          })}
          invalid={!!errors.phoneNumber}
          errorMessage="電話番号に誤りがあります。"
        />
        <FormRow
          label="メールアドレス"
          value={email}
          onChange={onChangeEmail}
          type="email"
          id="email"
          register={register({
            required: true,
            pattern: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
          })}
          invalid={!!errors.email}
          errorMessage="メールアドレスに誤りがあります。"
        />
        <FormRow
          label="郵便番号(ハイフンなし)"
          value={postalCode}
          onChange={onChangePostalCode}
          type="phone"
          id="postalCode"
          register={register({
            required: true,
            pattern: /^[0-9]{7}$/,
          })}
          invalid={!!errors.postalCode}
          errorMessage="郵便番号に誤りがあります。"
        />
        <PullDownFormRow
          label="都道府県"
          value={prefecture || ''}
          items={TODOFUKEN_LIST}
          onChange={onChangePrefecture as (e: SelectChangeEvent<string>) => void}
          register={register({
            required: true,
          })}
          invalid={!!errors.prefecture}
          errorMessage="都道府県に誤りがあります。"
          placeholder="都道府県を選択してください"
        />

        {/* <FormRow */}
        {/*   label="都道府県" */}
        {/*   value={prefecture} */}
        {/*   onChange={onChangePrefecture} */}
        {/*   type="text" */}
        {/*   id="prefecture" */}
        {/*   register={register({ */}
        {/*     required: true, */}
        {/*   })} */}
        {/*   invalid={!!errors.prefecture} */}
        {/*   errorMessage="都道府県に誤りがあります。" */}
        {/* /> */}
        <FormRow
          label="住所1（市区町村、番地等）"
          value={address1}
          onChange={onChangeAddress1}
          type="text"
          id="address1"
          register={register({
            required: true,
          })}
          invalid={!!errors.address1}
          errorMessage="住所に誤りがあります。"
          placeholder="市区町村、番地等"
        />
        <FormRow
          label="住所2（マンション名、部屋番号等）"
          value={address2}
          onChange={onChangeAddress2}
          type="text"
          id="address2"
          required={false}
          register={register({
            required: false,
          })}
          invalid={!!errors.address2}
          errorMessage="住所に誤りがあります。"
          placeholder="マンション名、部屋番号等"
        />
        <Box sx={{ display: 'grid', placeItems: 'center' }}>
          <Checkbox
            label="最新情報やお知らせなどを受け取る"
            checked={!!isNewsletter}
            onClick={toggleNewsLetter}
          />
        </Box>
        <Box display="grid" sx={{ placeItems: 'center' }}>
          <Box px="1rem">
            <TermsOfService />
          </Box>
        </Box>
        <Box width="100%" my={5}>
          <SquareButton fullWidth buttonType="primary" type="submit">
            確認する
          </SquareButton>
        </Box>
      </form>
    </Layout>
  )
}
