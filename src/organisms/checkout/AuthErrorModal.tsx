import React from 'react'
import { Box, Stack, Typography, Modal, Button } from '@mui/material'

import { styled } from '@mui/system'

const LAYOUT_BREAK_POINT = 800

const StyledModal = styled(Box)((props) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 430,
  height: 240,
  backgroundColor: '#FFF',
  borderRadius: '20px',
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    width: 300,
    height: 240,
  },
}))

const Description1 = styled(Typography)({
  width: 577,
  fontFamily: 'Noto Sans JP',
  fontSize: '25px',
  fontWeight: 400,
  lineHeight: '33px',
  letterSpacing: '0.02em',
  textAlign: 'center',
})

const Description2 = styled(Typography)({
  width: 577,
  fontFamily: 'Noto Sans JP',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '33px',
  letterSpacing: '0.02em',
  textAlign: 'center',
})

const ButtonWrap = styled(Stack)({
  width: '100%',
  height: '50px',
  borderTop: '1px solid #ddd',
})

const StyledButton = styled(Button)((props) => ({
  color: 'rgba(254, 139, 123, 1)',
  fontSize: '22px',
  fontFamily: 'Noto Sans JP',
  padding: 0,
  height: '100%',
  width: '100%',
  borderRadius: '20px',
  fontWeight: 700,
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    height: '20px',
    fontSize: '13px',
    display: 'block',
  },
}))

export type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  setVerifyModalOpen: (open: boolean) => void
  setResend: (resend: boolean) => void
}

export const AuthErrorModal: React.FC<Props> = ({
  open,
  setOpen,
  setVerifyModalOpen,
  setResend,
}: Props) => {
  const closeModal = () => {
    setOpen(false)
    setVerifyModalOpen(false)
    setResend(false)
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
      sx={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
    >
      <StyledModal>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: '100%',
            height: '140px',
          }}
        >
          <Description1 color="#000">ZEFT</Description1>
          <Description2>パスコードが正しくありません</Description2>
        </Stack>
        <ButtonWrap alignItems="center" justifyContent="center">
          <StyledButton onClick={tryAgain}>再度試す</StyledButton>
        </ButtonWrap>
        <ButtonWrap alignItems="center" justifyContent="center">
          <StyledButton onClick={closeModal}>閉じる</StyledButton>
        </ButtonWrap>
      </StyledModal>
    </Modal>
  )
}
