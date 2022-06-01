import React from 'react'

import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { Stack, Typography } from '@mui/material'

import { COLOR } from 'theme'

const useStyles = makeStyles((theme) =>
  createStyles({
    catalogueItemWrap: {
      background: '#FFFFFF',
      boxShadow: '0px 0px 20px rgba(255, 162, 111, 0.1)',
      borderRadius: '10px',
      height: '100%',
      maxHeight: '162px',
      cursor: 'pointer',
      padding: '16px',
      [theme.breakpoints.down(700)]: {
        padding: '12px',
        height: '120px',
      },
    },
    image: {
      height: '100%',
      borderRadius: '10px',
      WebkitTransition: 'all .3s ease-in-out',
    },
    brand: {
      cursor: 'pointer',
      fontSize: '14px',
      color: 'rgba(207, 202, 196, 1)',
      marginTop: '3px',
      lineHeight: '20px',
      fontWeight: 700,
      letterSpacing: '0.03em',
      [theme.breakpoints.down(700)]: {
        fontSize: '10px',
      },
    },
    title: {
      cursor: 'pointer',
      fontSize: '18px',
      color: 'rgba(74, 74, 74, 1)',
      fontWeight: 700,
      lineHeight: '27px',
      letterSpacing: '0.03em',
      [theme.breakpoints.down(700)]: {
        lineHeight: '20px',
        fontSize: '12px',
      },
    },
    progressColor: {
      color: COLOR.primaryNavy,
    },
  })
)

type Props = {
  width: string
  img: string
  title: string
  brand: string
}

export const CatalogueItem: React.FC<Props> = ({ width, img, title, brand }) => {
  const classes = useStyles({ width1: '132px', width2: '96px' })

  return (
    <Stack width={width} direction="row" className={classes.catalogueItemWrap} gap={2}>
      <img className={classes.image} src={img} alt={brand} loading="lazy" />
      <Stack justifyContent="center">
        <Typography className={classes.brand}>{brand}</Typography>
        <Typography className={classes.title}>{title}</Typography>
      </Stack>
    </Stack>
  )
}
