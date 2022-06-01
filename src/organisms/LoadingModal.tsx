import React from 'react'
import { Modal, Backdrop, Fade, CircularProgress } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

//import { COLOR } from 'theme';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    padding: '2rem',
    /* '& .MuiCircularProgress-root': { */
    /*   color: COLOR.primaryNavy, */
    /* }, */
  },
  message: {
    marginTop: '0.5rem',
    color: 'white',
    zIndex: 3,
  },
})

const LoadingCircle = ({ message = '決済完了まで少々お待ちください。' }) => {
  const classes = useStyles()

  return (
    <div className={`${classes.root}`}>
      <CircularProgress color="primary" />
      <p className={classes.message}>{message}</p>
    </div>
  )
}

// molucules
export const LoadingModal = ({
  message = '決済完了まで少々お待ちください。',
}: {
  message?: string
}): JSX.Element => {
  return (
    <Modal
      open={true}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 200,
      }}
    >
      <Fade in={true} timeout={200}>
        <div>
          <LoadingCircle message={message} />
        </div>
      </Fade>
    </Modal>
  )
}
