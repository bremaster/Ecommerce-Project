import React from 'react'
import { Box } from '@mui/material'

// default is full width and 56px height
type Props = {
  onClick?: () => void
}

export const CancelButton = ({ onClick }: Props) => {
  return (
    <Box
      component="img"
      src="/assets/cancel.svg"
      sx={{
        width: 20,
        position: 'absolute',
        right: '20px',
        top: '20px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    />
  )
}
