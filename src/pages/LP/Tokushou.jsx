import React from 'react'
import { Box, Container, Typography, Fragment } from '@mui/material'
import { MenuAppBar } from 'organisms/MenuAppBar'

import { LpFooter } from './componets/LpFooter'

export function Tokushou() {
  return (
    <Fragment>
      <Container>
        <MenuAppBar />

        {/* Cover */}
        <Box pb={5}>
          <Typography variant="h3">特定商取引法の関する表記</Typography>
          <Typography variant="body2">detail</Typography>
        </Box>
      </Container>
      <LpFooter />
    </Fragment>
  )
}
