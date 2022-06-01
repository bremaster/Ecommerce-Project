import React from 'react'
import { Box, Stack, Typography, Modal, Button } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'

const LAYOUT_BREAK_POINT = 800

const useStyles = makeStyles((theme) =>
  createStyles({
    modalWrap: {
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 430,
      height: 240,
      backgroundColor: '#FFF',
      borderRadius: '20px',
      [theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
        width: 300,
        height: 240,
      },
    },
    description1: {
      width: 577,
      fontFamily: 'Noto Sans JP',
      fontSize: '25px',
      fontWeight: 400,
      lineHeight: '33px',
      letterSpacing: '0.02em',
      textAlign: 'center',
    },
    description2: {
      width: 577,
      fontFamily: 'Noto Sans JP',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '33px',
      letterSpacing: '0.02em',
      textAlign: 'center',
    },
    descriptionWrap: {
      width: '100%',
      height: '140px',
    },
    buttonWrap: {
      width: '100%',
      height: '50px',
      borderTop: '1px solid #ddd',
    },
    buttonStyle: {
      color: 'rgba(254, 139, 123, 1)',
      fontSize: '22px',
      fontFamily: 'Noto Sans JP',
      padding: 0,
      height: '100%',
      width: '100%',
      borderRadius: '20px',
      [theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
        height: '20px',
        fontSize: '13px',
        display: 'block',
      },
    },
  })
)

export type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  setVerifyModalOpen: (open: boolean) => void
}

export const AuthErrorModal: React.FC<Props> = ({
  open,
  setOpen,
  setVerifyModalOpen,
}: Props) => {
  const classes = useStyles()

  const closeModal = () => {
    setOpen(false)
    setVerifyModalOpen(false)
  }
  const tryAgain = () => {
    setOpen(false)
  }

  return (
    <Modal
      hideBackdrop
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      className={classes.modalWrap}
    >
      <Box className={classes.modal}>
        <Stack
          alignItems="center"
          justifyContent="center"
          className={classes.descriptionWrap}
        >
          <Typography color="#000" className={classes.description1}>
            ZEFT
          </Typography>
          <Typography color="#000" className={classes.description2}>
            パスコードが正しくありません
          </Typography>
        </Stack>
        <Stack alignItems="center" justifyContent="center" className={classes.buttonWrap}>
          <Button className={classes.buttonStyle} onClick={tryAgain}>
            再度試す
          </Button>
        </Stack>
        <Stack alignItems="center" justifyContent="center" className={classes.buttonWrap}>
          <Button className={classes.buttonStyle} onClick={closeModal}>
            閉じる
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}
