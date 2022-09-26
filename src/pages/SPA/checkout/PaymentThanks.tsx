import React from 'react'

import { Box } from '@mui/material'
import { MenuAppBar, Footer, CommonThanks } from 'organisms'

export const PaymentThanks = () => {
  return (
    <>
      <MenuAppBar giftBoxButton={false} />
      <CommonThanks
        message="ギフトの決済手続きが完了しました"
        subMessage="YOUR GIFT IS READY!"
      />
      <Box mt={{ xs: '3rem', md: '6rem' }}>
        <Footer />
      </Box>
    </>
  )
}
