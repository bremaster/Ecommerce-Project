import React, { FC } from 'react'
import { FormInputField } from 'atoms'
import { Typography, Box, InputLabel, TextFieldProps } from '@mui/material'

import { styled } from '@mui/system'

const RowRoot = styled(Box)({
  '& input': {
    border: 'none',
    height: '20px',
    letterSpacing: '0',
    fontSize: '16px',
  },
  '& #alert': {
    color: '#FE8B7B',
    fontSize: '12px',
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
  '& span': {
    color: '#FE8B7B',
    fontFamily: 'Noto Sans JP',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '32px',
    letterSpacing: '0.03em',
    textAlign: 'left',
  },
})

export type Props = {
  register?: React.Ref<unknown>
  invalid: boolean
  errorMessage: string
  mb?: string
  required?: boolean
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
  required = false,
  ...rest
}) => {
  return (
    <RowRoot
      mb={mb}
      sx={{
        '& input': {
          border: `2px solid ${invalid ? '#FE8B7B' : '#FFF'} !important`,
        },
        '& textarea': {
          border: `2px solid ${invalid ? '#FE8B7B' : '#FFF'} !important`,
        },
      }}
    >
      <InputLabel shrink id={`title_${id}`} htmlFor={id}>
        {label} {required && <span>（必須）</span>}
      </InputLabel>
      <FormInputField
        inputRef={register}
        fullWidth
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
    </RowRoot>
  )
}
