import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { Checkbox, GradientButton } from 'atoms'
import { FormRow, PullDownFormRow } from 'molecules'
import { TermsOfService, Card } from 'organisms'
import { Layout } from 'templates/Layout'
import {
  InputProps,
  Box,
  Typography,
  Divider,
  SelectChangeEvent,
  Stack,
} from '@mui/material'

import { checkHalfWidth } from 'utilities/checkHalfWidth'
import { checkAddress } from 'utilities/checkAddress'

import { COLOR } from 'theme'
import { TODOFUKEN_LIST } from 'constants/address'

import { styled } from '@mui/system'

const FormRoot = styled('form')({
  width: '100%',
  '& #alert': {
    padding: 0,
    color: '#FE8B7B',
  },
})

const Section = styled(Typography)({
  fontSize: '14px',
  fontWeight: 700,
})

const StyledDivider = styled(Divider)((props) => ({
  borderColor: COLOR.subtleGray,
  width: '100vw',
  maxWidth: props.theme.breakpoints.values.md,
  marginTop: props.theme.spacing(3),
  marginBottom: props.theme.spacing(3),
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
  isPreview?: boolean
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
  isPreview = false,
  children,
}) => {
  const emailtype =
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
  const navigate = useNavigate()

  const [firstRender, setFirstRender] = useState(true)

  const [errors, setErrors] = useState({
    recieverName: '',
    phoneNumber: '',
    email: '',
    postalCode: '',
    prefecture: '',
    address1: '',
    address2: '',
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validation = validationSubmit()

    if (!validation) {
      navigate(`/gift/confirm`)
    } else {
      const errorElement = document.getElementById(validation)

      errorElement?.scrollIntoView()
    }
  }

  // タップした後に、初期位置が下の方になるのを防ぐため
  // グローバルに設定しても良いかも
  useEffect(() => {
    window.scrollTo(0, 0)
    setFirstRender(false)
  }, [])

  useEffect(() => {
    if (!firstRender) {
      let tempError = Object.assign(errors)

      if (prefecture === '') {
        tempError = {
          ...tempError,
          prefecture: '都道府県を選択してください',
        }
      } else {
        tempError = {
          ...tempError,
          prefecture: '',
        }
      }

      if (!checkAddress(address1 ? address1 : '')) {
        tempError = {
          ...tempError,
          address1: '番地を入力してください',
        }
      }

      if (address1 === '') {
        tempError = {
          ...tempError,
          address1: '必須項目を入力してください',
        }
      }

      setErrors(tempError)
    }
  }, [prefecture, address1])

  if (isPreview) {
    return (
      <Layout maxWidth="md">
        {/* gift info */}
        <Box width="100%" mb={1} mt={2}>
          <Section>お受取りギフト</Section>
        </Box>
        {children}
        <StyledDivider />
        {/* reciever info */}
        <Box width="100%" mb={1}>
          <Section my="3rem">
            以降でギフトの貰い主様に配送先の住所などを入力いただき完了となります。
          </Section>
        </Box>
      </Layout>
    )
  }

  const validationSubmit = () => {
    let flag
    let tempError = Object.assign(errors)
    if (recieverName == '') {
      tempError = {
        ...tempError,
        recieverName: '必須項目を入力してください',
      }
      flag = 'recieverName'
    }

    if (phoneNumber) {
      if (phoneNumber?.length > 11) {
        tempError = {
          ...tempError,
          phoneNumber: '10桁または11桁で入力してください',
        }
        if (!flag) flag = 'phoneNumber'
      }
    }

    if (!checkHalfWidth(phoneNumber)) {
      tempError = {
        ...tempError,
        phoneNumber: '半角数字のみで入力してください',
      }
      if (!flag) flag = 'phoneNumber'
    }

    if (phoneNumber == '') {
      tempError = {
        ...tempError,
        phoneNumber: '必須項目を入力してください',
      }
      if (!flag) flag = 'phoneNumber'
    }

    if (!emailtype.test(email ? email : '')) {
      tempError = {
        ...tempError,
        email: '正しいメールアドレスを入力してください',
      }
      if (!flag) flag = 'email'
    }

    if (email == '') {
      tempError = {
        ...tempError,
        email: '必須項目を入力してください',
      }
      if (!flag) flag = 'email'
    }

    if (!checkHalfWidth(postalCode)) {
      tempError = {
        ...tempError,
        postalCode: '半角数字7桁で入力してください',
      }
      if (!flag) flag = 'postalCode'
    }

    if (postalCode) {
      if (postalCode.length !== 7) {
        tempError = {
          ...tempError,
          postalCode: '半角数字のみで入力してください',
        }
        if (!flag) flag = 'postalCode'
      }
    }

    if (postalCode == '') {
      tempError = {
        ...tempError,
        postalCode: '必須項目を入力してください',
      }
      if (!flag) flag = 'postalCode'
    }

    if (prefecture === '') {
      tempError = {
        ...tempError,
        prefecture: '都道府県を選択してください',
      }
      if (!flag) flag = 'prefecture'
    } else {
      tempError = {
        ...tempError,
        prefecture: '',
      }
    }

    if (!checkAddress(address1 ? address1 : '')) {
      tempError = {
        ...tempError,
        address1: '番地を入力してください',
      }
      if (!flag) flag = 'address1'
    }

    if (address1 === '') {
      tempError = {
        ...tempError,
        address1: '必須項目を入力してください',
      }
      if (!flag) flag = 'address1'
    }

    setErrors(tempError)
    return flag
  }

  const validation = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    let flag = 0
    if (e.target.name == 'recieverName') {
      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '必須項目を入力してください',
        })
        flag++
      }
      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }

    if (e.target.name == 'phoneNumber') {
      if (!checkHalfWidth(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]: '半角数字のみで入力してください',
        })
        flag++
      }
      if (e.target.value.length > 11) {
        setErrors({
          ...errors,
          [e.target.name]: '10桁または11桁で入力してください',
        })
        flag++
      }
      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '必須項目を入力してください',
        })
        flag++
      }
      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }

    if (e.target.name == 'email') {
      if (!emailtype.test(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]: '正しいメールアドレスを入力してください',
        })
        flag++
      }
      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '必須項目を入力してください',
        })
        flag++
      }
      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }

    if (e.target.name == 'postalCode') {
      if (!checkHalfWidth(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]: '半角数字7桁で入力してください',
        })
        flag++
      }
      if (e.target.value.length !== 7) {
        setErrors({
          ...errors,
          [e.target.name]: '半角数字7桁で入力してください',
        })
        flag++
      }
      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '必須項目を入力してください',
        })
        flag++
      }
      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }

    if (e.target.name == 'prefecture') {
      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '都道府県を選択してください',
        })
        flag++
      }
      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }

    if (e.target.name == 'address1') {
      if (!checkAddress(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]: '番地を入力してください',
        })
        flag++
      }

      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '必須項目を入力してください',
        })
        flag++
      }

      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }
  }

  return (
    <>
      <Layout maxWidth="md">
        <PageTitle />
        {/* gift info */}
        <Card num={1} header="選んだギフト" width="100%" mb="2rem">
          {children}
        </Card>

        {/* reciever info */}
        <FormRoot onSubmit={onSubmit}>
          <Card num={2} header="お届け先情報" width="100%">
            <FormRow
              label="お名前"
              value={recieverName}
              onChange={(e) => {
                validation(e)
                onChangeRecieverName?.(e)
              }}
              type="text"
              id="recieverName"
              invalid={!!errors.recieverName}
              errorMessage={errors.recieverName}
              required
            />
            <FormRow
              label="電話番号(ハイフンなし)"
              value={phoneNumber}
              onChange={(e) => {
                if (/^[0-9]+$/.test(e.target.value) || e.target.value.length === 0) {
                  if (e.target.value.length < 12) {
                    validation(e)
                    onChangePhoneNumber?.(e)
                  }
                }
              }}
              type="tel"
              id="phoneNumber"
              invalid={!!errors.phoneNumber}
              errorMessage={errors.phoneNumber}
              required
            />
            <FormRow
              label="メールアドレス"
              value={email}
              onChange={(e) => {
                validation(e)
                onChangeEmail?.(e)
              }}
              type="email"
              id="email"
              invalid={!!errors.email}
              errorMessage={errors.email}
              required
            />
            <FormRow
              label="郵便番号(ハイフンなし)"
              value={postalCode}
              onChange={(e) => {
                if (/^[0-9]+$/.test(e.target.value) || e.target.value.length === 0) {
                  if (e.target.value.length <= 7) {
                    validation(e)
                    onChangePostalCode?.(e)
                  }
                }
              }}
              type="tel"
              id="postalCode"
              invalid={!!errors.postalCode}
              errorMessage={errors.postalCode}
              required
            />
            <PullDownFormRow
              label="都道府県"
              value={prefecture || ''}
              items={TODOFUKEN_LIST}
              onChange={(e) => {
                validation(e)
                const onNewChangePrefecture = onChangePrefecture as (
                  e: SelectChangeEvent<string>
                ) => void
                onNewChangePrefecture(e)
              }}
              id="prefecture"
              register={null}
              invalid={!!errors.prefecture}
              errorMessage={errors.prefecture}
              placeholder="都道府県を選択してください"
              required
            />
            <FormRow
              label="住所1（市区町村、番地等）"
              value={address1}
              onChange={(e) => {
                validation(e)
                onChangeAddress1?.(e)
              }}
              type="text"
              id="address1"
              invalid={!!errors.address1}
              errorMessage={errors.address1}
              placeholder="市区町村、番地等"
              required
            />
            <FormRow
              label="住所2（マンション名、部屋番号等）"
              value={address2}
              onChange={onChangeAddress2}
              type="text"
              id="address2"
              invalid={!!errors.address2}
              errorMessage={errors.address2}
              placeholder="マンション名、部屋番号等"
            />
            <Box sx={{ display: 'grid', placeItems: 'center' }}>
              <Checkbox
                label="最新情報やお知らせなどを受け取る"
                checked={!!isNewsletter}
                onClick={toggleNewsLetter}
              />
            </Box>
          </Card>
          <Box display="grid" sx={{ placeItems: 'center' }} mt="2rem">
            <Box px="1rem">
              <TermsOfService />
            </Box>
          </Box>
          <Box width="100%" my="3rem">
            <GradientButton type="submit">確認する</GradientButton>
          </Box>
        </FormRoot>
      </Layout>
    </>
  )
}
const PageTitle = () => (
  <Stack direction="column" alignItems="center" py="60px">
    <Typography
      sx={{
        fontFamily: "'Outfit'",
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '28px',
        lineHeight: '35px',
        textAlign: 'center',
        color: '#4A4A4A',
        marginBottom: '0.5rem',
      }}
    >
      ギフトを受け取る
    </Typography>
    <Typography
      sx={{
        fontFamily: "'Outfit'",
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '18px',
        letterSpacing: '0.05em',
        color: '#4A4A4A',
      }}
    >
      Receive a Gift
    </Typography>
  </Stack>
)
