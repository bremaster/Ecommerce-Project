import React from 'react'

import { Box, Stack } from '@mui/material'

import {
  UseLaptopItem,
  UseMobileItem,
  CommonTitle,
  TitleWrap,
  LpGradientButton,
} from 'molecules'

import { styled } from '@mui/system'

export type UseProps = {
  isMdSize: boolean
}

const UseWrap = styled(Box)((props) => ({
  marginTop: '100px',
  [props.theme.breakpoints.down(900)]: {
    marginTop: '59px',
  },
}))

const ItemGroup = styled(Stack)({
  gap: '68px',
  width: '100%',
  margin: '0 auto',
  maxWidth: '1040px',
})

const ImageLaptopBack = styled(Box)({
  backgroundColor: '#F7F7F7',
  position: 'absolute',
  top: 82,
  height: 250,
  width: '65vw',
})

const List = styled(Stack)((props) => ({
  width: '100%',
  position: 'relative',
  [props.theme.breakpoints.down('md')]: {
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
    zIndex: 2,
  },
}))

const ImageLaptopList = [
  {
    image: '/landing/use/image1.png',
    title: 'STEP1',
    subtitle: ['贈りたいギフトを3つまで選択'],
  },
  {
    image: '/landing/use/image2.png',
    title: 'STEP2',
    subtitle: ['贈りたいお相手にリンクを送付'],
  },
  {
    image: '/landing/use/image3.png',
    title: 'STEP3',
    subtitle: ['ギフトを1つ選択、住所を入力'],
  },
  {
    image: '/landing/use/image4.png',
    title: 'STEP4',
    subtitle: ['ギフトが選ばれたらお支払い'],
  },
]

const ImageMobileList = [
  {
    image: '/landing/use/image1.png',
    title: 'STEP1',
    subtitle: ['贈りたいギフトを3つまで選択'],
  },
  {
    image: '/landing/use/image2.png',
    title: 'STEP2',
    subtitle: ['お相手にリンクを送付', 'もらった方は住所入力'],
  },
  {
    image: '/landing/use/image4.png',
    title: 'STEP3',
    subtitle: ['ギフトが選ばれたらお支払い'],
  },
]

export const Use = ({ isMdSize }: UseProps) => {
  return (
    <UseWrap id="use">
      {/* for SEO optimization, set <h2> tag */}
      <TitleWrap>
        <CommonTitle title="HOW TO USE" subtitle="ZEFTの使い方" />
      </TitleWrap>

      {/*<UseMobile />*/}
      {/*<UseLaptop />*/}
      <Stack mt={'95px'} gap={'190px'} display={{ md: 'flex', xs: 'none' }}>
        <List gap={14}>
          <ItemGroup direction="row" justifyContent="start">
            {/* Item List*/}
            <UseLaptopItem data={ImageLaptopList[0]} />
            <UseLaptopItem data={ImageLaptopList[1]} />
          </ItemGroup>
          <ImageLaptopBack />
        </List>

        <List gap={14}>
          <ItemGroup direction="row" justifyContent="end">
            {/* Item List*/}
            <UseLaptopItem data={ImageLaptopList[2]} />
            <UseLaptopItem data={ImageLaptopList[3]} />
          </ItemGroup>
          {/* Item List*/}
          <ImageLaptopBack sx={{ right: 0 }} />
        </List>
      </Stack>

      <Stack mt={'50px'} display={{ md: 'none', xs: 'flex' }}>
        <List gap={14}>
          <Stack alignItems="center">
            {/* Item List*/}
            <UseMobileItem data={ImageMobileList[0]} />
            <UseMobileItem data={ImageMobileList[1]} />
            <UseMobileItem data={ImageMobileList[2]} />
          </Stack>
          {/* Item List*/}
        </List>
      </Stack>

      {!isMdSize && (
        <Stack alignItems="center" pt="224px">
          <LpGradientButton />
        </Stack>
      )}
    </UseWrap>
  )
}
