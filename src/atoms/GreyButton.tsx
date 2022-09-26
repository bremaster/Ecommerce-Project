import React from 'react'

import { Button, ButtonProps } from '@mui/material'

import { styled } from '@mui/system'

const StyledButton = styled(Button)({
  borderRadius: '10px',
  color: 'white',
  fontFamily: 'Noto Sans JP',
  textAlign: 'center',
  height: 48,
  backgroundColor: '#CFCAC4',
  fontSize: 15,
  '&:hover': {
    backgroundColor: '#CFCAC4',
    color: 'white',
  },
  fontWeight: 700,
})

// default is full width and 56px height
type Props = ButtonProps & {
  width?: string
  height?: string
  type?: 'button' | 'reset' | 'submit' | undefined
  href?: string
  onClick?: () => void
  fontSize?: number
  disabled?: boolean
}

export const GreyButton = ({
  width = '100%',
  height = '48px',
  type,
  href,
  onClick,
  fontSize,
  children,
  disabled = false,
}: Props) => {
  return (
    <StyledButton
      sx={{
        width: width,
        height: height,
        fontSize: fontSize,
      }}
      type={type}
      href={href}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  )
}
