import React from 'react'

import { useNavigate } from 'react-router'
import { GradientButton as CommonGradientButton } from 'atoms'

import { useRecommendProducts } from 'container/hooks/sender/useRecommendProducts'
import { useCtaInnerText } from '../hooks/useCtaInnerText'

export const GradientButton = () => {
  const navigate = useNavigate()
  const ctaInnerText = useCtaInnerText()

  const { productsInCart } = useRecommendProducts()
  const howManyInCart = productsInCart.length

  const goToApp = () => {
    if (howManyInCart === 0) {
      navigate('/product/onboarding')
    } else {
      navigate('/product/choose')
    }
  }

  return (
    <CommonGradientButton width="300px" height="56px" onClick={goToApp}>
      {ctaInnerText}
    </CommonGradientButton>
  )
}
