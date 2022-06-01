import React from 'react'

import { Typography, Stack, Box } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles({
  wrap: {
    maxWidth: '800px',
    margin: '0 auto 80px',
    '& h3': {
      color: '#FE8B7B',
      fontFamily: 'Noto Sans JP',
      fontWeight: 700,
      letterSpacing: '0.03em',
    },
    '& p': {
      color: '#4A4A4A',
      fontFamily: 'Noto Sans JP',
      fontWeight: 400,
      letterSpacing: '0.03em',
      textAlign: 'left',
    },
  },
  title: {
    fontSize: '35px',
    lineHeight: '53px',
    textAlign: 'left',
    width: '400px',
  },
  mobiletitle: {
    fontSize: '24px',
    lineHeight: '34.75px',
    textAlign: 'center',
    width: '90%',
  },
  subtitle: {
    fontSize: '15px',
    lineHeight: '27px',
    width: '420px',
  },
  mobilesubtitle: {
    fontSize: '13px',
    lineHeight: '23.4px',
    width: '90%',
  },
  image: {
    height: '260px',
  },
  mobileimage: {
    width: '250px',
  },
})

export type ServiceItemProps = {
  isMobileSize?: boolean
  direction: 'column-reverse' | 'row-reverse' | 'row'
  textdata: {
    title: string
    subtitle: string
    image: string
  }
}

export const ServiceItem = ({
  isMobileSize = false,
  direction,
  textdata,
}: ServiceItemProps): JSX.Element => {
  const classes = useStyles()

  return (
    <Stack
      className={classes.wrap}
      justifyContent="center"
      gap={isMobileSize ? 2 : 9}
      direction={direction}
    >
      <Stack gap={4.5} alignItems="center">
        <Typography
          component="h3"
          className={isMobileSize ? classes.mobiletitle : classes.title}
        >
          {textdata.title}
        </Typography>
        <Typography
          component="p"
          className={isMobileSize ? classes.mobilesubtitle : classes.subtitle}
        >
          {textdata.subtitle}
        </Typography>
      </Stack>
      <Stack justifyContent="center" alignItems="center">
        <Box
          component="img"
          src={textdata.image}
          className={isMobileSize ? classes.mobileimage : classes.image}
        />
      </Stack>
    </Stack>
  )
}
