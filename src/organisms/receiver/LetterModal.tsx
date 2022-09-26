import React from 'react'

import { Box, Stack, Typography, Button, useMediaQuery } from '@mui/material'

import { styled } from '@mui/system'

const BREAK_POINT_LARGE = 650

export const Wrapper = styled(Box)({
  backgroundColor: '#fff5f3',
  minHeight: '100vh',
  paddingTop: '6vh',
  paddingBottom: '6%',
})

export const StyledModal = styled(Box)((props) => ({
  position: 'relative',
  left: '50%',
  transform: 'translate(-50%, 0)',
  maxWidth: 601,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  [props.theme.breakpoints.down(BREAK_POINT_LARGE)]: {
    width: 350,
    minWidth: 250,
  },
}))

export const ModalBodyWrap = styled(Box)((props) => ({
  minHeight: '350px',
  display: 'flex',
  backgroundImage: 'url(animation/letter_image/letter-bg.png)',
  backgroundColor: 'white',
  backgroundSize: '100% 100%',
  padding: '50px 0',
  backgroundPosition: 'inherit',
  borderRadius: '10px',
  justifyContent: 'center',
  width: '100%',
  position: 'relative',
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  [props.theme.breakpoints.down(BREAK_POINT_LARGE)]: {
    minHeight: '203px',
    padding: '30px 0',
  },
}))

export const ModalBody = styled(Box)((props) => ({
  minWidth: '566px',
  [props.theme.breakpoints.down(BREAK_POINT_LARGE)]: {
    minWidth: '350px',
  },
}))

export const Texttag = styled(Typography)({
  fontSize: '14px',
  lineHeight: '14px',
  color: 'rgba(74, 74, 74, 1)',
  marginTop: '12px',
  textAlign: 'right',
  width: '100%',
})

export const TextWrap = styled(Stack)({
  maxWidth: '450px',
  width: '80%',
})

export const Line = styled(Box)({
  backgroundColor: '#FFF',
  borderTop: `1px solid #FFEAE7`,
  width: '100%',
})

export const Text = styled(Typography)((props) => ({
  fontSize: '17px',
  lineHeight: '42.5px',
  fontWeight: '700',
  color: 'rgba(74, 74, 74, 1)',
  textAlign: 'left',
  width: '100%',
  borderBottom: '1px solid #FFEAE7',
  paddingBottom: 0,
  zIndex: 10,
  [props.theme.breakpoints.down(BREAK_POINT_LARGE)]: {
    fontSize: '13px',
    lineHeight: '30px',
    textUnderlineOffset: '13.5px',
    paddingBottom: '0.2px',
  },
}))

export const StyledButton = styled(Button)({
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
})

export const LetterButton = styled(Box)({
  width: '100%',
  '& div': {
    width: '100%',
  },
})

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
  const lineBreakList = giftMessage.split('\n')
  const messageList = []

  const isMdSize = useMediaQuery(`(max-width: ${BREAK_POINT_LARGE}px)`, { noSsr: true })

  let lineLength = giftMessage.match(/[\u3000-\u9FBF]/) ? 25 : 46

  if (isMdSize) {
    lineLength = giftMessage.match(/[\u3000-\u9FBF]/) ? 20 : 37
  }

  for (let i = 0; i < lineBreakList.length; i++) {
    for (let j = 0; j < lineBreakList[i].length; j = j + lineLength) {
      messageList.push(lineBreakList[i].slice(j, j + lineLength))
    }
  }

  return (
    <Wrapper className="letter_top__animation">
      <StyledModal className="letter__animation">
        <ModalBodyWrap>
          <ModalBody>
            <Stack
              className="letter__body"
              sx={{ width: '100%', height: '100%' }}
              alignItems="center"
              justifyContent="center"
            >
              <TextWrap className="text__animation">
                <Line />
                <Box sx={{ zIndex: 10 }}>
                  {messageList.map((item, index) => (
                    <Text className="text__font" key={index}>
                      {item}
                    </Text>
                  ))}
                </Box>
                <Texttag>{senderSenderInfo}より</Texttag>
              </TextWrap>
            </Stack>
          </ModalBody>
          <Box
            component="img"
            src="/animation/letter_image/left-upper.svg"
            sx={{
              width: '15%',
              position: 'absolute',
              top: 0,
              left: '4%',
            }}
          />
          <Box
            component="img"
            src="/animation/letter_image/left-below.svg"
            sx={{
              width: '35%',
              position: 'absolute',
              bottom: 0,
              left: 0,
            }}
          />
          <Box
            component="img"
            src="/animation/letter_image/right-upper.svg"
            sx={{
              width: '22%',
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          />
          <Box
            component="img"
            src="/animation/letter_image/right-below.svg"
            sx={{
              width: '15%',
              position: 'absolute',
              bottom: '4%',
              right: 0,
            }}
          />
        </ModalBodyWrap>
        <LetterButton className="letter__button">
          <Stack alignItems="center">
            <StyledButton onClick={goToNext}>ギフトを開く</StyledButton>
          </Stack>
        </LetterButton>
      </StyledModal>
    </Wrapper>
  )
}
