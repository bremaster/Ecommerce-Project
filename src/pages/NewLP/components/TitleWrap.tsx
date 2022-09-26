import { Box } from '@mui/material'

import { styled } from '@mui/system'

export const TitleWrap = styled(Box)((props) => ({
  maxWidth: '1100px',
  width: '100%',
  margin: '0 auto',
  padding: '0 30px',
  [props.theme.breakpoints.down(900)]: {
    padding: '0 25px',
  },
}))
