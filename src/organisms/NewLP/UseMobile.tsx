import React from 'react'

import { Box, Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

const List = styled(Stack)({
  maxWidth: '900px',
  width: '100%',
  margin: '0 auto',
  zIndex: 2,
})

const Title = styled(Typography)({
  marginTop: '10px',
  fontFamily: 'Noto Sans JP',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '30px',
  letterSpacing: '0.05em',
  textAlign: 'center',
  color: '#4A4A4A',
})

const Step = styled(Typography)({
  fontFamily: 'Outfit',
  fontSize: '24px',
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: '0.1em',
  textAlign: 'center',
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginTop: '10px',
})

const ItemWrap = styled(Stack)({
  width: '100%',
  marginBottom: '150px',
})

const ImageWrap = styled(Stack)({
  width: '100%',
  alignItems: 'center',
  position: 'relative',
  '& img': {
    width: '220px',
    zIndex: 10,
  },
})

const ImageBack = styled(Box)({
  backgroundColor: '#F7F7F7',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 250,
  width: '100%',
})

export const UseMobile = () => {
  return (
    <Stack mt={'50px'} display={{ md: 'none', xs: 'flex' }}>
      <List gap={14}>
        <Stack alignItems="center">
          {/* Item List*/}
          <ItemWrap>
            <ImageWrap>
              <ImageBack />
              <img src="/landing/use/image1.png" />
            </ImageWrap>
            <Step align="center">STEP1</Step>
            <Title align="center">贈りたいギフトを3つまで選択</Title>
          </ItemWrap>

          <ItemWrap>
            <ImageWrap>
              <ImageBack />
              <img src="/landing/use/image2.png" />
            </ImageWrap>
            <Step align="center">STEP2</Step>
            <Title align="center">お相手にリンクを送付</Title>
            <Title align="center" sx={{ marginTop: 0 }}>
              もらった方は住所入力
            </Title>
          </ItemWrap>

          <ItemWrap>
            <ImageWrap>
              <ImageBack />
              <img src="/landing/use/image4.png" />
            </ImageWrap>
            <Step align="center">STEP3</Step>
            <Title align="center">ギフトが選ばれたらお支払い</Title>
          </ItemWrap>
        </Stack>
        {/* Item List*/}
      </List>
    </Stack>
  )
}
