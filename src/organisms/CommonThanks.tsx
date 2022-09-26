import React from 'react'

import { Typography, Stack, Box, Button } from '@mui/material'

import { styled } from '@mui/system'

const Wrap = styled(Stack)({
  maxWidth: 560,
  margin: '0 auto',
})

const BackCircle = styled(Box)((props) => ({
  placeItems: 'center',
  marginTop: 100,
  width: 225,
  '& img': {
    width: '100%',
  },
  [props.theme.breakpoints.down('md')]: {
    width: 240,
    marginTop: 80,
  },
}))

const Message = styled(Typography)((props) => ({
  color: '#4A4A4A',
  fontFamily: 'Noto Sans JP',
  fontSize: '32px',
  fontWeight: 700,
  letterSpacing: '0.03rem',
  lineHeight: '48px',
  marginTop: 40,
  textAlign: 'center',
  [props.theme.breakpoints.down('md')]: {
    marginTop: 36,
    fontSize: '24px',
    lineHeight: '36px',
    textAlign: 'center',
    width: 258,
  },
}))

const SubMessage = styled(Typography)((props) => ({
  fontFamily: 'Outfit',
  fontWeight: 600,
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: 14,
  marginTop: 18,
  [props.theme.breakpoints.down('md')]: {
    marginTop: 26,
  },
}))

const ButtonWrap = styled(Stack)((props) => ({
  marginTop: 52,
  [props.theme.breakpoints.down('md')]: {
    marginTop: 46,
  },
}))

const StyledButton = styled(Button)({
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  borderRadius: '10px',
  color: 'white',
  fontFamily: 'Noto Sans JP',
  textAlign: 'center',
  width: '100%',
  maxWidth: 406,
  minWidth: 327,
  height: 55,
  fontWeight: 700,
  '&:hover': {
    color: 'white',
  },
})

type Props = {
  message: string
  subMessage: string
}

export const CommonThanks = (props: Props) => {
  return (
    <Wrap alignItems="center">
      {/* Top Icon */}
      <BackCircle>
        <Box src="/assets/gift-box.png" component="img" />
      </BackCircle>
      {/* Messages */}
      <Message>{props.message}</Message>

      <SubMessage>{props.subMessage}</SubMessage>

      <ButtonWrap width="100%" justifyContent="center" px={3} direction="row">
        <StyledButton sx={{ fontSize: 15 }} href="/">
          ZEFTについて
        </StyledButton>
      </ButtonWrap>
    </Wrap>
  )
}
