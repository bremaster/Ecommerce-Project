import React from 'react'

import { Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

const Step = styled(Typography)({
  fontFamily: 'Outfit',
  fontSize: '32px',
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
  marginBottom: '10px',
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
    width: '270px',
    zIndex: 10,
  },
})

const ItemTitle = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontSize: '28px',
  fontWeight: 500,
  lineHeight: '30px',
  letterSpacing: '0.05em',
  textAlign: 'center',
  color: '#4A4A4A',
  whiteSpace: 'nowrap',
})

export type UseLaptopItemProps = {
  data: {
    image: string
    title: string
    subtitle: Array<string>
  }
}

export const UseHikidemonoLaptopItem = ({ data }: UseLaptopItemProps) => {
  return (
    <ItemWrap>
      <ImageWrap>
        <img src={data.image} />
      </ImageWrap>
      <Step align="center">{data.title}</Step>
      {data.subtitle.map((item, i) => (
        <ItemTitle align="center" key={i}>
          {item}
        </ItemTitle>
      ))}
    </ItemWrap>
  )
}
