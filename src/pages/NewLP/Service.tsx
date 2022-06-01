import React from 'react'

import { Box, Stack } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { GradientButton } from './components/GradientButton'
import { CommonTitle } from './components/CommonTitle'
import { ServiceItem } from './components/ServiceItem'

import { LANDING_SERVICE_ITEM_LIST } from 'constants/index'

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      width: '100%',
    },
    footer: {
      [theme.breakpoints.down(1000)]: {
        display: 'none',
      },
    },
  })
)

export type ServiceProps = {
  isMobileSize: boolean
}

export const Service = ({ isMobileSize }: ServiceProps) => {
  const classes = useStyles()

  const checkDirection = (num: number) => {
    if (isMobileSize) {
      return 'column-reverse'
    } else if (num % 2 === 1) {
      return 'row-reverse'
    } else {
      return 'row'
    }
  }

  return (
    <Box className={classes.wrapper}>
      <CommonTitle title="SERVICE" subtitle="サービス内容" />
      {LANDING_SERVICE_ITEM_LIST.map((item, index) => (
        <ServiceItem
          key={index}
          textdata={item}
          direction={checkDirection(index)}
          isMobileSize={isMobileSize}
        />
      ))}
      <Stack alignItems="center" py="100px" className={classes.footer}>
        <GradientButton />
      </Stack>
    </Box>
  )
}
