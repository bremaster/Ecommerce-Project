import React from 'react'

import { Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { COLOR } from 'theme'

const useStyles = makeStyles({
  prefix: {
    color: COLOR.textWhite,
    fontSize: '10px',
    lineHeight: '20px',
    backgroundColor: COLOR.primaryNavy,
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    textAlign: 'center',
    paddingLeft: '1px', // 文字が中央に来ないので微調整
  },
})

export const BulletPoint = (props: { character: number | string }): JSX.Element => {
  const classes = useStyles()

  return (
    <Box
      className={classes.prefix}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {props.character}
    </Box>
  )
}
