import React from 'react'
import { Chip } from '@mui/material'
import { styled } from '@mui/system'

const StyledChip = styled(Chip)({
  borderRadius: '10px',
  color: '#FE8B7B',
  height: '20px',
  fontWeight: 900,
  background:
    'linear-gradient(102.49deg, #FFF3E9 -18.78%, #FFECDD -12.51%, #FFEAE7 56.55%, #EBE6FF 166.15%)',
  border: `1px solid  #FEA680`,
  boxSizing: 'border-box',
  fontSize: '10px',
  '& .MuiChip-labelSmall': {
    letterSpacing: '0rem',
  },
})

export const Tag: React.FC<{ children: React.ReactNode }> = (props) => {
  return <StyledChip size="small" label={props.children} />
}
