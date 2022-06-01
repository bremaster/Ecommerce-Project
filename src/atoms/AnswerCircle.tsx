import React, { FC } from 'react'
import { Theme, Typography, Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import IconButton from '@mui/material/IconButton'
import { COLOR } from 'theme'

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

const useStyles = makeStyles<Theme, StyleProps>({
  buttonStyle: ({ size }) => ({
    color: COLOR.textBlack,
    border: `2px solid  ${COLOR.primaryNavy}`,
    boxSizing: 'border-box',
    minWidth: sizeMap['small'],
    width: sizeMap[size],
    height: sizeMap[size],
    '&:hover': {
      backgroundColor: COLOR.quizoutlineGray,
    },
    '&:active': {
      backgroundColor: COLOR.quizoutlineGray,
    },
    '&:focus': {
      outline: 'none',
    },
  }),
})

export const AnswerCircle: FC<AnswerProps> = (props) => {
  const { onClick, size, description } = props
  const classes = useStyles({ size })

  return (
    <Box textAlign="center">
      <IconButton
        size={size}
        className={classes.buttonStyle}
        onClick={onClick}
      ></IconButton>
      <Box mt={3}>
        <Typography>{description}</Typography>
      </Box>
    </Box>
  )
}
