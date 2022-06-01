import React from 'react'

import { Box, Stack } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { GradientButton } from './components/GradientButton'
import { CommonTitle } from './components/CommonTitle'

import { UseLaptop, UseMobile } from 'organisms'

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      marginTop: '200px',
    },
    arrow: {
      width: 25,
    },
    button: {
      [theme.breakpoints.down(1000)]: {
        display: 'none',
      },
    },
  })
)

export type ServiceProps = {
  isMobileSize: boolean
}

export const Use = ({ isMobileSize }: ServiceProps) => {
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <CommonTitle title="USES" subtitle="ZEFTのご利用イメージ" />

      {isMobileSize ? <UseMobile /> : <UseLaptop />}

      <Stack className={classes.button} alignItems="center" py={22}>
        <GradientButton />
      </Stack>
    </Box>
  )
}
