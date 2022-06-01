import React from 'react'

import { Box, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

const useStyles = makeStyles((theme) =>
  createStyles({
    wrap: {
      position: 'relative',
      width: '100%',
    },
    image: {
      width: '100%',
      borderRadius: '10px',
    },
    description: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      top: 0,
      borderRadius: '10px',
      '& h3': {
        fontFamily: 'Noto Sans JP',
        fontSize: '30px',
        fontWeight: 700,
        lineHeight: '51px',
        letterSpacing: '0.03em',
        color: 'white',
        position: 'absolute',
        bottom: 20,
        left: 24,
        [theme.breakpoints.down(1000)]: {
          fontSize: '24px',
        },
      },
    },
  })
)

export type EventProps = {
  image: string
  description: string
}

export const EventItem = ({ image, description }: EventProps) => {
  const classes = useStyles()

  return (
    <Box className={classes.wrap}>
      <Box component="img" src={image} className={classes.image} />
      <Box className={classes.description}>
        <Typography component="h3">{description}</Typography>
      </Box>
    </Box>
  )
}
