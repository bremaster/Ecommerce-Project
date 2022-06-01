import withStyles from '@mui/styles/withStyles'
import { TextField } from '@mui/material'

export const FormInputField = withStyles({
  root: {
    '& .MuiFilledInput-root': {
      backgroundColor: '#F7F7F7',
      borderRadius: '10px',
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
  },
})(TextField)
