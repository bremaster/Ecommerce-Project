import React from 'react'

import { Box, Stack } from '@mui/material'

import { LANDING_USE_ITEM_LIST } from 'constants/index'

import { UseMobileItem } from 'molecules'

export const UseMobile = () => {
  return (
    <Stack gap={5} mt={12}>
      {LANDING_USE_ITEM_LIST.map((item, index) => (
        <Box key={index}>
          <UseMobileItem item={item} number={index + 1} />
        </Box>
      ))}
    </Stack>
  )
}
