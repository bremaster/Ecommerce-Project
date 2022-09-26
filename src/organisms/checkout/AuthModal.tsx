import React, { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  Modal,
  Button,
  OutlinedInput,
  FormControl,
} from '@mui/material'

import { styled } from '@mui/system'

import { webAuth } from 'utilities/webAuth'
import { Auth0Error } from 'auth0-js'

import { CancelButton } from 'atoms'

const LAYOUT_BREAK_POINT = 800

const StyledModal = styled(Box)((props) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 730,
  height: 521,
  backgroundColor: '#FFF',
  borderRadius: '10px',
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    width: 327,
    height: 308,
  },
}))

const TitleWrap = styled(Stack)((props) => ({
  marginTop: '70px',
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    marginTop: '36px',
  },
}))

const Title = styled(Typography)((props) => ({
  fontSize: '48px',
  fontWeight: 700,
  fontFamily: 'Noto Sans JP',
  color: 'rgba(254, 139, 123, 1)',
  textAlign: 'center',
  lineHeight: '72px',
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    fontSize: '28px',
    lineHeight: '42px',
    letterSpacing: '0.03em',
    textAlign: 'center',
  },
}))

const DescriptionWrap = styled(Stack)((props) => ({
  marginTop: '56px',
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    marginTop: '24px',
  },
}))

const Description = styled(Stack)((props) => ({
  width: 577,
  fontFamily: 'Noto Sans JP',
  fontSize: '22px',
  fontWeight: 400,
  lineHeight: '33px',
  letterSpacing: '0.02em',
  textAlign: 'center',
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    display: 'none',
  },
}))

const DescriptionMobile = styled(Typography)((props) => ({
  width: 277,
  fontSize: '13px',
  fontFamily: 'Noto Sans JP',
  lineHeight: '20px',
  letterSpacing: '0.03em',
  textAlign: 'left',
  display: 'none',
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    display: 'block',
  },
}))

const InputWrap = styled(Stack)((props) => ({
  marginTop: '56px',
  '& .MuiFormControl-root': {
    width: '590px',
  },
  '& .MuiOutlinedInput-input': {
    padding: '20px 194px',
    height: '60px',
    fontFamily: 'Outfit',
    fontWeight: 600,
    backgroundColor: '#F7F7F7',
    fontSize: '48px',
    borderRadius: '10px',
    '&::placeholder': {
      color: 'rgba(207, 202, 196, 1)',
    },
  },
  '& fieldset': {
    border: 0,
  },
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    marginTop: '24px',
    '& .MuiOutlinedInput-input': {
      padding: '10px 88px',
      height: '30px',
      fontSize: '24px',
    },
    '& .MuiFormControl-root': {
      width: '278px',
    },
  },
  '& input': {
    textAlign: 'center',
  },
}))

const ButtonWrap = styled(Stack)((props) => ({
  position: 'absolute',
  width: '100%',
  bottom: '30px',
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    bottom: '36px',
  },
}))

const ButtonStyle = styled(Button)((props) => ({
  backgroundOrigin: 'border-box',
  backgroundClip: 'border-box, text',
  boxShadow: '2px 1000px 2px #fff inset',
  color: 'rgba(254, 139, 123, 1)',
  fontSize: '22px',
  fontFamily: 'Noto Sans JP',
  padding: 0,
  height: '33px',
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
  sender: {
    email: string
  }
  requestCode: () => void
  onError: () => void
  resend: boolean
  setResend: (resend: boolean) => void
}

export const AuthModal: React.FC<Props> = ({
  open,
  setOpen,
  sender,
  requestCode,
  onError,
  resend,
  setResend,
}: Props) => {
  const [code, setCode] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 6) {
      return
    }
    setCode(e.target.value)
    if (e.target.value.length === 6) {
      onVerify(e.target.value)
      return
    }
  }

  const onVerify = async (code: string) => {
    webAuth.passwordlessLogin(
      {
        connection: 'email',
        email: sender.email,
        verificationCode: code,
      },
      (err: null | Auth0Error) => {
        if (err) {
          onError()
        }
      }
    )
  }

  const close = () => {
    setOpen(false)
    setResend(false)
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
        <CancelButton onClick={close} />
        <TitleWrap>
          <Title>認証コードを入力</Title>
        </TitleWrap>
        <DescriptionWrap alignItems="center">
          <Description color="#000">
            {sender.email}に認証を送信しました。
            <br />
            メッセージに記載された6桁の数字を入力してください。
          </Description>
          <DescriptionMobile color="#000">
            {sender.email}に認証を送信しました。
            メッセージに記載された6桁の数字を入力してください。
          </DescriptionMobile>
        </DescriptionWrap>
        <InputWrap alignItems="center">
          <FormControl>
            <OutlinedInput
              value={code}
              onChange={handleChange}
              placeholder="000000"
              inputProps={{
                inputMode: 'decimal',
                pattern: '[0-9]*',
                type: 'tel',
              }}
            />
          </FormControl>
        </InputWrap>
        <ButtonWrap alignItems="center">
          <ButtonStyle
            onClick={() => {
              requestCode()
              setResend(true)
            }}
          >
            {resend ? '再送しました' : '認証コードを再送する'}
          </ButtonStyle>
        </ButtonWrap>
      </StyledModal>
    </Modal>
  )
}
