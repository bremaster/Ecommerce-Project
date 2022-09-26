import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import { styled } from '@mui/system'

const GradientStyledButton = styled(Button)({
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  borderRadius: '10px',
  color: 'white',
  fontFamily: 'Noto Sans JP',
  textAlign: 'center',
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

export const GradientButton = ({
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
    <GradientStyledButton
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
    </GradientStyledButton>
  )
}
