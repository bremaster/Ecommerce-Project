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
import { makeStyles, createStyles } from '@mui/styles'

import { webAuth } from 'utilities/webAuth'
import { Auth0Error } from 'auth0-js'

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
      width: 730,
      height: 521,
      backgroundColor: '#FFF',
      borderRadius: '10px',
      [theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
        width: 327,
        height: 308,
      },
    },
    titleWrap: {
      marginTop: '70px',
      [theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
        marginTop: '36px',
      },
    },
    title: {
      fontSize: '48px',
      fontWeight: 700,
      fontFamily: 'Noto Sans JP',
      color: 'rgba(254, 139, 123, 1)',
      textAlign: 'center',
      lineHeight: '72px',
      [theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
        fontSize: '28px',
        lineHeight: '42px',
        letterSpacing: '0.03em',
        textAlign: 'center',
      },
    },
    descriptionWrap: {
      marginTop: '56px',
      [theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
        marginTop: '24px',
      },
    },
    description: {
      width: 577,
      fontFamily: 'Noto Sans JP',
      fontSize: '22px',
      fontWeight: 400,
      lineHeight: '33px',
      letterSpacing: '0.02em',
      textAlign: 'center',
      [theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
        display: 'none',
      },
    },
    descriptionMobile: {
      width: 277,
      fontSize: '13px',
      fontFamily: 'Noto Sans JP',
      lineHeight: '20px',
      letterSpacing: '0.03em',
      textAlign: 'left',
      display: 'none',
      [theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
        display: 'block',
      },
    },
    inputWrap: {
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
      [theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
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
    },
    buttonWrap: {
      position: 'absolute',
      width: '100%',
      bottom: '30px',
      [theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
        bottom: '36px',
      },
    },
    buttonStyle: {
      backgroundOrigin: 'border-box',
      backgroundClip: 'border-box, text',
      boxShadow: '2px 1000px 2px #fff inset',
      color: 'rgba(254, 139, 123, 1)',
      fontSize: '22px',
      fontFamily: 'Noto Sans JP',
      padding: 0,
      height: '33px',
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
  sender: {
    email: string
  }
  requestCode: () => void
  onError: () => void
}

export const AuthModal: React.FC<Props> = ({
  open,
  setOpen,
  sender,
  requestCode,
  onError,
}: Props) => {
  const classes = useStyles()
  const [code, setCode] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 6) {
      return
    }
    setCode(e.target.value)
    if (e.target.value.length === 6) {
      onVerify(Number(e.target.value))
      return
    }
  }

  const onVerify = async (code: number) => {
    webAuth.passwordlessLogin(
      {
        connection: 'email',
        email: sender.email,
        verificationCode: code.toString(),
      },
      (err: null | Auth0Error) => {
        if (err) {
          onError()
        }
      }
    )
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
        <Stack alignItems="center" className={classes.titleWrap}>
          <Typography className={classes.title}>認証コードを入力</Typography>
        </Stack>
        <Stack alignItems="center" className={classes.descriptionWrap}>
          <Typography color="#000" className={classes.description}>
            {sender.email}に認証を送信しました。
            <br />
            メッセージに記載された6桁の数字を入力してください。
          </Typography>
          <Typography color="#000" className={classes.descriptionMobile}>
            {sender.email}に認証を送信しました。
            メッセージに記載された6桁の数字を入力してください。
          </Typography>
        </Stack>
        <Stack alignItems="center" className={classes.inputWrap}>
          <FormControl>
            <OutlinedInput
              id="outlined-adornment-weight"
              value={code}
              onChange={handleChange}
              placeholder="000000"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
            />
          </FormControl>
        </Stack>
        <Stack alignItems="center" className={classes.buttonWrap}>
          <Button className={classes.buttonStyle} onClick={requestCode}>
            確認コードを再送する
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}
