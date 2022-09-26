import React from 'react'

import { Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

const Wrap = styled(Stack)({
  height: '80px',
  width: '157px',
  cursor: 'pointer',
  backgroundColor: '#F4F5F7',
  borderRadius: '7px',
})

const Description = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontSize: '14px',
  fontWeight: 500,
  letterSpacing: '0.03em',
  marginLeft: '15px',
})

export type EventProps = {
  image: string
  description: string
  onClick?: () => void
}

export const EventItem = ({ image, description, onClick = undefined }: EventProps) => {
  return (
    <Wrap
      onClick={onClick}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Description>{description}</Description>
      <img src={image} style={{ width: '60px' }} />
    </Wrap>
  )
}
