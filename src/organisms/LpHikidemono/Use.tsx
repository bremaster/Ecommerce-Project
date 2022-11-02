import React from 'react'

import { Box, Stack } from '@mui/material'

import {
  UseHikidemonoLaptopItem,
  UseHikidemonoMobileItem,
  CommonHikidemonoTitle,
  TitleWrap,
  HikidemonoGradientButton,
} from 'molecules'

import { styled } from '@mui/system'

export type UseProps = {
  isMdSize: boolean
}

const UseWrap = styled(Box)((props) => ({
  [props.theme.breakpoints.down('md')]: {
    marginTop: '100px',
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
  width: '100%',
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

const ImageMobileList = [
  {
    image: '/landing/use/image1.png',
    title: 'STEP1',
    subtitle: ['ギフトを3つまで選択'],
  },
  {
    image: '/landing/use/image2.png',
    title: 'STEP2',
    subtitle: ['お相手にリンクを送付', 'もらった方は住所入力'],
  },
  {
    image: '/landing/use/image4.png',
    title: 'STEP3',
    subtitle: ['ギフトが選ばれたら', 'お支払い'],
  },
]

export const Use = ({ isMdSize }: UseProps) => {
  return (
    <UseWrap>
      {!isMdSize && (
        <Stack alignItems="center" pt="125px" pb="200px">
          <HikidemonoGradientButton />
        </Stack>
      )}
      {/* for SEO optimization, set <h2> tag */}
      <TitleWrap>
        <CommonHikidemonoTitle title="HOW TO USE" subtitle="ZEFTの使い方" />
      </TitleWrap>

      {/*<UseMobile />*/}
      {/*<UseLaptop />*/}
      <Stack mt={'120px'} gap={'190px'} display={{ md: 'flex', xs: 'none' }}>
        <List gap={14}>
          <ItemGroup direction="row" justifyContent="space-between">
            {/* Item List*/}
            <UseHikidemonoLaptopItem data={ImageMobileList[0]} />
            <UseHikidemonoLaptopItem data={ImageMobileList[1]} />
            <UseHikidemonoLaptopItem data={ImageMobileList[2]} />
          </ItemGroup>
          <ImageLaptopBack />
        </List>
      </Stack>

      <Stack
        mt={'50px'}
        gap="150px"
        alignItems="center"
        display={{ md: 'none', xs: 'flex' }}
      >
        {/* Item List*/}
        <UseHikidemonoMobileItem data={ImageMobileList[0]} />
        <UseHikidemonoMobileItem data={ImageMobileList[1]} />
        <UseHikidemonoMobileItem
          data={{
            image: '/landing/use/image4.png',
            title: 'STEP3',
            subtitle: ['ギフトが選ばれたらお支払い'],
          }}
        />
      </Stack>
    </UseWrap>
  )
}
