import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import Button from '@mui/material/Button'
import { COLOR } from 'theme'

const useStyles = makeStyles(() =>
  createStyles({
    buttonStyle: {
      fontSize: '1rem',
      padding: '0.8rem',
      backgroundColor: COLOR.backgroundWhite,
      color: COLOR.textBlack,
      border: `1px solid  ${COLOR.quizoutlineGray}`,
      boxSizing: 'border-box',
      borderRadius: '5px',
      '& .MuiButton-label': {
        justifyContent: 'flex-start',
        paddingLeft: '0.5rem',
        letterSpacing: '0.15rem !important', // because of material ui tool kit
      },
      '&:hover': {
        backgroundColor: COLOR.quizoutlineGray,
      },
      '&:active': {
        backgroundColor: COLOR.quizoutlineGray,
      },
      '&:focus': {
        boxShadow: `0 0 0 0.2rem ${COLOR.quizoutlineGray}`,
      },
    },
  })
)

type Props = {
  children: React.ReactNode
  handleClick?: () => void
}

export const AnswerButton = (props: Props): JSX.Element => {
  const classes = useStyles()
  return (
    <Button
      className={classes.buttonStyle}
      variant="contained"
      disableElevation={true}
      fullWidth
      onClick={props.handleClick}
    >
      {props.children}
    </Button>
  )
}
