import React, { forwardRef } from 'react'
import { Button } from '@mui/material'
import { COLOR } from 'theme'

export type StyleProps = {
  buttonType: 'outlined' | 'primary' | 'white' | 'outlinedSecondary'
}

type ValueOf<T> = T[keyof T]
export type StyleMap = ValueOf<StyleProps>

export type ButtonProps = {
  isDisable?: boolean
  onClick?: () => void
  children?: string
  fullWidth?: boolean
  type?: 'button' | 'reset' | 'submit' | undefined
  href?: string
  inactive?: boolean
  className?: string
} & StyleProps

const colorMap: { [key in StyleMap]: string } = {
  outlined: COLOR.primaryNavy,
  primary: COLOR.primaryNavy,
  white: COLOR.backgroundWhite,
  outlinedSecondary: COLOR.subBlue,
}

const textColorMap: { [key in StyleMap]: string } = {
  outlined: COLOR.primaryNavy,
  primary: COLOR.textWhite,
  white: COLOR.textBlack,
  outlinedSecondary: COLOR.subBlue,
}

const isDefaultFullWidthMap: { [key in StyleMap]: boolean } = {
  outlined: true,
  primary: false,
  white: true,
  outlinedSecondary: true,
}

const variantMap = {
  outlined: 'outlined',
  primary: 'text',
  white: 'contained',
  outlinedSecondary: 'outlined',
} as const

export const SquareButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    inactive,
    isDisable,
    buttonType,
    onClick,
    children,
    fullWidth,
    type,
    href,
    className,
  } = props
  return (
    <Button
      variant={variantMap[buttonType]}
      disableElevation={buttonType === 'primary'}
      className={className} // add className passed by props
      ref={ref}
      disabled={isDisable ? true : false}
      onClick={onClick}
      fullWidth={fullWidth !== undefined ? fullWidth : isDefaultFullWidthMap[buttonType]}
      type={type}
      href={href}
      sx={{
        '&:focus': {
          outline: 'none',
        },
        color: textColorMap[buttonType],
        '&:disabled': {
          color: textColorMap[buttonType],
          background: buttonType === 'primary' ? COLOR.primaryLightenNavy : undefined,
        },
        background: inactive
          ? `${COLOR.inactiveButtonGray} !important`
          : ['outlined', 'outlinedSecondary'].includes(buttonType)
          ? undefined
          : colorMap[buttonType],
        border: ['outlined', 'outlinedSecondary'].includes(buttonType)
          ? `1px solid  ${colorMap[buttonType]}`
          : undefined,
        padding: '0.5rem 1.5rem',
        fontWeight: 700,
        gridRow: '4 / 5',
        gridColumn: '1 / 6',
        justifySelf: 'center',
        alignSelf: 'end',
        height: '3rem',
        '&:hover': {
          background: ['outlined', 'outlinedSecondary'].includes(buttonType)
            ? undefined
            : colorMap[buttonType],
          border: ['outlined', 'outlinedSecondary'].includes(buttonType)
            ? `1px solid  ${colorMap[buttonType]}`
            : undefined,
        },
        '&:active': {
          background: ['outlined', 'outlinedSecondary'].includes(buttonType)
            ? undefined
            : colorMap[buttonType],
          border: ['outlined', 'outlinedSecondary'].includes(buttonType)
            ? `1px solid  ${colorMap[buttonType]}`
            : undefined,
        },
      }}
    >
      {children}
    </Button>
  )
})

SquareButton.displayName = 'SquareButton'
