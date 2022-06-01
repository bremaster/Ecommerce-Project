import React, { useRef, useState } from 'react'

import { Box, Stack, Typography, Modal, Fade } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'

const BREAK_POINT_LARGE = 1300
const BREAK_POINT_SMALL = 700

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      backgroundColor: '#fff5f3',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 255,
      height: 255,
      padding: '14px',
      backgroundColor: '#FFF',
      borderRadius: '10px',
      [theme.breakpoints.down(BREAK_POINT_SMALL)]: {
        top: '58%',
        width: 150,
        height: 150,
        padding: '7px',
        borderRadius: '5px',
      },
    },
    borderWrap: {
      width: '100%',
      height: '100%',
      border: '0.5px solid #CFCAC4',
      boxSizing: 'border-box',
    },
    laptopVideoWrapper: {
      width: '100%',
      [theme.breakpoints.down(BREAK_POINT_LARGE)]: {
        display: 'none',
      },
    },
    mobileVideoWrapper: {
      width: '100%',
      display: 'none',
      [theme.breakpoints.down(BREAK_POINT_LARGE)]: {
        display: 'flex',
      },
      '& img': {
        width: '100%',
        position: 'absolute',
        transitionDuration: '2s',
      },
    },
    text1: {
      marginTop: '15px',
      fontSize: '16px',
      lineHeight: '16px',
      marginBottom: '31px',
      background:
        'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      [theme.breakpoints.down(BREAK_POINT_SMALL)]: {
        fontSize: '12px',
        marginTop: '10px',
        marginBottom: '10px',
      },
    },
    text2: {
      fontSize: '24px',
      lineHeight: '24px',
      fontWeight: 700,
      marginTop: '13px',
      color: 'rgba(74, 74, 74, 1)',
      marginBottom: '15px',
      [theme.breakpoints.down(BREAK_POINT_SMALL)]: {
        fontSize: '12px',
        marginTop: 0,
        marginBottom: '8px',
      },
    },
    text3: {
      marginTop: '38px',
      fontSize: '14px',
      lineHeight: '14px',
      background:
        'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      [theme.breakpoints.down(BREAK_POINT_SMALL)]: {
        marginTop: '10px',
      },
    },
    text4: {
      fontSize: '18px',
      lineHeight: '18px',
      fontWeight: 700,
      marginTop: '8px',
      color: 'rgba(74, 74, 74, 1)',
      [theme.breakpoints.down(BREAK_POINT_SMALL)]: {
        fontSize: '10px',
      },
    },
    line: {
      width: '53px',
      borderTop: '1px solid #CFCAC4',
    },
  })
)

type Props = {
  setScreenNumber: (arg0: number) => void
  sendRecieverInfo: string
  senderSenderInfo: string
}

export const VideoAnimation: React.FC<Props> = ({
  setScreenNumber,
  senderSenderInfo,
  sendRecieverInfo,
}) => {
  const classes = useStyles()

  const vidlaptopRef = useRef<HTMLVideoElement>(document.createElement('video'))
  const vidmobileRef = useRef<HTMLVideoElement>(document.createElement('video'))
  const videoMobilePreviewRef = useRef<HTMLImageElement>(document.createElement('img'))

  const [open, setOpen] = useState(true)
  const [videoClass, setVideoClass] = useState(classes.modal)

  const startAnimation = () => {
    setVideoClass(videoClass + ' video-animation')

    vidlaptopRef.current.play()
    vidmobileRef.current.play()
    videoMobilePreviewRef.current.style.opacity = '0'

    closeModal()

    setTimeout(() => setScreenNumber(2), 3000)
  }

  const closeModal = () => setOpen(false)

  return (
    <div className={classes.wrapper} onClick={startAnimation}>
      <Stack className={classes.laptopVideoWrapper} alignItems="center">
        <video ref={vidlaptopRef} width="100%" playsInline preload="metadata">
          <source
            src="https://res.cloudinary.com/zeft/video/upload/v1650023601/zeft_reciever/opening_gift_laptop_cotmwv.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </Stack>
      <Stack className={classes.mobileVideoWrapper} alignItems="center">
        <video ref={vidmobileRef} width="100%" playsInline preload="metadata">
          <source
            src="https://res.cloudinary.com/zeft/video/upload/v1650023606/zeft_reciever/opening_gift_mobile_rgzb85.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <img
          src="mobile-video.png"
          id="video-mobile-preview"
          ref={videoMobilePreviewRef}
        />
      </Stack>
      <Modal
        hideBackdrop
        open={open}
        onClose={closeModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Fade in={open} timeout={2000}>
          <Box className={videoClass}>
            <Stack alignItems="center" className={classes.borderWrap}>
              <Typography color="#000" className={classes.text1}>
                あなたへの贈り物
              </Typography>
              <Box className={classes.line} />
              <Typography color="#000" className={classes.text2}>
                {sendRecieverInfo} 様
              </Typography>
              <Box className={classes.line} />
              <Typography color="#000" className={classes.text3}>
                差出人
              </Typography>
              <Typography color="#000" className={classes.text4}>
                {senderSenderInfo}
              </Typography>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
