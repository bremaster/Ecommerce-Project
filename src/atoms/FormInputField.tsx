import { TextField } from '@mui/material'

import { styled } from '@mui/system'

export const FormInputField = styled(TextField)({
  '& .MuiFilledInput-root': {
    backgroundColor: '#F7F7F7',
    borderRadius: '10px',
    padding: 0,
  },
  '& .MuiFilledInput-input': {
    padding: '12px 10px',
    color: '#4A4A4A',
    borderRadius: '10px',
  },
  '& .MuiFilledInput-root:hover:not(.Mui-disabled):before': {
    border: 'none',
  },
  '& .MuiFilledInput-underline:before': {
    borderBottom: 'none',
  },
  '& .MuiFilledInput-underline:after': {
    borderBottom: 'none',
  },
  '& .MuiFilledInput-multiline': {
    padding: '0',
  },
})
