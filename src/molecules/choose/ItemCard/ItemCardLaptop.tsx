import React from 'react'
import { Box, CardActionArea, CardMedia, Typography, Stack } from '@mui/material'

import { SelectStatus } from 'constants/index'

import { styled } from '@mui/system'

type DinamicStyleProps = {
  outOfStock: boolean
}

const Brand = styled(Typography)({
  marginTop: 10,
  color: '#4A4A4A',
  fontFamily: 'Noto Sans JP',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: 1.3,
  letterSpacing: '0.03em',
  display: '-webkit-box', // for long text
  WebkitLineClamp: '2', // for long text
  WebkitBoxOrient: 'vertical', // for long text
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const IconWrapper = styled(Box)({
  width: '100%',
  position: 'absolute',
  top: 0,
})

const PriceTitle = styled(Typography, {
  shouldForwardProp: (propName) => propName !== 'outOfStock',
})(({ outOfStock }: DinamicStyleProps) => ({
  fontFamily: 'Noto Sans JP',
  fontSize: '10px',
  lineHeight: 1,
  letterSpacing: '0.03em',
  textAlign: 'left',
  color: outOfStock === true ? '#B0B0B0' : '#4A4A4A',
}))

const Price = styled(Typography, {
  shouldForwardProp: (propName) => propName !== 'outOfStock',
})(({ outOfStock }: DinamicStyleProps) => ({
  fontFamily: 'Noto Sans JP',
  fontSize: '14px',
  lineHeight: 1,
  color: outOfStock === true ? '#B0B0B0' : '#4A4A4A',
}))

interface Props {
  /** main photo of the item */
  img: string
  /** price text */
  priceText: string
  /** brand name */
  keyMessage?: string
  /** item selection status */
  selectableStatus?: SelectStatus
  /** out of stock or not */
  outOfStock: boolean
}

const defaultProps: Props = {
  img: '/static/images/cards/contemplative-reptile.jpg',
  priceText: '9999YEN',
  keyMessage: '新商品のご紹介',
  selectableStatus: 'SELECTABLE',
  outOfStock: false,
}

export const ItemCardLaptop = (props: Props): JSX.Element => {
  const { img, keyMessage, selectableStatus, priceText, outOfStock } = props

  return (
    <CardActionArea>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        image={img}
        title="Contemplative Reptile"
        sx={{
          borderRadius: '10px',
          backgroundColor: '#EDF3FC',
        }}
      />
      <IconWrapper>
        {selectableStatus === 'SELECTED' && <img width="100%" src="/bookmark.svg" />}
      </IconWrapper>
      <Brand>{keyMessage}</Brand>
      <Stack direction="row" alignItems="end" gap={0.5} mt={1.5}>
        <Price outOfStock={outOfStock}>{priceText}</Price>
        <PriceTitle outOfStock={outOfStock}>（税込）</PriceTitle>
      </Stack>
      {outOfStock ? (
        <Typography
          sx={{
            fontFamily: 'Outfit',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '23px',
            color: '#FE8B7B',
          }}
        >
          SOLD OUT!
        </Typography>
      ) : null}
    </CardActionArea>
  )
}

ItemCardLaptop.defaultProps = defaultProps
