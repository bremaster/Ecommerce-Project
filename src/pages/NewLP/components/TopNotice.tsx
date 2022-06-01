import React from 'react'
import { COLOR } from 'theme'

import { Box, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { DeliveryLiskNotice } from 'organisms'

// change component based on screen size
export const TopNotice = (props: { isSmallScreen: boolean }): JSX.Element => {
  if (props.isSmallScreen) {
    return <ForMobile />
  } else {
    return <ForDesktop />
  }
}

const useStylesForDesktop = makeStyles({
  wrapper: {
    display: 'grid',
    placeItems: 'center',
    borderTop: `0.5px solid ${COLOR.gray400}`,
    borderBottom: `0.5px solid ${COLOR.gray400}`,
    boxSizing: 'border-box',
    padding: '1rem 0',
  },
  message: {
    fontWeight: 500,
    fontSize: '14px',
  },
})

const ForDesktop = () => {
  const classes = useStylesForDesktop()
  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.message}>
        年末年始の各販売出荷元およびZEFT運営事務局休業のため、
        お届けまでに通常より多くの日数を頂戴しております。
      </Typography>
    </Box>
  )
}

// the same component used in app
const ForMobile = () => {
  return <DeliveryLiskNotice />
}
