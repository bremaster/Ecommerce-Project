import React, { useEffect } from 'react'

import { Box, Stack, Typography, Button } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'

import lottie from 'lottie-web'

import laptopAnmation from 'assets/laptop-animation.json'

const BREAK_POINT_LARGE = 1300

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      backgroundColor: '#fff5f3',
      width: '100vw',
      height: '100vh',
    },
    videoWrapper: {
      height: '100%',
      '& video': {
        height: '100%',
      },
    },
    modal: {
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: 601,
      minWidth: 350,
      width: '100%',
      [theme.breakpoints.down(BREAK_POINT_LARGE)]: {
        width: '90%',
        top: '35%',
      },
    },
    modalbody: {
      position: 'relative',
      maxHeight: '350px',
      overflow: 'hidden',
      borderRadius: '10px',
    },
    borderWrap: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
    },
    text: {
      fontSize: '17px',
      lineHeight: '47px',
      fontWeight: '700',
      color: 'rgba(74, 74, 74, 1)',
      textAlign: 'left',
      width: '100%',
      textDecoration: 'underline',
      textDecorationColor: '#FFECDD',
      textUnderlineOffset: '15px',
      textDecorationThickness: '2px',
      borderBottom: '2px solid #FFECDD',
      [theme.breakpoints.down(BREAK_POINT_LARGE)]: {
        textUnderlineOffset: '11px',
        fontSize: '12px',
        lineHeight: '35px',
      },
    },
    texttag: {
      fontSize: '14px',
      lineHeight: '14px',
      color: 'rgba(74, 74, 74, 1)',
      marginTop: '12px',
      textAlign: 'right',
      width: '100%',
    },
    line: {
      backgroundColor: '#FFF',
      border: `1px solid transparent`,
      background:
        'linear-gradient(102.49deg, #FFF3E9 -18.78%, #FFECDD -12.51%, #FFEAE7 56.55%, #EBE6FF 166.15%)',
      backgroundOrigin: 'border-box',
      width: '100%',
    },
    buttonStyle: {
      background:
        'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
      borderRaius: '10px',
      maxWidth: '406px',
      height: '55px',
      fontWeight: 700,
      fontSize: '15px',
      lineHeight: '30px',
      color: 'white',
      marginTop: '56px',
      width: '80%',
    },
    textWrap: {
      maxWidth: '450px',
      width: '90%',
    },
  })
)

type Props = {
  goToNext: () => void
  giftMessage: string
  senderSenderInfo: string
}

export const LetterModal: React.FC<Props> = ({
  senderSenderInfo,
  giftMessage,
  goToNext,
}) => {
  const classes = useStyles()

  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById('laptop-animation') as HTMLElement,
      animationData: laptopAnmation,
    })
  }, [])

  return (
    <div className={classes.wrapper}>
      <Box className={classes.modal + ' letter__animation'}>
        <Box className={classes.modalbody}>
          <Box id="laptop-animation"></Box>
          <Stack
            className={classes.borderWrap + ' letter__body'}
            alignItems="center"
            justifyContent="center"
          >
            <Stack className={classes.textWrap}>
              <Box className={classes.line} />
              <Typography className={classes.text}>{giftMessage}</Typography>
              <Typography className={classes.texttag}>{senderSenderInfo}より</Typography>
            </Stack>
          </Stack>
        </Box>
        <div className="letter__button">
          <Stack alignItems="center">
            <Button className={classes.buttonStyle} onClick={goToNext}>
              ギフトを開く
            </Button>
          </Stack>
        </div>
      </Box>
    </div>
  )
}
