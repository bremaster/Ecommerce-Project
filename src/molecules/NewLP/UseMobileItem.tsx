import React from 'react'

import { Box, Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

const Title = styled(Typography)({
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
  marginBottom: '10px',
})

const ItemWrap = styled(Stack)({
  width: '100%',
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

export type UseMobileItemProps = {
  data: {
    image: string
    title: string
    subtitle: Array<string>
  }
}

export const UseMobileItem = ({ data }: UseMobileItemProps) => {
  return (
    <ItemWrap>
      <ImageWrap>
        <ImageBack />
        <img src={data.image} />
      </ImageWrap>
      <Step align="center">{data.title}</Step>
      {data.subtitle.map((item, i) => (
        <Title align="center" key={i}>
          {item}
        </Title>
      ))}
    </ItemWrap>
  )
}
