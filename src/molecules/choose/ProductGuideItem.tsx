import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

const useProductGuideItemStyle = makeStyles({
  titleimage: {
    width: '48px',
  },
  image: {
    height: '72px',
  },
  text: {
    fontSize: '14px',
    lineHeight: '21px',
    fontWeight: 700,
    fontFamily: 'Noto Sans JP',
    color: 'rgba(74, 74, 74, 1)',
  },
})

type Props = {
  item: {
    title: string
    image: string
    text1: string
    text2: string
  }
  option?: {
    direction?: 'column' | 'row'
  }
}

const ProductGuideItem: React.FC<Props> = ({
  item,
  option = { direction: 'column' },
}) => {
  const classes = useProductGuideItemStyle()

  return (
    <Stack gap={2} alignItems="center">
      <Box component="img" src={item.title} className={classes.titleimage} />
      <Stack gap={2} direction={option?.direction || 'column'} alignItems="center">
        <Box component="img" src={item.image} className={classes.image} />
        <Box>
          <Typography
            variant="h6"
            component="h6"
            align={option?.direction === 'row' ? 'left' : 'center'}
            className={classes.text}
          >
            {item.text1}
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            align={option?.direction === 'row' ? 'left' : 'center'}
            className={classes.text}
          >
            {item.text2}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  )
}

export { ProductGuideItem }
