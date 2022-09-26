import React from 'react'

import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'

const NonSelectedItemWrap = styled(Stack)((props) => ({
  borderRadius: 10,
  height: 150,
  padding: '20px',
  backgroundImage:
    'linear-gradient(to right, #e2e2e2 40%, rgba(255,255,255,0) 0%), linear-gradient(to right, #e2e2e2 40%, rgba(255,255,255,0) 0%), linear-gradient(#e2e2e2 40%, rgba(255,255,255,0) 0%), linear-gradient(#e2e2e2 40%, rgba(255,255,255,0) 0%)',
  backgroundPosition: 'top, bottom, right, left',
  backgroundSize: '10px 2px, 10px 2px, 2px 10px, 2px 10px',
  backgroundRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y',
  [props.theme.breakpoints.down('md')]: {
    height: '100px',
    padding: '20px',
    '& p': {
      fontSize: 16,
    },
  },
}))

export const DisabledGiftItem: React.FC = () => {
  return (
    <Box position="relative">
      <NonSelectedItemWrap
        justifyContent="start"
        alignItems="center"
        direction="row"
        gap={2.5}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '100%',
            letterSpacing: '0.03em',
            color: '#E2E2E2',
            padding: {
              xs: '0 0',
              md: '1rem 0',
            },
            width: '100%',
          }}
        >
          ＋ タップしてギフトを選択
        </Typography>
      </NonSelectedItemWrap>
    </Box>
  )
}
