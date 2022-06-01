import React from 'react'

import { FormControl, Select, OutlinedInput, SelectChangeEvent } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles({
  wrapper: {
    '& > div.MuiInputBase-root': {
      borderRadius: '10px',
    },
    '& select:focus': {
      borderRadius: '10px',
    },
    '& select': {
      padding: '12px 10px',
      border: '1px solid #c4c4c4',
      borderRadius: '10px',
    },
    '& select option[value=""]': {
      color: '#9F9F9F', // placeholder color default
    },
  },
  //https://stackoverflow.com/questions/61344448/remove-blue-outline-from-select-box-react-material-ui
  deleteBlueOutline: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #c4c4c4',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #c4c4c4',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '#c4c4c4',
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
      border: '#c4c4c4',
    },
  },
})

export const FormPullDown = <T extends string | number>(props: {
  label: string
  value: T | undefined
  handleChange: undefined | ((event: SelectChangeEvent<T>) => void)
  items: T[]
  placeholder: string
  inputRef: React.Ref<unknown>
}): JSX.Element => {
  const classes = useStyles()
  const labelId = `${props.label}-select-label`

  return (
    <FormControl fullWidth className={`${classes.wrapper} ${classes.deleteBlueOutline}`}>
      <Select
        native
        autoWidth
        displayEmpty
        variant="outlined"
        input={<OutlinedInput />}
        labelId={labelId}
        id={`${labelId} input`}
        value={props.value}
        label={props.label}
        onChange={props.handleChange}
        inputRef={props.inputRef}
      >
        <option disabled value="">
          {props.placeholder}
        </option>
        {props.items.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}
