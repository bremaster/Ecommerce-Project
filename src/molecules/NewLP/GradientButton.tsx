import React from 'react'

import { useNavigate } from 'react-router'
import { GradientButton as CommonGradientButton } from 'atoms'

import { useRecommendProducts } from 'container/hooks/sender/useRecommendProducts'
import { useCtaButton } from 'utilities/useCtaButton'

export const GradientButton = () => {
  const navigate = useNavigate()
  const cta = useCtaButton()

  const { productsInCart } = useRecommendProducts()
  const howManyInCart = productsInCart.length

  const goToApp = () => {
    if (howManyInCart === 0) {
      navigate(`/product/onboarding/${cta.linkTo}`)
    } else {
      navigate(`/product/choose/${cta.linkTo}`)
    }
  }

  return (
    <CommonGradientButton width="300px" height="56px" onClick={goToApp}>
      {cta.innerText}
    </CommonGradientButton>
  )
}
