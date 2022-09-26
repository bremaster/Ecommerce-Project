import React from 'react'

import { Box, Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

import { GradientButton } from './components/GradientButton'

export type ServiceProps = {
  isMdSize: boolean
}

const Wrap = styled(Box)({
  width: '100%',
  background:
    'linear-gradient(99.92deg, rgb(254 170 105 / 30%) -11.07%, rgb(254 139 123 / 30%) 49.11%, rgb(143 123 234 / 30%) 133.09%)',
  paddingTop: 169,
  paddingBottom: 137,
})

const ServiceWrap = styled(Stack)({
  gap: '51px',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 auto',
  flexDirection: 'row',
  padding: '0 30px',
  maxWidth: 1100,
})

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
  display: 'flex',
})

const ServiceItem = styled(Stack)({
  maxWidth: '341px',
  height: '341px',
  width: '100%',
  backgroundColor: 'white',
  borderRadius: '10px',
  '& img': {
    height: 130,
  },
  '& h3': {
    color: '#4A4A4A',
    fontFamily: 'Noto Sans JP',
    fontWeight: 700,
    fontSize: '15px',
    lineHeight: '25px',
    letterSpacing: '0.15em',
    textAlign: 'center',
  },
  '& p': {
    color: '#4A4A4A',
    fontFamily: 'Noto Sans JP',
    fontWeight: 400,
    letterSpacing: '0.05em',
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '21px',
  },
})

const BorderBottom = styled(Box)({
  height: 4,
  backgroundColor: '#FE8B7B',
  borderRadius: '2px',
})

export const Service = ({ isMdSize }: ServiceProps) => {
  return (
    <>
      {!isMdSize && (
        <Stack alignItems="center" pt="98px" pb="51px">
          <GradientButton />
        </Stack>
      )}

      <Wrap>
        <ServiceWrap>
          <ServiceLapTopText>
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
          <ServiceItem justifyContent="center" alignItems="center" gap={'15.4px'}>
            <Stack justifyContent="center" alignItems="center">
              <Box component="img" src="/landing/service/service1.webp" />
            </Stack>
            <Stack gap={'18px'}>
              <Stack>
                <Typography component="h3">3つの中から</Typography>
                <Stack direction="row" justifyContent="center">
                  <Stack>
                    <Typography component="h3">相手が</Typography>
                    <BorderBottom />
                  </Stack>
                  <Typography component="h3">選べる</Typography>
                </Stack>
              </Stack>
              <Typography component="p">
                贈る人が選んだギフトの中から
                <br />
                好きなモノを選んで受け取れます。
              </Typography>
            </Stack>
          </ServiceItem>
        </ServiceWrap>

        {/* Item List*/}
      </Wrap>
    </>
  )
}
