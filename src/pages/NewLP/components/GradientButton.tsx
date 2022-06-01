import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import Button from '@mui/material/Button'

const useStyles = makeStyles(() =>
  createStyles({
    buttonStyle: {
      background:
        'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
      borderRadius: '10px',
      color: 'white',
      fontFamily: 'Noto Sans JP',
      textAlign: 'center',
      width: '300px',
      height: '56px',
    },
  })
)

export const GradientButton = () => {
  const classes = useStyles()
  return (
    <Button className={classes.buttonStyle} variant="contained">
      ギフトを選ぶ
    </Button>
  )
}
