import React from 'react'

import { Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

const CatalogueItemWrap = styled(Stack)((props) => ({
  background: '#FFFFFF',
  boxShadow: '0px 0px 20px rgba(255, 162, 111, 0.1)',
  borderRadius: '10px',
  height: '100%',
  maxHeight: '162px',
  cursor: 'pointer',
  padding: '16px',
  [props.theme.breakpoints.down(700)]: {
    padding: '12px',
    height: '120px',
  },
}))

const Brand = styled(Typography)((props) => ({
  cursor: 'pointer',
  fontSize: '14px',
  color: 'rgba(207, 202, 196, 1)',
  marginTop: '16px',
  lineHeight: '20px',
  fontWeight: 700,
  letterSpacing: '0.03em',
  [props.theme.breakpoints.down(700)]: {
    fontSize: '10px',
    lineHeight: '14px',
  },
}))

const Title = styled(Typography)((props) => ({
  cursor: 'pointer',
  fontSize: '18px',
  color: 'rgba(74, 74, 74, 1)',
  fontWeight: 700,
  lineHeight: '27px',
  letterSpacing: '0.03em',
  [props.theme.breakpoints.down(700)]: {
    lineHeight: '20px',
    fontSize: '12px',
  },
}))

type Props = {
  width: string
  img: string
  title: string
  brand: string
}

export const CatalogueItem: React.FC<Props> = ({ width, img, title, brand }) => {
  return (
    <CatalogueItemWrap width={width} direction="row" gap={2}>
      <img
        src={img}
        alt={brand}
        loading="lazy"
        style={{
          height: '100%',
          borderRadius: '10px',
          WebkitTransition: 'all .3s ease-in-out',
        }}
      />
      <Stack>
        <Brand>{brand}</Brand>
        <Title>{title}</Title>
      </Stack>
    </CatalogueItemWrap>
  )
}
