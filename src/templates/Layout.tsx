import React from 'react'

import { CssBaseline, Container, Box } from '@mui/material'

import { DeliveryLiskNotice } from 'organisms'

// besides RecieverTop,jsx, GiverTop.jsx, and payment form
// background color is set at App.css

// avoid using FC
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/
type Props = {
  showNotice?: boolean
  children?: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
}
export const Layout = ({
  showNotice = false,
  maxWidth = 'sm',
  children,
}: Props): JSX.Element => {
  return (
    <React.Fragment>
      <CssBaseline />
      {showNotice && <DeliveryLiskNotice />}
      <Container maxWidth={maxWidth}>
        <Box py={2} display="flex" flexDirection="column" alignItems="center">
          {children}
        </Box>
      </Container>
    </React.Fragment>
  )
}
