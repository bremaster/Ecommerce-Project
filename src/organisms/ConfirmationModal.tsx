import React, { FC } from 'react'
import { Modal, Fade, Container } from '@mui/material'
import { COLOR } from 'theme'

export type Props = {
  children: React.ReactElement
  isOpen: boolean
  onClose: () => void
}

export const ConfirmationModal: FC<Props> = ({ children, isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      onBackdropClick={onClose}
      sx={{
        backgroundColor: COLOR.backgroundWhite,
        borderRadius: '4px',
        width: '100%',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fade in={isOpen} timeout={{ enter: 500 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {children}
          </div>
        </Fade>
      </Container>
    </Modal>
  )
}
