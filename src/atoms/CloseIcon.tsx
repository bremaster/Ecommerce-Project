import React from 'react'

import { Close as MuiCloseIcon } from '@mui/icons-material'
import { Box } from '@mui/material'

import { styled } from '@mui/system'

import { COLOR } from 'theme'

const Wrap = styled(Box)({
  wrapper: {
    backgroundColor: COLOR.gray400,
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const CloseIcon = ({ onClick }: { onClick: () => void }): JSX.Element => {
  return (
    <Wrap onClick={onClick}>
      <MuiCloseIcon />
    </Wrap>
  )
}
