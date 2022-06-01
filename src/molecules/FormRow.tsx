import React, { FC } from 'react'
import { FormInputField } from 'atoms/FormInputField'
import { Typography, Box, InputLabel, TextFieldProps } from '@mui/material'
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
      color: '#4A4A4A',
      fontFamily: "'Noto Sans JP'",
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      marginBottom: '0',
      lineHeight: '32px',
    },
  },
})

export type Props = {
  register: React.Ref<unknown>
  invalid: boolean
  errorMessage: string
  mb?: string
} & TextFieldProps

export const FormRow: FC<Props> = ({
  label,
  value,
  onChange,
  type,
  id,
  register,
  invalid,
  errorMessage,
  placeholder,
  mb = '24px',
  ...rest
}) => {
  const classes = useStyles()

  return (
    <Box mb={mb} className={classes.rowRoot}>
      <InputLabel shrink htmlFor={id}>
        {label}
      </InputLabel>
      <FormInputField
        inputRef={register}
        fullWidth
        required
        value={value}
        onChange={onChange}
        type={type}
        variant="filled"
        id={id}
        name={id}
        placeholder={!!placeholder ? placeholder : `${label}を入力してください`}
        {...rest}
      ></FormInputField>
      {invalid && <Typography id="alert">{errorMessage}</Typography>}
    </Box>
  )
}
