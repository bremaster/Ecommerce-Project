import React from 'react'

import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
/* import { dataLayerPush } from 'utilities/GoogleAnalytics' */

import { GradientButton } from 'atoms'

import { useRecommendProducts } from 'container/hooks/sender/useRecommendProducts'
import { useCtaButton } from 'utilities/useCtaButton'

export const StartGiftDiagnosisButton: React.FC = () => {
  const navigate = useNavigate()
  const cta = useCtaButton()

  const { productsInCart } = useRecommendProducts()
  const howManyInCart = productsInCart.length

  const hadleClick = () => {
    /* dataLayerPush({ */
    /*   event: 'onClickStickyCTAButton', */
    /* }) */
    if (howManyInCart === 0) {
      navigate(`/product/onboarding/${cta.linkTo}`)
    } else {
      navigate(`/product/choose/${cta.linkTo}`)
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
        {cta.innerText}
      </GradientButton>
    </Box>
  )
}
