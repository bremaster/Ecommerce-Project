import React from 'react'

import { Box, Typography } from '@mui/material'
import { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/system'

import { useAspectRatio } from 'utilities/CommonHooks'

const Wrapper = styled(Box, { shouldForwardProp: (prop) => prop !== 'isBorderColored' })(
  (props: BoxProps & { isBorderColored: boolean }) => ({
    borderRadius: '10px',
    // Avoid using `border` styling. Border affects box size.
    boxShadow: props.isBorderColored ? '0 0 0 2px #FE8B7B' : '0 0 0 1px #E5E5E5',
  })
)

const ImageStyled = styled('img')({
  backgroundColor: '#E5E5E5',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  width: '100%',
  objectFit: 'cover',
})

const TypographyStyled = styled(Typography)({
  color: '#4A4A4A',
  fontFamily: 'Noto Sans JP',
  fontSize: '12px',
  fontWeight: 400,
  padding: '10px',
  lineHeight: 'normal',
  letterSpacing: '0.03rem',
})

const Divider = styled('div')({
  height: '1px',
  width: '100%',
  borderTop: '1px solid #E5E5E5',
})

type Props = {
  image: string
  text: string
  width?: string
  isActive?: boolean
  onClick?: () => void
}

export const VariationCard = ({
  image,
  text,
  width = '100%',
  isActive = false,
  onClick,
}: Props) => {
  const squareRatioRef = useAspectRatio<HTMLImageElement>(1.0)

  return (
    <Wrapper width={width} isBorderColored={isActive} onClick={onClick}>
      <ImageStyled src={image} alt={text} ref={squareRatioRef} />
      <Divider />
      <Box minHeight="56px">
        <TypographyStyled>{text}</TypographyStyled>
      </Box>
    </Wrapper>
  )
}
