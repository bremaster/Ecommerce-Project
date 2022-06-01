import React from 'react'

import { Box, Stack } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { GradientButton } from './components/GradientButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      overflow: 'hidden',
      width: '100%',
      '& img': {
        width: '100%',
        [theme.breakpoints.down(1000)]: {
          width: '150%',
        },
      },
      '& div': {
        [theme.breakpoints.down(1000)]: {
          display: 'none',
        },
      },
    },
  })
)

export const HeroCover: React.FC = () => {
  const classes = useStyles()
  return (
    <Stack alignItems="center" className={classes.wrapper}>
      <Box
        component="img"
        src="https://res.cloudinary.com/zeft/image/upload/v1653537449/zeft_landing/ZEFT_25_256_H_rhojnh.gif"
      />
      <Stack alignItems="center" py="100px">
        <GradientButton />
      </Stack>
    </Stack>
  )
}
