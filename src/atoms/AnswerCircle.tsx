import React, { FC } from 'react'
import { Typography, Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { COLOR } from 'theme'

import { styled } from '@mui/system'

export const sizeMap = {
  small: '30px',
  medium: '40px',
} as const

export type StyleProps = {
  size: keyof typeof sizeMap
}
export type AnswerProps = {
  onClick?: () => void
  className?: string
  description?: string | null
} & StyleProps

const StyledIconButton = styled(IconButton)((props: StyleProps) => {
  return {
    color: COLOR.textBlack,
    border: `2px solid  ${COLOR.primaryNavy}`,
    boxSizing: 'border-box',
    minWidth: sizeMap[props.size ? props.size : 'small'],
    width: sizeMap[props.size ? props.size : 'small'],
    height: sizeMap[props.size ? props.size : 'small'],
    '&:hover': {
      backgroundColor: COLOR.quizoutlineGray,
    },
    '&:active': {
      backgroundColor: COLOR.quizoutlineGray,
    },
    '&:focus': {
      outline: 'none',
    },
  }
})

export const AnswerCircle: FC<AnswerProps> = (props) => {
  const { onClick, size, description } = props

  return (
    <Box textAlign="center">
      <StyledIconButton size={size} onClick={onClick}></StyledIconButton>
      <Box mt={3}>
        <Typography>{description}</Typography>
      </Box>
    </Box>
  )
}
