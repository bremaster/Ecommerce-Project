import React from 'react'
import { Grid, Box, Typography } from '@mui/material'

export const ShareLink = () => {
  return (
    <Box
      sx={{
        border: '1px solid #FE8B7B',
        borderRadius: '10px',
        padding: '24px 30px',
        maxWidth: (theme) => theme.breakpoints.values.sm,
      }}
    >
      <Grid container alignItems="center" justifyItems="center">
        <Grid
          item
          xs={12}
          sm={3}
          sx={{ textAlign: 'center', paddingBottom: '1rem', pl: { xs: '15px', sm: 0 } }}
        >
          <img src="/assets/share-link.svg" alt="share-link" />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography
            sx={{
              fontFamily: "'Noto Sans JP'",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '14px',
              color: '#4A4A4A',
              letterSpacing: '0.03em',
            }}
          >
            ギフト受取用URLをお相手にSNSやメール等で送り、
            お相手が住所等を入力することでギフトが届きます。
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
