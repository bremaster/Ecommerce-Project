import React from 'react'

import { Box, Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

const GiftBoxWrap = styled(Stack)((props) => ({
  cursor: 'pointer',
  width: '40px',
  height: '40px',
  '& img': {
    width: '40px',
  },
  [props.theme.breakpoints.down(1000)]: {
    width: '26px',
    height: '26px',
    '& img': {
      width: '26px',
    },
  },
}))

const Count = styled(Typography)((props) => ({
  fontFamily: 'Outfit',
  fontWeight: 600,
  lineHeight: 1.2,
  fontSize: 14,
  paddingTop: '16px',
  letterSpacing: '0.05em',
  color: 'white',
  [props.theme.breakpoints.down(1000)]: {
    fontSize: 10,
    paddingTop: '11px',
  },
}))

export const GiftBox = ({ count }: { count?: number }) => {
  return (
    <GiftBoxWrap position="relative" direction="row" alignItems="center">
      <Box>
        <img src="/assets/cart-black.png" />
      </Box>
      <Stack
        position="absolute"
        alignItems="center"
        sx={{ width: '100%', height: '100%' }}
      >
        <Count>{`${count ? count : 0}/3`}</Count>
      </Stack>
    </GiftBoxWrap>
  )
}
