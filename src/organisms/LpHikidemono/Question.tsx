import React from 'react'

import { Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

import { GradientOutlinedButton } from 'atoms'

const QuestionWrap = styled(Stack)((props) => ({
  paddingTop: '160px',
  paddingBottom: '140px',
  alignItems: 'center',
  gap: 88,
  [props.theme.breakpoints.down('md')]: {
    paddingTop: '70px',
    paddingBottom: '100px',
    gap: 50,
  },
}))

const Title = styled(Typography)((props) => ({
  fontSize: '34px',
  fontWeight: 700,
  lineHeight: '85px',
  fontFamily: 'Outfit',
  color: '#4A4A4A',
  letterSpacing: '0.2em',
  textAlign: 'center',
  [props.theme.breakpoints.down('md')]: {
    fontFamily: 'Noto Sans JP',
    fontSize: '24px',
    lineHeight: '40px',
    letterSpacing: '0.1em',
  },
}))

export const Question = () => {
  return (
    <QuestionWrap>
      <Stack display={{ md: 'flex', xs: 'none' }}>
        <Title>
          ご質問・ご要望等
          <br />
          お気軽にご連絡ください
        </Title>
      </Stack>
      <Stack display={{ md: 'none', xs: 'flex' }}>
        <Title>
          ご質問・ご要望があればお気
          <br />
          軽にご連絡ください
        </Title>
      </Stack>
      <GradientOutlinedButton
        width="300px"
        height="56px"
        href="https://www.envlop.co/contact"
      >
        お問い合わせ
      </GradientOutlinedButton>
    </QuestionWrap>
  )
}
