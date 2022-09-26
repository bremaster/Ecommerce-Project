import React from 'react'

import { Box, Typography, Stack } from '@mui/material'

import { GiftBoxItem, ShippingLink } from 'organisms'
import { ProductWithHandlerAndStatus } from 'constants/index'

import { styled } from '@mui/system'

type Props = {
  items: Array<ProductWithHandlerAndStatus>
  handleChooseClick: () => void
  type: 'onboarding' | 'cart'
}

const CardWrap = styled(Box)((props) => ({
  flexDirection: 'column',
  background: '#fff',
  borderRadius: '10px',
  padding: '48px 50px 40px',
  border: '1px solid #D1D1D1',
  [props.theme.breakpoints.down('sm')]: {
    padding: '46px 20px 25px',
  },
}))

const CardTitle = styled(Typography)((props) => ({
  fontFamily: 'Outfit',
  fontSize: '40px',
  fontWeight: 700,
  lineHeight: 1,
  opacity: 0.8,
  letterSpacing: '0.08em',
  textAlign: 'center',
  background:
    'linear-gradient(102.32deg, rgba(254, 170, 105, 0.8) -13.04%, rgba(255, 139, 123, 0.8) 51.48%, rgba(146, 125, 237, 0.8) 153.9%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '45px',
  [props.theme.breakpoints.down('sm')]: {
    fontSize: '36px',
    marginBottom: '35px',
  },
}))

export const GiftListCart = ({ items, handleChooseClick, type }: Props) => {
  // item slots are 3 at most
  const emptySlot = new Array(3 - items.length).fill(undefined)

  return (
    <>
      <CardWrap width="100%">
        <Stack direction="row" justifyContent="center">
          <CardTitle>Gifts Card</CardTitle>
        </Stack>
        <Stack gap={{ sm: 2.5, xs: '15px' }}>
          {items.map((item) => (
            <GiftBoxItem
              key={item.sys.id}
              img={item.productImageCloudinary[0].secure_url}
              brand={item.brand.brandName}
              title={item.title}
              onClick={item.handleClick}
            />
          ))}
          {emptySlot.map((_, i) => (
            <GiftBoxItem key={i} onClick={handleChooseClick} select={i === 0} />
          ))}
        </Stack>

        <ShippingLink items={items} type={type} />
      </CardWrap>
    </>
  )
}
