import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { MenuAppBar } from '../../organisms/MenuAppBar'
import { LpFooter } from './componets/LpFooter'

export function Privacy() {
  return (
    <React.Fragment>
      <Container>
        <MenuAppBar />

        {/* Cover */}
        <Box pb={5}>
          <Typography variant="h3">Privacy Policy</Typography>
          <Typography variant="body2">detail</Typography>
        </Box>
      </Container>
      <LpFooter />
    </React.Fragment>
  )
}
