import React from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

type Props<T> = {
  label: string
  value: T
  options: Array<Exclude<T, null>>
  onChange: (e: SelectChangeEvent<T>) => void
}

const YEN_MARK = '\xA5'

const MenuProps = {
  PaperProps: {
    style: {
      fontFamily: 'Outfit',
    },
  },
}

export const TestSelector = <T extends string | number | null>(props: Props<T>) => {
  const labelId = `${props.label}-label`

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={labelId} shrink={true}></InputLabel>
      <Select
        displayEmpty
        labelId={labelId}
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        MenuProps={MenuProps}
        IconComponent={KeyboardArrowDownIcon}
        sx={{
          fontFamily: 'Outfit',
          '& legend': {
            width: 0,
          },
          '& svg': {
            fontSize: 18,
          },
        }}
      >
        {props.options.map((option) => (
          <MenuItem key={`item-${option}`} value={option} sx={{ fontFamily: 'Outfit' }}>
            {YEN_MARK} {option.toLocaleString()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
