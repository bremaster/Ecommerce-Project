import React from 'react'

import { Box } from '@mui/material'
import { MenuAppBar, Footer, CommonThanks } from 'organisms'

export const ReThank = () => {
  return (
    <>
      <MenuAppBar giftBoxButton={false} />
      <CommonThanks
        message="ギフト受け取り手続きが完了しました"
        subMessage="YOUR GIFT IS READY!"
      />
      <Box mt={{ xs: '3rem', md: '6rem' }}>
        <Footer />
      </Box>
    </>
  )
}
