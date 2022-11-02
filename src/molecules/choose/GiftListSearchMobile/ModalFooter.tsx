import React from 'react'

import { Stack, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { styled } from '@mui/system'

const ModalFooterWrap = styled(Stack)({
  backgroundColor: 'white',
  height: 70,
  width: '100%',
  padding: '0 20px',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const LeftButton = styled(Button)({
  fontFamily: 'Noto Sans JP',
  fontSize: 16,
  fontWeight: 700,
  textAlign: 'center',
  textDecoration: 'underline',
  color: 'black',
})

const RightButton = styled(Button)({
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  borderRadius: '10px',
  color: 'white',
  fontFamily: 'Noto Sans JP',
  textAlign: 'center',
  fontWeight: 700,
  width: 107,
  height: 48,
  fontSize: 16,
})

export const ModalFooter = ({
  leftFunction,
  rightFunction,
}: {
  leftFunction: () => void
  rightFunction: () => void
}) => {
  return (
    <ModalFooterWrap>
      <LeftButton onClick={leftFunction}>すべてクリア</LeftButton>
      <RightButton onClick={rightFunction} startIcon={<SearchIcon />}>
        探す
      </RightButton>
    </ModalFooterWrap>
  )
}
