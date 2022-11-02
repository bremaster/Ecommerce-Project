import React from 'react'

import { Stack, Box, Typography } from '@mui/material'

import { styled } from '@mui/system'

type Props = {
  children?: React.ReactNode
  title: string
}

export const MobileSearchItemWrap = styled(Stack)({
  borderRadius: 10,
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
  padding: 20,
  '& div::-webkit-scrollbar': {
    display: 'none',
  },
})

export const MobileSearchItemTitle = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontSize: 22,
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: '0.03em',
  color: '#4A4A4A',
})

export const MobileSearchItemLayout = ({ children, title }: Props) => {
  return (
    <MobileSearchItemWrap>
      <MobileSearchItemTitle>{title}</MobileSearchItemTitle>
      <Box sx={{ backgroundColor: 'white' }}>{children}</Box>
    </MobileSearchItemWrap>
  )
}
