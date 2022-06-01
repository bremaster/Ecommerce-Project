import React from 'react'

import { Box, Typography } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

import { COLOR } from 'theme'

const useStyles = makeStyles({
  text: {
    color: COLOR.gray700,
    letterSpacing: '0.1rem',
    cursor: 'pointer',
    fontSize: '14px',
  },
  prefix: {
    color: COLOR.gray700,
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
})

export const VacantRow = (props: {
  rowNumber: number
  text: string
  handleClick: () => void
}): JSX.Element => {
  const classes = useStyles()

  return (
    <Box onClick={props.handleClick} display="flex" alignItems="center">
      <Box pl="0.3rem" pr="1.5rem" className={classes.prefix}>
        ＋
      </Box>
      <Typography className={classes.text}>
        {`${props.rowNumber}つ目のギフトを選ぶ`}
      </Typography>
    </Box>
  )
}
