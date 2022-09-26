import React from 'react'

import { Typography, Box, Stack, BoxProps } from '@mui/material'

export const Card = ({
  num,
  header,
  children,
  iconAtTopRight,
  ...rest
}: {
  num?: number
  header?: string
  iconAtTopRight?: React.ReactNode
  children: React.ReactNode
} & BoxProps) => {
  const noHeader = !!num === false && !!header === false

  return (
    <Box
      sx={{
        background: '#FFFFFF',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: '10px',
        padding: noHeader ? '15px 25px 15px 25px' : '35px 25px 15px 25px',
        position: 'relative',
      }}
      {...rest}
    >
      {noHeader === false && (
        <Box sx={{ position: 'absolute', top: '35px', right: '25px' }}>
          {iconAtTopRight}
        </Box>
      )}
      <Stack
        direction="row"
        alignItems="center"
        spacing="8px"
        mb={noHeader ? '' : '30px'}
      >
        {!!num && (
          <Box
            sx={{
              fontFamily: "'Outfit'",
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '20px',
              color: '#FFFFFF',
              background: '#CFCAC4',
              width: '32px',
              height: '32px',
              textAlign: 'center',
              lineHeight: '32px',
              borderRadius: '50%',
            }}
          >
            {num}
          </Box>
        )}
        {!!header && (
          <Typography
            sx={{
              fontFamily: "'Noto Sans JP'",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '20px',
              letterSpacing: '0.03em',
              color: '#CFCAC4',
            }}
          >
            {header}
          </Typography>
        )}
      </Stack>
      {noHeader === true ? (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {children}
          {iconAtTopRight}
        </Stack>
      ) : (
        <>{children}</>
      )}
    </Box>
  )
}
