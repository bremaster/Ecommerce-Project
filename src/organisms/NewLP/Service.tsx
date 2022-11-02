import React from 'react'

import { Box, Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

import { LpGradientButton, ServiceItem } from 'molecules'

export type ServiceProps = {
  isMdSize: boolean
}

const ServiceWrap = styled(Box)((props) => ({
  width: '100%',
  background:
    'linear-gradient(99.92deg, rgb(254 170 105 / 30%) -11.07%, rgb(254 139 123 / 30%) 49.11%, rgb(143 123 234 / 30%) 133.09%)',
  paddingTop: 169,
  paddingBottom: 137,
  [props.theme.breakpoints.down('md')]: {
    paddingBottom: 69,
    paddingTop: 72,
  },
}))

const ServiceLapTopText = styled(Stack)({
  '& h3': {
    fontFamily: 'Outfit',
    fontWeight: 700,
    fontSize: '36px',
    lineHeight: '65px',
    letterSpacing: '0.08em',
  },
  '& p': {
    fontFamily: 'Noto Sans JP',
    fontSize: '24px',
    fontWeight: 400,
    lineHeight: '60px',
    letterSpacing: '0.08em',
    textAlign: 'left',
  },
})

const ServiceMobileText = styled(Stack)({
  width: 341,
  paddingLeft: '12px',
  '& h3': {
    fontFamily: 'Outfit',
    fontWeight: 700,
    fontSize: 26,
    letterSpacing: '0.08em',
    lineHeight: 1,
  },
  '& p': {
    fontFamily: 'Noto Sans JP',
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '0.08em',
    textAlign: 'left',
  },
})

const ServiceData = {
  image: '/landing/service/service1.webp',
  title: ['3つの中から', '相手が', '選べる'],
  subTitle: ['贈る人が選んだギフトの中から', '好きなモノを選んで受け取れます。'],
}

export const Service = ({ isMdSize }: ServiceProps) => {
  return (
    <>
      {!isMdSize && (
        <Stack alignItems="center" pt="98px" pb="51px">
          <LpGradientButton />
        </Stack>
      )}

      <ServiceWrap id="choose">
        <Stack
          gap={'51px'}
          alignItems="center"
          justifyContent="space-between"
          direction={{ md: 'row', xs: 'column' }}
          mx="auto"
          px={{ md: '30px', xs: 0 }}
          sx={{ maxWidth: 1100 }}
        >
          <ServiceLapTopText display={{ md: 'flex', xs: 'none' }}>
            <Stack>
              <Typography component="h3">そろそろもらって嬉しいギフト</Typography>
              <Typography component="h3">贈りませんか？</Typography>
            </Stack>
            <Stack mt="37px">
              <Typography component="p">自分が選んだギフトから相手が選択️</Typography>
              <Typography component="p">新しいギフト体験</Typography>
              <Typography component="p">住所を知らなくてもオンラインで簡単</Typography>
            </Stack>
          </ServiceLapTopText>
          <ServiceMobileText display={{ md: 'none', xs: 'flex' }}>
            <Stack gap="20px">
              <Typography component="h3">そろそろ</Typography>
              <Typography component="h3">もらって嬉しいギフト</Typography>
              <Typography component="h3">贈りませんか？</Typography>
            </Stack>
            <Stack gap="21px" mt="50px">
              <Typography component="p">自分が選んだギフトから相手が選択️</Typography>
              <Typography component="p">新しいギフト体験</Typography>
              <Typography component="p">住所を知らなくてもオンラインで簡単</Typography>
            </Stack>
          </ServiceMobileText>
          <ServiceItem data={ServiceData} />
        </Stack>
        {/* Item List*/}
      </ServiceWrap>
    </>
  )
}
