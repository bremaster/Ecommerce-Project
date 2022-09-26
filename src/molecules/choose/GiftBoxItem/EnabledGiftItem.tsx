import React from 'react'

import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'

const SelectItem = styled(Stack)((props) => ({
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
  borderRadius: 10,
  height: 150,
  padding: '20px',
  [props.theme.breakpoints.down('sm')]: {
    height: '100px',
    padding: '20px',
    '& p': {
      fontSize: 18,
    },
  },
}))

type Props = {
  onClick?: () => void
}

export const EnabledGiftItem: React.FC<Props> = ({ onClick }) => {
  return (
    <Box sx={{ cursor: 'pointer' }} position="relative" onClick={onClick}>
      <SelectItem justifyContent="start" alignItems="center" direction="row">
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '100%',
            letterSpacing: '0.03em',
            color: '#4A4A4A',
            cursor: 'pointer',
            padding: {
              xs: '0 0',
              md: '1rem 0',
            },
            width: '100%',
          }}
        >
          ＋ タップしてギフトを選択
        </Typography>
      </SelectItem>
    </Box>
  )
}
