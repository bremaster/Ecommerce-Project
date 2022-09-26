import React, { useRef, useState } from 'react'

import { Box, Stack, Typography, Modal, Fade } from '@mui/material'
import { keyframes } from '@mui/system'

import { styled } from '@mui/system'

const fadeInAnimation = keyframes`
	from {
		opacity: 0
	}
	to {
		opacity: 100
	}
`

const BREAK_POINT_LARGE = 1300
const BREAK_POINT_SMALL = 700

export const Wrapper = styled(Box)({
  backgroundColor: '#fff5f3',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

export const StyledModal = styled(Box)((props) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 255,
  height: 255,
  padding: '14px',
  backgroundColor: '#FFF',
  borderRadius: '10px',
  [props.theme.breakpoints.down(BREAK_POINT_SMALL)]: {
    top: '58%',
    width: 150,
    height: 150,
    padding: '7px',
    borderRadius: '5px',
  },
}))

export const BorderWrap = styled(Stack)({
  width: '100%',
  height: '100%',
  border: '0.5px solid #CFCAC4',
  boxSizing: 'border-box',
})

export const LaptopVideoWrapper = styled(Stack)((props) => ({
  width: '100%',
  [props.theme.breakpoints.down(BREAK_POINT_LARGE)]: {
    display: 'none',
  },
}))

export const MobileVideoWrapper = styled(Stack)((props) => ({
  width: '100%',
  display: 'none',
  [props.theme.breakpoints.down(BREAK_POINT_LARGE)]: {
    display: 'flex',
  },
  '& video': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))

export const Text1 = styled(Typography)((props) => ({
  marginTop: '15px',
  fontSize: '16px',
  lineHeight: '16px',
  marginBottom: '31px',
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [props.theme.breakpoints.down(BREAK_POINT_SMALL)]: {
    fontSize: '12px',
    marginTop: '10px',
    marginBottom: '10px',
  },
}))

export const Text2 = styled(Typography)((props) => ({
  fontSize: '24px',
  lineHeight: '24px',
  fontWeight: 700,
  marginTop: '13px',
  color: 'rgba(74, 74, 74, 1)',
  marginBottom: '15px',
  [props.theme.breakpoints.down(BREAK_POINT_SMALL)]: {
    fontSize: '12px',
    marginTop: 0,
    marginBottom: '8px',
  },
}))

export const Text3 = styled(Typography)((props) => ({
  marginTop: '38px',
  fontSize: '14px',
  lineHeight: '14px',
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [props.theme.breakpoints.down(BREAK_POINT_SMALL)]: {
    marginTop: '10px',
  },
}))

export const Text4 = styled(Typography)((props) => ({
  fontSize: '18px',
  lineHeight: '18px',
  fontWeight: 700,
  marginTop: '8px',
  color: 'rgba(74, 74, 74, 1)',
  [props.theme.breakpoints.down(BREAK_POINT_SMALL)]: {
    fontSize: '10px',
  },
}))

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
  const vidlaptopRef = useRef<HTMLVideoElement>(document.createElement('video'))
  const vidmobileRef = useRef<HTMLVideoElement>(document.createElement('video'))

  const [open, setOpen] = useState(true)
  const [videoClass, setVideoClass] = useState('')

  const startAnimation = () => {
    setVideoClass('video-animation')

    vidlaptopRef.current.play()
    vidmobileRef.current.play()

    closeModal()

    setTimeout(() => setScreenNumber(2), 3000)
  }

  const closeModal = () => setOpen(false)

  return (
    <Wrapper onClick={startAnimation}>
      <LaptopVideoWrapper alignItems="center">
        <video
          ref={vidlaptopRef}
          width="100%"
          playsInline
          preload="metadata"
          style={{ WebkitTransform: 'translate3d(0,0,0)' }}
        >
          <source
            src="https://res.cloudinary.com/zeft/video/upload/v1650023601/zeft_reciever/opening_gift_laptop_cotmwv.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </LaptopVideoWrapper>
      <MobileVideoWrapper
        alignItems="center"
        sx={{
          // For some reason, a vertical stretching animation was applied to the image, so we cancel it by this fade in.
          animation: `${fadeInAnimation} 1s ease-in`,
        }}
      >
        <video
          ref={vidmobileRef}
          width="100%"
          playsInline
          preload="metadata"
          // Use poster image unitl video is loaded
          poster="/mobile-video.png"
          style={{ WebkitPerspective: 1000 }}
        >
          <source
            // Starts at 0.01s as annotated by # mark. Poster image is the same as this time point of this movie.
            src="https://res.cloudinary.com/zeft/video/upload/v1650023606/zeft_reciever/opening_gift_mobile_rgzb85.mp4#t=0.01"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </MobileVideoWrapper>
      <Modal
        hideBackdrop
        open={open}
        onClose={closeModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Fade in={open} timeout={3000}>
          <StyledModal className={videoClass}>
            <BorderWrap alignItems="center">
              <Text1 color="#000">あなたへの贈り物</Text1>
              <Box sx={{ width: '53px', borderTop: '1px solid #CFCAC4' }} />
              <Text2 color="#000">{sendRecieverInfo} 様</Text2>
              <Box sx={{ width: '53px', borderTop: '1px solid #CFCAC4' }} />
              <Text3 color="#000">差出人</Text3>
              <Text4 color="#000">{senderSenderInfo}</Text4>
            </BorderWrap>
          </StyledModal>
        </Fade>
      </Modal>
    </Wrapper>
  )
}
