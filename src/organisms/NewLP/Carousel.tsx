import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { CommonTitle, LpGradientButton, TitleWrap } from 'molecules'

const CarouselItem = styled(Box)({
  width: '240px !important',
  height: '286px',
  padding: '0 10px',
  overflow: 'hidden',
  borderRadius: '10px',
  '& div': {
    width: '100%',
    height: '100%',
    display: 'flex !important',
    alignItems: 'center',
    overflow: 'hidden',
  },
  '& img': {
    width: '220px !important',
    height: '220px',
    borderRadius: '30px',
    cursor: 'pointer',
  },
})

const ItemText = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '21px',
  letterSpacing: '0.08em',
  textAlign: 'center',
  color: '#4A4A4A',
})

const Wrap = styled(Box)((props) => ({
  position: 'relative',
  overflow: 'hidden',
  marginTop: 177,
  [props.theme.breakpoints.down(900)]: {
    marginTop: 100,
  },
}))

const SliderWrap = styled(Box)((props) => ({
  paddingTop: '100px',
  [props.theme.breakpoints.down(900)]: {
    paddingTop: '50px',
  },
}))

export type CarouselProps = {
  howManyInCart: number
  isMdSize: boolean
}

export const Carousel = ({ howManyInCart, isMdSize }: CarouselProps) => {
  const navigate = useNavigate()

  const goToChoose = () => {
    if (howManyInCart === 0) {
      navigate('/product/onboarding')
    } else {
      navigate('/product/choose')
    }
  }

  const settings = {
    className: 'slider variable-width',
    infinite: true,
    speed: 500,
    slidesToScroll: 2,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speedplaySpeed: 2000,
    cssEase: 'linear',
    arrows: false,
    centerMode: true,
  }

  return (
    <Wrap>
      <TitleWrap>
        <CommonTitle title="POPULAR GIFTS" subtitle="人気のギフト" />
      </TitleWrap>

      <SliderWrap>
        <Slider {...settings}>
          <CarouselItem>
            <Stack justifyContent="space-between" gap={3}>
              <Box
                component="img"
                src="/landing/item_list/img_0.webp"
                onClick={goToChoose}
              />
              <Stack sx={{ height: '42px !important' }} justifyContent="center">
                <ItemText>スタイ Cercle2</ItemText>
              </Stack>
            </Stack>
          </CarouselItem>
          <CarouselItem>
            <Stack justifyContent="space-between" gap={3}>
              <Box
                component="img"
                src="/landing/item_list/img_1.webp"
                onClick={goToChoose}
              />
              <Stack sx={{ height: '42px !important' }} justifyContent="center">
                <ItemText>フライパンジュウ</ItemText>
              </Stack>
            </Stack>
          </CarouselItem>
          <CarouselItem>
            <Stack justifyContent="space-between" gap={3}>
              <Box
                component="img"
                src="/landing/item_list/img_2.webp"
                onClick={goToChoose}
              />
              <Stack sx={{ height: '42px !important' }} justifyContent="center">
                <ItemText>
                  ハンドクレンザースプレー
                  <br />
                  3色セット
                </ItemText>
              </Stack>
            </Stack>
          </CarouselItem>
          <CarouselItem>
            <Stack justifyContent="space-between" gap={3}>
              <Box
                component="img"
                src="/landing/item_list/img_3.webp"
                onClick={goToChoose}
              />
              <Stack sx={{ height: '42px !important' }} justifyContent="center">
                <ItemText>
                  フロマージュ アグリューム
                  <br />
                  ケーキ 4号(12cm)
                </ItemText>
              </Stack>
            </Stack>
          </CarouselItem>
          <CarouselItem>
            <Stack justifyContent="space-between" gap={3}>
              <Box
                component="img"
                src="/landing/item_list/img_4.webp"
                onClick={goToChoose}
              />
              <Stack sx={{ height: '42px !important' }} justifyContent="center">
                <ItemText>CBD WATER LOTION</ItemText>
              </Stack>
            </Stack>
          </CarouselItem>
          <CarouselItem>
            <Stack justifyContent="space-between" gap={3}>
              <Box
                component="img"
                src="/landing/item_list/img_5.webp"
                onClick={goToChoose}
              />
              <Stack sx={{ height: '42px !important' }} justifyContent="center">
                <ItemText>野菜のお塩【箱入り】</ItemText>
              </Stack>
            </Stack>
          </CarouselItem>
          <CarouselItem>
            <Stack justifyContent="space-between" gap={3}>
              <Box
                component="img"
                src="/landing/item_list/img_6.webp"
                onClick={goToChoose}
              />
              <Stack sx={{ height: '42px !important' }} justifyContent="center">
                <ItemText>
                  モン・プチ・プレジール8個
                  <br />
                  チョコレートセット
                </ItemText>
              </Stack>
            </Stack>
          </CarouselItem>
        </Slider>
      </SliderWrap>

      {!isMdSize && (
        <Stack alignItems="center" pt="147px">
          <LpGradientButton />
        </Stack>
      )}
    </Wrap>
  )
}
