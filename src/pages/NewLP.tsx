import React from 'react'

import { Box, useMediaQuery } from '@mui/material'

import {
  MenuAppBar,
  Footer,
  HeroCover,
  Service,
  Use,
  Carousel,
  Event,
  Story,
} from 'organisms'

import { StickyCTAButton } from 'molecules'

import { useRecommendProducts } from 'container/hooks/sender/useRecommendProducts'

/*
 * custom hooks
 */

const useSize = () => {
  const isLgSize = useMediaQuery('(max-width: 1200px)', { noSsr: true })
  const isMdSize = useMediaQuery('(max-width: 900px)', { noSsr: true })
  const isSmSize = useMediaQuery('(max-width: 767px)', { noSsr: true })
  const isXsSize = useMediaQuery('(max-width: 450px)', {
    noSsr: true,
    defaultMatches: true,
  })
  return { isLgSize, isMdSize, isSmSize, isXsSize }
}

export type LpCommonProps = {
  isMobileSize: boolean
  isXMobileSize?: boolean
}

export const LpHome: React.FC = () => {
  const { isMdSize, isXsSize } = useSize()

  const { productsInCart } = useRecommendProducts()
  const howManyInCart = productsInCart.length

  return (
    <Box position="relative">
      <MenuAppBar giftBoxButton={howManyInCart > 0} />

      <HeroCover isMobile={isXsSize} />
      <Service isMdSize={isMdSize} />
      <Use isMdSize={isMdSize} />
      <Carousel howManyInCart={howManyInCart} isMdSize={isMdSize} />
      <Story />
      <Event howManyInCart={howManyInCart} />

      <Footer />
      {isMdSize && <StickyCTAButton isShown={true} />}
    </Box>
  )
}
