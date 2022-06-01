import React from 'react'
import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material'

const style = {
  '& svg': {
    color: '#FE8B7B',
  },
  '& .MuiFormControlLabel-label': {
    fontFamily: "'Noto Sans JP'",
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '270%',
    letterSpacing: '0.03em',
    color: '#4A4A4A',
  },
  '& .Mui-checked': {
    color: '#FE8B7B',
  },
  '& .MuiIconButton-colorSecondary:hover': {
    // change opacity
    backgroundColor: `#FE8B7B11`,
  },
}

type Props = {
  label: string
  checked: boolean
  onClick: () => void
}

export const Checkbox = (props: Props) => (
  <FormControlLabel
    sx={style}
    label={props.label}
    control={<MuiCheckbox checked={props.checked} onClick={props.onClick} size="small" />}
  />
)
