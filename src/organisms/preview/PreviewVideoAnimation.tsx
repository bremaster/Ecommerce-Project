import React, { useRef, useState } from 'react'

import { Box, Modal, Fade } from '@mui/material'
import { keyframes } from '@mui/system'

import {
  Wrapper,
  StyledModal,
  BorderWrap,
  LaptopVideoWrapper,
  MobileVideoWrapper,
  Text1,
  Text2,
  Text3,
  Text4,
} from '../receiver/VideoAnimation'

const fadeInAnimation = keyframes`
	from {
		opacity: 0
	}
	to {
		opacity: 100
	}
`

type Props = {
  setScreenNumber: (arg0: number) => void
  sendRecieverInfo: string
  senderSenderInfo: string
}

export const PreviewVideoAnimation: React.FC<Props> = ({
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
        <video ref={vidlaptopRef} width="100%" playsInline preload="metadata">
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
