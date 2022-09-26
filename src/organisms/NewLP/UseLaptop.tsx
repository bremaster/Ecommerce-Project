import React from 'react'

import { Box, Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

const List = styled(Stack)({
  width: '100%',
  position: 'relative',
})

const ItemGroup = styled(Stack)({
  gap: '68px',
  width: '100%',
  margin: '0 auto',
  maxWidth: '1040px',
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
  width: 'fit-content',
  marginTop: '30px',
})

const ItemWrap = styled(Stack)({
  width: 'fit-content',
  alignItems: 'center',
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

const ItemTitle = styled(Typography)({
  marginTop: '10px',
  fontFamily: 'Noto Sans JP',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '30px',
  letterSpacing: '0.05em',
  textAlign: 'center',
  color: '#4A4A4A',
  whiteSpace: 'nowrap',
})

const ImageBack = styled(Box)({
  backgroundColor: '#F7F7F7',
  position: 'absolute',
  top: 82,
  height: 250,
  width: '65vw',
})

export const UseLaptop = () => {
  return (
    <Stack mt={'95px'} gap={'190px'} display={{ md: 'flex', xs: 'none' }}>
      <List gap={14}>
        <ItemGroup direction="row" justifyContent="start">
          {/* Item List*/}
          <ItemWrap>
            <ImageWrap>
              <img src="/landing/use/image1.png" />
            </ImageWrap>
            <Step align="center">STEP1</Step>
            <ItemTitle align="center">贈りたいギフトを3つまで選択</ItemTitle>
          </ItemWrap>

          <ItemWrap>
            <ImageWrap>
              <img src="/landing/use/image2.png" />
            </ImageWrap>
            <Step align="center">STEP2</Step>
            <ItemTitle align="center">贈りたいお相手にリンクを送付</ItemTitle>
          </ItemWrap>
        </ItemGroup>
        <ImageBack />
      </List>

      <List gap={14}>
        <ItemGroup direction="row" justifyContent="end">
          {/* Item List*/}
          <ItemWrap>
            <ImageWrap>
              <img src="/landing/use/image3.png" />
            </ImageWrap>
            <Step align="center">STEP3</Step>
            <ItemTitle align="center">ギフトを1つ選択、住所を入力</ItemTitle>
          </ItemWrap>

          <ItemWrap>
            <ImageWrap>
              <img src="/landing/use/image4.png" />
            </ImageWrap>
            <Step align="center">STEP4</Step>
            <ItemTitle align="center">ギフトが選ばれたらお支払い</ItemTitle>
          </ItemWrap>
        </ItemGroup>
        {/* Item List*/}
        <ImageBack sx={{ right: 0 }} />
      </List>
    </Stack>
  )
}
