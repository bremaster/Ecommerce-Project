import React from 'react'

import { Box, Typography, Stack } from '@mui/material'

import { styled } from '@mui/system'

const TitleWrap = styled(Stack)((props) => ({
  alignItems: 'start',
  gap: '31px',
  [props.theme.breakpoints.down(900)]: {
    gap: 0,
  },
}))

const Title = styled(Box)((props) => ({
  fontSize: '32px',
  fontWeight: 700,
  lineHeight: 1,
  fontFamily: 'Outfit',
  color: '#4A4A4A',
  letterSpacing: '0.08em',
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [props.theme.breakpoints.down(900)]: {
    fontSize: '20px',
    lineHeight: 2,
  },
}))

const SubTitle = styled(Box)((props) => ({
  fontSize: '32px',
  fontWeight: 700,
  lineHeight: 1,
  fontFamily: 'Noto Sans JP',
  color: '#4A4A4A',
  letterSpacing: '0.08em',
  [props.theme.breakpoints.down(900)]: {
    fontSize: '24px',
    lineHeight: '40.8px',
  },
}))

export type CommonTitleProps = {
  title: string
  subtitle: string
}

export const CommonHikidemonoTitle = ({
  title,
  subtitle,
}: CommonTitleProps): JSX.Element => {
  return (
    // for SEO optimization, set <h2> tag
    <Typography component="h2">
      <TitleWrap>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </TitleWrap>
    </Typography>
  )
}
