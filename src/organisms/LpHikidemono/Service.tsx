import React from 'react'

import { Box, Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

import { HikidemonoGradientButton, ServiceHikidemonoItem } from 'molecules'

export type ServiceProps = {
  isMdSize: boolean
}

const ServiceWrap = styled(Box)((props) => ({
  width: '100%',
  background:
    'linear-gradient(99.92deg, rgba(254, 170, 105, 0.1) -11.07%, rgba(254, 139, 123, 0.1) 49.11%, rgba(143, 123, 234, 0.1) 133.09%)',
  paddingTop: 100,
  paddingBottom: 176,
  [props.theme.breakpoints.down('md')]: {
    paddingBottom: 67,
    paddingTop: 50,
  },
}))

const ServiceText = styled(Stack)((props) => ({
  gap: '75px',
  '& h3': {
    fontFamily: 'Outfit',
    fontWeight: 700,
    fontSize: '34px',
    lineHeight: '55px',
    letterSpacing: '0.2em',
    color: '#4A4A4A',
  },
  '& p': {
    fontFamily: 'Noto Sans JP',
    fontSize: '30px',
    fontWeight: 400,
    lineHeight: '60px',
    letterSpacing: '0.08em',
    textAlign: 'center',
    color: '#4A4A4A',
  },
  [props.theme.breakpoints.down('md')]: {
    gap: '50px',
    '& h3': {
      fontSize: '24px',
      lineHeight: '40px',
      letterSpacing: '0.1em',
    },
    '& p': {
      fontSize: '18px',
      lineHeight: '36px',
    },
  },
}))

const BorderBottom = styled(Box)({
  height: 4,
  backgroundColor: '#FE8B7B',
  borderRadius: '2px',
})

const ServiceData = [
  {
    image: '/landing/service/hikidemono/service1.png',
    title: ['商品ごとに支払います。', '無駄な', '手数料は一切無し'],
    subTitle: [
      '通常カタログギフトではどれを選んでも一',
      '律の価格。ZEFTは商品ごとの実費なので',
      '無駄なコスト削減',
    ],
  },
  {
    image: '/landing/service/hikidemono/service2.png',
    title: ['後払いだから', '選ばれなければ', '支払い不要'],
    subTitle: [
      'カタログギフトと違い先に購入しないので',
      '受け取り完了にならなければ支払い不要',
    ],
  },
  {
    image: '/landing/service/hikidemono/service3.png',
    title: ['荷物にならず', 'オンラインで', 'いつでも簡単に'],
    subTitle: [
      'リンクを作成して贈るのでLINEやメール',
      'やSNS等でいつでも簡単に贈れます。',
    ],
  },
]

export const Service = ({ isMdSize }: ServiceProps) => {
  return (
    <>
      {!isMdSize && (
        <Stack alignItems="center" pt="98px" pb="94px">
          <HikidemonoGradientButton />
        </Stack>
      )}
      <ServiceWrap id="choose">
        <ServiceText>
          <Stack alignItems="center" gap={'10px'}>
            <Stack direction="row" justifyContent="center">
              <Typography component="h3">ZEFTは</Typography>
              <Stack>
                <Typography component="h3">後払いなので</Typography>
                <BorderBottom />
              </Stack>
            </Stack>
            <Stack>
              <Typography component="h3">圧倒的に安い</Typography>
              <BorderBottom />
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Typography component="p">まずはギフトを選んで</Typography>
            <Typography component="p">カタログギフトをつくろう。</Typography>
          </Stack>
        </ServiceText>

        <Stack
          gap={{ md: '20px', xs: '23px' }}
          alignItems="center"
          justifyContent="center"
          direction={{ md: 'row', xs: 'column' }}
          mx="auto"
          px={{ md: '30px', xs: 0 }}
          sx={{ maxWidth: 1260 }}
          mt={{ md: 20, xs: '45px' }}
        >
          {ServiceData.map((item, i) => (
            <ServiceHikidemonoItem data={item} key={i} />
          ))}
        </Stack>

        {/* Item List*/}
      </ServiceWrap>
    </>
  )
}
