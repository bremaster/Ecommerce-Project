import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

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
  return (
    <Stack gap={2} alignItems="center">
      <Box component="img" src={item.title} sx={{ width: '48px' }} />
      <Stack gap={2} direction={option?.direction || 'column'} alignItems="center">
        <Box component="img" src={item.image} sx={{ height: '72px' }} />
        <Box>
          <Typography
            variant="h6"
            component="h6"
            align={option?.direction === 'row' ? 'left' : 'center'}
            style={{
              fontSize: '14px',
              lineHeight: '21px',
              fontWeight: 700,
              fontFamily: 'Noto Sans JP',
              color: 'rgba(74, 74, 74, 1)',
            }}
          >
            {item.text1}
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            align={option?.direction === 'row' ? 'left' : 'center'}
            style={{
              fontSize: '14px',
              lineHeight: '21px',
              fontWeight: 700,
              fontFamily: 'Noto Sans JP',
              color: 'rgba(74, 74, 74, 1)',
            }}
          >
            {item.text2}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  )
}

export { ProductGuideItem }
