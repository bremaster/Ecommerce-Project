import React from 'react'
import { COLOR } from 'theme'

import { Box, Typography } from '@mui/material'

export const DeliveryLiskNotice: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        padding: '1rem 0',
        borderTop: `0.5px solid ${COLOR.gray400}`,
        borderBottom: `0.5px solid ${COLOR.gray400}`,
        boxSizing: 'border-box',
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '10px',
        }}
      >
        年末年始の各販売出荷元およびZEFT運営事務局休業のため、
      </Typography>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: '10px',
          textDecoration: 'underline',
          textDecorationColor: COLOR.gray800,
        }}
      >
        お届けまでに通常より多くの日数を頂戴しております。
      </Typography>
    </Box>
  )
}
