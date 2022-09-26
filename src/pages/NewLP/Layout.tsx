import React from 'react'

import { Box, useMediaQuery } from '@mui/material'

import { MobileHeader } from './MobileHeader'
import { HeroCover } from './HeroCover'
import { Service } from './Service'
import { Use } from './Use'
import { Carousel } from './Carousel'
import { Event } from './Event'
import { Story } from './Story'
import { MobileZeft } from './MobileZeft'

import { StickyCTAButton } from './components/StickyCTAButton'
import { MenuAppBar, Footer } from 'organisms'

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

export const Layout: React.FC = () => {
  const { isMdSize, isXsSize } = useSize()

  const { productsInCart } = useRecommendProducts()
  const howManyInCart = productsInCart.length

  return (
    <Box position="relative">
      <MenuAppBar giftBoxButton={howManyInCart > 0} />

      {isMdSize && <MobileHeader howManyInCart={howManyInCart} />}
      <HeroCover isMobile={isXsSize} />
      {isMdSize && <MobileZeft />}
      {!isMdSize && <Service isMdSize={isMdSize} />}
      <Use isMdSize={isMdSize} />
      <Carousel howManyInCart={howManyInCart} isMdSize={isMdSize} />
      <Story />
      <Event howManyInCart={howManyInCart} />

      <Footer />
      {isMdSize && <StickyCTAButton isShown={true} />}
    </Box>
  )
}
