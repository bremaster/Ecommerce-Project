import React from 'react'
import { Box, Stack } from '@mui/material'

const dotstyle = {
  width: 7,
  height: 7,
  backgroundColor: '#CFCAC4',
  borderRadius: 4,
}

const activestyle = {
  width: 7,
  height: 7,
  backgroundColor: '#FE8B7B',
  borderRadius: 4,
}

type Props = {
  num: number
}
const CarouselItem = ({ num }: Props): JSX.Element => {
  return (
    <Stack gap={1} direction="row" alignItems="center" justifyContent="center">
      <Box sx={num === 1 ? activestyle : dotstyle} />
      <Box sx={num === 2 ? activestyle : dotstyle} />
      <Box sx={num === 3 ? activestyle : dotstyle} />
      <Box sx={num === 4 ? activestyle : dotstyle} />
    </Stack>
  )
}

export default CarouselItem
