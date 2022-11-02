import React from 'react'

import { Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

type Props = {
  title: string
  subtitle: string
}

const Title = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontWeight: 700,
  fontSize: '32px',
  lineHeight: '42px',
  color: '#4A4A4A',
  letterSpacing: '0.03em',
})

const SubTitle = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '26px',
  color: '#70757A',
})

// onboarding page
export const PreSearchHeader = ({ title, subtitle }: Props) => {
  return (
    <Stack gap={2} px={3} py={5}>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </Stack>
  )
}
