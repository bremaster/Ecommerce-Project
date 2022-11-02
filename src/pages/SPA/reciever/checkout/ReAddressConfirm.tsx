import React, { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { GradientButton } from 'atoms'
import { Card } from 'organisms'
import { Layout } from 'templates/Layout'
import { Box, Typography, Divider, Stack } from '@mui/material'

import { COLOR } from 'theme'
import { formatPhoneNumber } from 'utilities/formatPhoneNumber'

import { styled } from '@mui/system'

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

const Label = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '25px',
  letterSpacing: '0.03em',
  textAlign: 'left',
  color: '#4A4A4A',
  width: '25%',
  [props.theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

const Value = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '23px',
  letterSpacing: '0.03em',
  textAlign: 'left',
  color: '#4A4A4A',
})

type Props = {
  recieverName?: string
  email?: string
  postalCode?: string
  prefecture?: string
  address1?: string
  address2?: string
  phoneNumber?: string
  onClickNextButton: () => void
  isPreview?: boolean
  children?: React.ReactNode
}

export const AddressConfirm: React.FC<Props> = ({
  recieverName,
  email,
  postalCode,
  prefecture,
  address1,
  address2,
  phoneNumber,
  onClickNextButton,
  isPreview = false,
  children,
}) => {
  const { handleSubmit } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const onSubmit = () => {
    onClickNextButton()
  }

  // タップした後に、初期位置が下の方になるのを防ぐため
  // グローバルに設定しても良いかも
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

  return (
    <>
      <Layout maxWidth="md">
        <PageTitle />

        {/* gift info */}
        <Card num={1} header="選んだギフト" width="100%" mb="2rem">
          {children}
        </Card>

        <form key={2} onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Card num={2} header="お届け先情報" width="100%">
            <Stack gap={{ md: 1.5, xs: 1 }} mb={{ md: '35px', xs: '13px' }}>
              <Stack direction={{ md: 'row', xs: 'column' }}>
                <Label>お名前</Label>
                <Value>{recieverName}</Value>
              </Stack>

              <Divider />

              <Stack direction={{ md: 'row', xs: 'column' }}>
                <Label>メールアドレス</Label>
                <Value>{email}</Value>
              </Stack>

              <Divider />

              <Stack direction={{ md: 'row', xs: 'column' }}>
                <Label>電話番号</Label>
                <Value>{formatPhoneNumber(phoneNumber)}</Value>
              </Stack>

              <Divider />

              <Stack direction={{ md: 'row', xs: 'column' }}>
                <Label>郵便番号</Label>
                <Value>
                  〒{postalCode && postalCode.slice(0, 3) + '-' + postalCode.slice(3)}
                </Value>
              </Stack>

              <Divider />

              <Stack direction={{ md: 'row', xs: 'column' }}>
                <Label>住所</Label>
                <Value>
                  {prefecture ? prefecture : ''}
                  {address1} {address2 ? address2 : ''}
                </Value>
              </Stack>
            </Stack>
          </Card>
          <Box width="100%" my="3rem">
            <GradientButton type="submit">ギフトを受け取る</GradientButton>
          </Box>
        </form>
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
      入力内容の確認
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
      confirmation
    </Typography>
  </Stack>
)
