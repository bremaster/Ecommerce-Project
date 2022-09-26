import React from 'react'

import { Stack, Box, Typography } from '@mui/material'

type Props = {
  onChange: (value: boolean) => void
  checked: boolean
  text?: {
    on: string
    off: string
  }
}

export const Switch = ({
  onChange,
  checked,
  text = { on: '有り', off: '無し' },
}: Props) => {
  return (
    <Stack direction="row" sx={{ cursor: 'pointer' }}>
      <Stack onClick={() => onChange(true)} direction="row" alignItems="center" mr="1rem">
        <Circle filled={checked} />
        <Typography
          sx={{
            ml: '4px',
            fontFamily: 'Noto Sans JP',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '12px',
          }}
        >
          {text.on}
        </Typography>
      </Stack>
      <Stack onClick={() => onChange(false)} direction="row" alignItems="center">
        <Circle filled={!checked} />
        <Typography
          sx={{
            ml: '4px',
            fontFamily: 'Noto Sans JP',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '12px',
          }}
        >
          {text.off}
        </Typography>
      </Stack>
    </Stack>
  )
}

const Circle = ({ filled }: { filled: boolean }) => {
  return (
    <Box
      sx={{
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        border: '1px solid #FE8B7B',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {filled && (
        <Box
          sx={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#FE8B7B',
          }}
        />
      )}
    </Box>
  )
}
