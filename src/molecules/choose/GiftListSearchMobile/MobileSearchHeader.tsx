import React from 'react'

import { Typography, Button } from '@mui/material'

import { styled } from '@mui/system'

const MobileSearchHeaderWrap = styled(Button)({
  justifyContent: 'space-between',
  height: 56,
  borderRadius: 10,
  boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.05)',
  backgroundColor: 'white !important',
  padding: 20,
})

const MobileSearchHeaderName = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontSize: 14,
  lineHeight: 1,
  color: '#70757A',
})

const MobileSearchHeaderValue = styled(Typography)((props: { selected: boolean }) => ({
  fontFamily: 'Noto Sans JP',
  fontSize: 14,
  fontWeight: props.selected ? 700 : 400,
  lineHeight: 1,
  color: '#4A4A4A',
  width: 180,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'right',
}))

export const MobileSearchHeader = ({
  setMobileStep,
  title,
  subTitle,
  selected,
}: {
  setMobileStep: () => void
  title: string
  subTitle: string
  selected: boolean
}) => {
  return (
    <MobileSearchHeaderWrap onClick={setMobileStep}>
      <MobileSearchHeaderName>{title}</MobileSearchHeaderName>
      <MobileSearchHeaderValue selected={selected}>{subTitle}</MobileSearchHeaderValue>
    </MobileSearchHeaderWrap>
  )
}
