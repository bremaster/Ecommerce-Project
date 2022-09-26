import React from 'react'

import { Box, Theme, useMediaQuery } from '@mui/material'
import { styled } from '@mui/system'

import { AppBarLaptop, AppBarMobile } from 'molecules'

import { useRecommendProducts } from 'container/hooks/sender/useRecommendProducts'

const MenuWrap = styled(Box)((props) => ({
  flexGrow: 1,
  width: '100%',
  position: 'relative',
  height: '64px',
  borderBottom: '1px solid rgb(233, 236, 237)',
  zIndex: 30,
  [props.theme.breakpoints.up('md')]: {
    height: '100px',
  },
  '& header': {
    height: '100%',
  },
}))

interface Props {
  /** if true, git box (cart) button is displayed at left */
  giftBoxButton?: boolean
  /** if navigate to lp */
  navigateToLp?: boolean
  /** if show CTA */
  cta?: boolean
  isPreview?: boolean
}

export const MenuAppBar: React.FC<Props> = ({
  giftBoxButton = false,
  navigateToLp = true,
  cta = false,
  isPreview,
}) => {
  const isLaptop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'), {
    defaultMatches: false,
  })

  const { productsInCart } = useRecommendProducts()

  return (
    <MenuWrap>
      {isLaptop ? (
        <AppBarLaptop
          giftBoxButton={giftBoxButton && !isPreview}
          howManyInCart={productsInCart.length}
          navigateToLp={navigateToLp}
          cta={cta}
        />
      ) : (
        <AppBarMobile
          giftBoxButton={giftBoxButton && !isPreview}
          howManyInCart={productsInCart.length}
          navigateToLp={navigateToLp}
        />
      )}
    </MenuWrap>
  )
}
