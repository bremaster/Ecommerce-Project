import React from 'react'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

type Props = {
  label: string
  values: string[]
  options: string[]
  handleChange: (event: SelectChangeEvent<string[]>) => void
}

// https://mui.com/material-ui/react-select/#checkmarks
export function MultiSelector(props: Props): JSX.Element {
  const labelId = `${props.label}-label`
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={labelId}>{props.label}</InputLabel>
      <Select
        multiple
        labelId={labelId}
        id={'id-' + props.label}
        value={props.values}
        onChange={props.handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {props.options.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={props.values.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
