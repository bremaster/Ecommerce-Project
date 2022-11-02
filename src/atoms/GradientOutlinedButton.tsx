import React from 'react'

import { Button, ButtonProps, Typography } from '@mui/material'

import { styled } from '@mui/system'

const StyledButton = styled(Button)({
  backgroundColor: '#FFF',
  border: `1px solid transparent`,
  borderRadius: '10px',
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'border-box, text',
  boxShadow: '2px 1000px 2px #fff inset',
  '&:focus': {
    outline: 0,
  },
  '& h6': {
    fontFamily: 'Outfit',
    fontWeight: 700,
    background:
      'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
})

// default is full width and 56px height
type Props = ButtonProps & {
  width?: string
  height?: string
  type?: 'button' | 'reset' | 'submit' | undefined
  href?: string
  onClick?: () => void
  fontSize?: number
}

export const GradientOutlinedButton = ({
  width = '100%',
  height = '48px',
  children,
  type,
  href,
  onClick,
  fontSize,
}: Props) => {
  return (
    <StyledButton
      sx={{
        width: width,
        height: height,
        '& h6': {
          fontSize: fontSize,
        },
      }}
      type={type}
      href={href}
      onClick={onClick}
    >
      <Typography variant="h6" component="h6">
        {children}
      </Typography>
    </StyledButton>
  )
}
