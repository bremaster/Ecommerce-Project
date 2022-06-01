import React, { forwardRef } from 'react'
import { Button, Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { COLOR } from 'theme'
import clsx from 'clsx'

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

const useStyles = makeStyles<Theme, StyleProps>(() =>
  createStyles({
    inactive: {
      background: `${COLOR.inactiveButtonGray}!important`,
    },
    buttonStyle: {
      '&:focus': {
        outline: 'none',
      },
      color: ({ buttonType }) => textColorMap[buttonType],
      '&:disabled': {
        color: ({ buttonType }) => textColorMap[buttonType],
        background: ({ buttonType }) => {
          if (buttonType === 'primary') return COLOR.primaryLightenNavy
        },
      },
      background: ({ buttonType }) =>
        ['outlined', 'outlinedSecondary'].includes(buttonType)
          ? undefined
          : colorMap[buttonType],
      border: ({ buttonType }) =>
        ['outlined', 'outlinedSecondary'].includes(buttonType)
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
        background: ({ buttonType }) =>
          ['outlined', 'outlinedSecondary'].includes(buttonType)
            ? undefined
            : colorMap[buttonType],
        border: ({ buttonType }) =>
          ['outlined', 'outlinedSecondary'].includes(buttonType)
            ? `1px solid  ${colorMap[buttonType]}`
            : undefined,
      },
      '&:active': {
        background: ({ buttonType }) =>
          ['outlined', 'outlinedSecondary'].includes(buttonType)
            ? undefined
            : colorMap[buttonType],
        border: ({ buttonType }) =>
          ['outlined', 'outlinedSecondary'].includes(buttonType)
            ? `1px solid  ${colorMap[buttonType]}`
            : undefined,
      },
    },
  })
)

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
  const classes = useStyles({ buttonType })

  return (
    <Button
      variant={variantMap[buttonType]}
      disableElevation={buttonType === 'primary'}
      className={clsx(inactive && classes.inactive, classes.buttonStyle, className)} // add className passed by props
      ref={ref}
      disabled={isDisable ? true : false}
      onClick={onClick}
      fullWidth={fullWidth !== undefined ? fullWidth : isDefaultFullWidthMap[buttonType]}
      type={type}
      href={href}
    >
      {children}
    </Button>
  )
})

SquareButton.displayName = 'SquareButton'
