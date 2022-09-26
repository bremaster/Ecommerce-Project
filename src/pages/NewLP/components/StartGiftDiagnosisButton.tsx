import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
/* import { dataLayerPush } from 'utilities/GoogleAnalytics' */

import { GradientButton } from 'atoms'

import { useRecommendProducts } from 'container/hooks/sender/useRecommendProducts'
import { useCtaInnerText } from '../hooks/useCtaInnerText'

export const StartGiftDiagnosisButton: React.FC = () => {
  const navigate = useNavigate()
  const ctaInnerText = useCtaInnerText()

  const { productsInCart } = useRecommendProducts()
  const howManyInCart = productsInCart.length

  const hadleClick = () => {
    /* dataLayerPush({ */
    /*   event: 'onClickStickyCTAButton', */
    /* }) */
    if (howManyInCart === 0) {
      navigate('/product/onboarding')
    } else {
      navigate('/product/choose')
    }
  }

  return (
    <Box
      sx={{
        width: 'calc(100% - 1.5rem)',
        maxwidth: '1000px',
        mx: 'auto',
      }}
    >
      <GradientButton height="48px" onClick={hadleClick}>
        {ctaInnerText}
      </GradientButton>
    </Box>
  )
}
