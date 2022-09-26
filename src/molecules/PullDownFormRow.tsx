import React from 'react'
import { FormPullDown } from 'atoms'

import { Typography, Box, InputLabel, SelectChangeEvent } from '@mui/material'

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
    fontFamily: "'Noto Sans JP'",
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    color: '#4A4A4A',
    margin: 0,
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

export type Props<T> = {
  label: string
  value: T | undefined
  items: T[]
  onChange: undefined | ((event: SelectChangeEvent<T>) => void)
  register: React.Ref<unknown>
  invalid: boolean
  errorMessage: string
  placeholder?: string
  required?: boolean
  id?: string
}

export const PullDownFormRow = <T extends string | number>({
  label,
  value,
  items,
  onChange,
  register,
  invalid,
  id,
  errorMessage,
  placeholder,
  required = false,
}: Props<T>): JSX.Element => {
  return (
    <RowRoot
      mb={2}
      sx={{
        '& select': {
          border: invalid
            ? `2px solid  #FE8B7B !important`
            : `1px solid  #C4C4C4 !important`,
        },
      }}
    >
      <InputLabel
        shrink
        id={
          `title_${id}` /*
						This id is used for validation check like below
						```
						 const errorElement = document.getElementById(`title_${errorFlag}`)
						 if (errorElement) {
							 errorElement.scrollIntoView()
						 }
						```
				*/
        }
        htmlFor={id}
      >
        {label} {required && <span>（必須）</span>}
      </InputLabel>
      <FormPullDown
        label={label}
        value={value}
        items={items}
        handleChange={onChange}
        inputRef={register}
        placeholder={!!placeholder ? placeholder : `${label}を入力してください`}
        id={id}
        name={id}
      ></FormPullDown>
      {invalid && <Typography id="alert">{errorMessage}</Typography>}
    </RowRoot>
  )
}
