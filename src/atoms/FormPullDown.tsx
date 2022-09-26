import React from 'react'

import { FormControl, Select, OutlinedInput, SelectChangeEvent } from '@mui/material'

import { styled } from '@mui/system'

const Wrapper = styled(FormControl)({
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
  '& fieldset': {
    border: '0 !important',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '#c4c4c4',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    border: '#c4c4c4',
  },
})

export const FormPullDown = <T extends string | number>(props: {
  label: string
  value: T | undefined
  handleChange: undefined | ((event: SelectChangeEvent<T>) => void)
  items: T[]
  placeholder: string
  inputRef: React.Ref<unknown>
  id?: string
  name?: string
}): JSX.Element => {
  const labelId = `${props.label}-select-label`

  return (
    <Wrapper fullWidth>
      <Select
        native
        autoWidth
        displayEmpty
        variant="outlined"
        input={<OutlinedInput />}
        labelId={labelId}
        id={props.id}
        name={props.id}
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
    </Wrapper>
  )
}
