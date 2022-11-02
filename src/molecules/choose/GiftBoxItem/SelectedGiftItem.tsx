import React from 'react'

import { Box, Stack, Typography, Button } from '@mui/material'
import { styled } from '@mui/system'

const CatalogueItemWrap = styled(Stack)((props) => ({
  background: '#FFFFFF',
  border: '1px solid #E2E2E2',
  borderRadius: 10,
  height: 150,
  padding: '15px',
  gap: 26,
  width: '100%',
  cursor: 'pointer',
  [props.theme.breakpoints.down('sm')]: {
    padding: '10px',
    height: '100px',
    gap: 10,
  },
}))

const BrandText = styled(Typography)((props) => ({
  cursor: 'pointer',
  fontSize: '16px',
  color: 'rgba(207, 202, 196, 1)',
  fontWeight: 700,
  letterSpacing: '0.03em',
  marginTop: 19,
  lineHeight: 1.25,
  display: '-webkit-box', // for long text
  WebkitLineClamp: '1', // for long text
  WebkitBoxOrient: 'vertical', // for long text
  overflow: 'hidden',
  [props.theme.breakpoints.down('sm')]: {
    fontSize: '11px',
    lineHeight: 1,
    marginTop: 0,
  },
}))

const TitleText = styled(Typography)((props) => ({
  cursor: 'pointer',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: 1.25,
  letterSpacing: '0.03em',
  marginTop: 4,
  display: '-webkit-box', // for long text
  WebkitLineClamp: '2', // for long text
  WebkitBoxOrient: 'vertical', // for long text
  overflow: 'hidden',
  color: '#000',
  [props.theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: 1.5,
  },
}))

const CancelButton = styled(Button)((props) => ({
  position: 'absolute',
  bottom: 12,
  right: 32,
  fontFamily: 'Noto Sans JP',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: '0.03em',
  color: '#898989',
  backgroundColor: '#F0F0F0',
  padding: '5px',
  minWidth: '50px',
  borderRadius: '30px',
  [props.theme.breakpoints.down('sm')]: {
    right: 16,
    fontSize: '11px',
    minWidth: '36px',
  },
}))

type Props = {
  img?: string
  title?: string
  brand?: string
  onClickCancelButton?: () => void
  onClickWrapperBox?: () => void
}

export const SelectedGiftItem: React.FC<Props> = ({
  img,
  title,
  brand,
  onClickCancelButton = () => undefined,
  onClickWrapperBox = () => undefined,
}) => {
  return (
    <Box position="relative" onClick={onClickWrapperBox}>
      <CatalogueItemWrap direction="row">
        <img
          style={{
            height: '100%',
            borderRadius: '10px',
            WebkitTransition: 'all .3s ease-in-out',
          }}
          src={img}
          alt={brand}
          loading="lazy"
        />
        <Stack justifyContent="start">
          <BrandText>{brand}</BrandText>
          <TitleText>{title}</TitleText>
        </Stack>
      </CatalogueItemWrap>
      <CancelButton
        onClick={(e) => {
          e.stopPropagation()
          onClickCancelButton()
        }}
      >
        削除
      </CancelButton>
    </Box>
  )
}
