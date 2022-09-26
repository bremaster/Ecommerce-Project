import React from 'react'

import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

type Props<T> = {
  label?: string
  value: T
  options: Array<Exclude<T, null>>
  onChange: (e: SelectChangeEvent<T>) => void
  placeholder: string
}

const YEN_MARK = '\xA5'

export const TestSelector = <T extends string | number | null>(props: Props<T>) => {
  return (
    <FormControl fullWidth size="small">
      <Select
        displayEmpty
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        IconComponent={KeyboardArrowDownIcon}
        sx={{
          '& legend': {
            width: 0,
          },
          '& svg': {
            fontSize: 18,
          },
        }}
      >
        <MenuItem value="" sx={{ fontFamily: 'Outfit' }}>
          {props.placeholder}
        </MenuItem>
        {props.options.map((option) => (
          <MenuItem key={`item-${option}`} value={option} sx={{ fontFamily: 'Outfit' }}>
            {YEN_MARK} {option.toLocaleString()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
