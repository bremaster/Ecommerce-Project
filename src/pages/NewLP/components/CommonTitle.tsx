import React from 'react'

import { Typography, Stack } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      fontSize: '70px',
      fontWeight: 600,
      lineHeight: '88.2px',
      fontFamily: 'Outfit',
      background:
        'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      [theme.breakpoints.down(1000)]: {
        fontSize: '55px',
        lineHeight: '69.3px',
      },
    },
    subtitle: {
      fontSize: '16px',
      lineHeight: '16px',
      fontFamily: 'Noto Sans JP',
      color: '#4A4A4A',
      [theme.breakpoints.down(1000)]: {
        fontSize: '13px',
        lineHeight: '13px',
      },
    },
  })
)

export type CommonTitleProps = {
  title: string
  subtitle: string
}

export const CommonTitle = ({ title, subtitle }: CommonTitleProps): JSX.Element => {
  const classes = useStyles()
  return (
    <Stack gap="8px" alignItems="center" sx={{ marginBottom: { md: 7.5, xs: 7 } }}>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.subtitle}>{subtitle}</Typography>
    </Stack>
  )
}
