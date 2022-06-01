import React from 'react'
import { Box, Stack } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

const useProductGuideItemStyle = makeStyles({
  dot: {
    width: 7,
    height: 7,
    backgroundColor: '#CFCAC4',
    borderRadius: 4,
  },
  active: {
    width: 7,
    height: 7,
    backgroundColor: '#FE8B7B',
    borderRadius: 4,
  },
})

type Props = {
  num: number
}
const CarouselItem = ({ num }: Props): JSX.Element => {
  const classes = useProductGuideItemStyle()

  return (
    <Stack gap={1} direction="row" alignItems="center" justifyContent="center">
      <Box className={num === 1 ? classes.active : classes.dot} />
      <Box className={num === 2 ? classes.active : classes.dot} />
      <Box className={num === 3 ? classes.active : classes.dot} />
      <Box className={num === 4 ? classes.active : classes.dot} />
    </Stack>
  )
}

export default CarouselItem
