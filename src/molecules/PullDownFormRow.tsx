import React from 'react'
import { FormPullDown } from 'atoms'

import { Typography, Box, InputLabel, SelectChangeEvent } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

import { COLOR } from 'theme'

const useStyles = makeStyles({
  rowRoot: {
    '& input': {
      border: 'none',
      height: '20px',
      letterSpacing: '0',
      fontSize: '16px',
    },
    '& #alert': {
      color: COLOR.alertRed,
      fontSize: '12px',
      paddingTop: '8px',
    },
    '& .MuiFormLabel-root': {
      fontFamily: "'Noto Sans JP'",
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      color: '#4A4A4A',
    },
  },
})

export type Props<T> = {
  label: string
  value: T | undefined
  items: T[]
  onChange: undefined | ((event: SelectChangeEvent<T>) => void)
  register: React.Ref<unknown>
  invalid: boolean
  errorMessage: string
  placeholder?: string
}

export const PullDownFormRow = <T extends string | number>({
  label,
  value,
  items,
  onChange,
  register,
  invalid,
  errorMessage,
  placeholder,
}: Props<T>): JSX.Element => {
  const classes = useStyles()

  return (
    <Box mb={2} className={classes.rowRoot}>
      <InputLabel shrink>{label}</InputLabel>
      <FormPullDown
        label={label}
        value={value}
        items={items}
        handleChange={onChange}
        inputRef={register}
        placeholder={!!placeholder ? placeholder : `${label}を入力してください`}
      ></FormPullDown>
      {invalid && <Typography id="alert">{errorMessage}</Typography>}
    </Box>
  )
}
