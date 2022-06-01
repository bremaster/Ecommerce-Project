import React from 'react'
import { Box, AppBar, Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { Logo } from 'atoms/Logo'
import { BackButton } from 'atoms/BackButton'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    position: 'relative',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

interface Props {
  /** if true, history back button is displayed at left */
  backButton?: boolean
}

export const MenuAppBar: React.FC<Props> = ({ backButton = false }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        {backButton && <BackButton position="top" />}
        <Box display="flex" flexDirection="column" alignItems="center" mt={1} mb={2}>
          <Logo />
        </Box>
      </AppBar>
    </div>
  )
}
