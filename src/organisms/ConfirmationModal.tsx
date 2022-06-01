import React, { FC } from 'react'
import { Modal, Fade, Container } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { COLOR } from 'theme'

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      backgroundColor: COLOR.backgroundWhite,
      borderRadius: '4px',
      width: '100%',
    },
    modalWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    blackground: {
      display: 'flex',
      alignItems: 'center',
    },
  })
)

export type Props = {
  children: React.ReactElement
  isOpen: boolean
  onClose: () => void
}

export const ConfirmationModal: FC<Props> = ({ children, isOpen, onClose }) => {
  const classes = useStyles()

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      onBackdropClick={onClose}
      className={classes.blackground}
    >
      <Container maxWidth="sm" className={classes.modalWrapper}>
        <Fade in={isOpen} timeout={{ enter: 500 }}>
          <div className={classes.modal}>{children}</div>
        </Fade>
      </Container>
    </Modal>
  )
}
