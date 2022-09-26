import React from 'react'
import { useNavigate } from 'react-router'

import { Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

import { GradientButton } from 'atoms'
import { useCtaInnerText } from './hooks/useCtaInnerText'

const MobileHeaderWrap = styled(Stack)({
  padding: '50px 0',
})

const GradientText = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontSize: '32px',
  fontWeight: 700,
  lineHeight: '43.2px',
  letterSpacing: '0.08em',
  textAlign: 'center',
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
})

const Text = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '43.2px',
  letterSpacing: '0.08em',
  textAlign: 'center',
  color: '#4A4A4A',
  marginBottom: 50,
})

export type MobileHeaderProps = {
  howManyInCart: number
}

export const MobileHeader = ({ howManyInCart }: MobileHeaderProps) => {
  const navigate = useNavigate()
  const ctaText = useCtaInnerText()

  const goToApp = () => {
    if (howManyInCart === 0) {
      navigate('/product/onboarding')
    } else {
      navigate('/product/choose')
    }
  }

  return (
    <MobileHeaderWrap alignItems="center">
      <GradientText>絶対外さないギフト</GradientText>
      <Text>贈りませんか？</Text>

      <GradientButton width="220px" height="48px" onClick={goToApp}>
        {ctaText}
      </GradientButton>
    </MobileHeaderWrap>
  )
}
