import React from 'react'

import { Box, Typography, Stack } from '@mui/material'

import { styled } from '@mui/system'

const TitleBar = styled(Stack)((props) => ({
  height: 70,
  borderRadius: 10,
  backgroundColor: '#F8F8F8',
  padding: '15px 25px',
  gap: 25,
  '& img': {
    width: 40,
  },
  [props.theme.breakpoints.down('sm')]: {
    height: 55,
    padding: '12px 10px',
    gap: 10,
    '& img': {
      width: 30,
    },
  },
}))

const TitleBarText = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '40px',
  letterSpacing: '0.03em',
  textAlign: 'center',
  color: '#000000',
  [props.theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
  [props.theme.breakpoints.down(341)]: {
    lineHeight: 1.3,
    textAlign: 'left',
  },
}))

export const GiftBoxTitleBar = () => {
  return (
    <TitleBar direction="row" alignItems="center">
      <Box component="img" src="/gift-box.png" />
      <TitleBarText>貰った方が1つ選んで受け取れます</TitleBarText>
    </TitleBar>
  )
}
