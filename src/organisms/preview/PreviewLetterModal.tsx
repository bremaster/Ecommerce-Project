import React from 'react'

import { Box, Stack, useMediaQuery } from '@mui/material'
import {
  Wrapper,
  StyledModal,
  ModalBodyWrap,
  ModalBody,
  Texttag,
  TextWrap,
  Line,
  Text,
  StyledButton,
  LetterButton,
} from '../receiver/LetterModal'

const BREAK_POINT_LARGE = 650

type Props = {
  goToNext: () => void
  giftMessage: string
  senderSenderInfo: string
}

export const PreviewLetterModal: React.FC<Props> = ({
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
