import React from 'react'
import { Modal, Backdrop, Fade, CircularProgress } from '@mui/material'

//import { COLOR } from 'theme';

const LoadingCircle = ({ message = '決済完了まで少々お待ちください。' }) => {
  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        padding: '2rem',
      }}
    >
      <CircularProgress color="primary" />
      <p
        style={{
          marginTop: '0.5rem',
          color: 'white',
          zIndex: 3,
        }}
      >
        {message}
      </p>
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
