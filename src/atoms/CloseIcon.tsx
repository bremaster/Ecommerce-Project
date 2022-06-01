import React from 'react'

import { Close as MuiCloseIcon } from '@mui/icons-material'
import { Box } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

import { COLOR } from 'theme'

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: COLOR.gray400,
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const CloseIcon = ({ onClick }: { onClick: () => void }): JSX.Element => {
  const classes = useStyles()

  return (
    <Box className={classes.wrapper} onClick={onClick}>
      <MuiCloseIcon />
    </Box>
  )
}
