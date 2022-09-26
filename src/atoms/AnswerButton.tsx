import React from 'react'
import Button from '@mui/material/Button'
import { COLOR } from 'theme'
import { styled } from '@mui/system'

const ButtonStyle = styled(Button)({
  fontSize: '1rem',
  padding: '0.8rem',
  backgroundColor: COLOR.backgroundWhite,
  color: COLOR.textBlack,
  border: `1px solid  ${COLOR.quizoutlineGray}`,
  boxSizing: 'border-box',
  borderRadius: '5px',
  fontWeight: 700,
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
})

type Props = {
  children: React.ReactNode
  handleClick?: () => void
}

export const AnswerButton = (props: Props): JSX.Element => {
  return (
    <ButtonStyle
      variant="contained"
      disableElevation={true}
      fullWidth
      onClick={props.handleClick}
    >
      {props.children}
    </ButtonStyle>
  )
}
