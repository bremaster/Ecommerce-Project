import React from 'react'
import { Box, Stack, CardActionArea, Typography } from '@mui/material'
import ImageGallery from 'react-image-gallery'

import { styled } from '@mui/system'

const KeyMessage = styled(Typography)({
  marginTop: 40,
  color: '#4A4A4A',
  fontFamily: 'Noto Sans JP',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1.3,
  letterSpacing: '0em',
  display: '-webkit-box', // for long text
  WebkitLineClamp: '2', // for long text
  WebkitBoxOrient: 'vertical', // for long text
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const Tag = styled(Typography)({
  color: '#00376B',
  fontFamily: 'Helvetica',
  fontWeight: 400,
  fontSize: 12,
  lineHeight: 1.5,
})

const Image = styled(Box)({
  width: '100%',
  '& .image-gallery-bullets': {
    bottom: -20,
  },
  '& .image-gallery-bullet': {
    boxShadow: 'none !important',
    backgroundColor: '#D8D8D8 !important',
  },
  '& .active': {
    backgroundColor: '#000 !important',
  },
  '& .image-gallery-slides': {
    borderRadius: '7px',
  },
  '& .image-gallery-slide': {
    borderRadius: '7px',
  },
  '& img': {
    borderRadius: '7px',
    padding: '2px',
  },
})

const Price = styled(Typography)((props: { outOfStock: boolean }) => ({
  marginTop: 15,
  fontFamily: 'Helvetica',
  fontSize: '14px',
  lineHeight: 1,
  color: '#4A4A4A',
  textAlign: 'right',
  textDecoration: props.outOfStock ? 'line-through' : 'none',
}))

type ItemCardMobileProps = {
  /** main photo of the item */
  images: string[]
  /** price text */
  priceText: string
  /** tags */
  tags: string[]
  /** keyMessage */
  keyMessage?: string
  /** out of stock or not */
  outOfStock: boolean
}

const defaultProps: ItemCardMobileProps = {
  images: ['/static/images/cards/contemplative-reptile.jpg'],
  priceText: '9999YEN',
  keyMessage: '新商品のご紹介',
  tags: [],
  outOfStock: false,
}

export const ItemCardMobile = (props: ItemCardMobileProps): JSX.Element => {
  const { images, keyMessage, tags, priceText, outOfStock } = props

  const imageLength = images.length > 3
  const showImages = imageLength ? images.splice(0, 3) : images

  return (
    <CardActionArea>
      <Image>
        <ImageGallery
          items={showImages.map((img) => ({
            original: img,
            thumbnail: img,
            thumbnailWidth: 58,
            thumbnailHeight: 58,
          }))}
          showBullets
          infinite={true}
          showThumbnails={false}
          showNav={false}
          showFullscreenButton={false}
          useBrowserFullscreen={false}
          showPlayButton={false}
        />
      </Image>
      <KeyMessage>{keyMessage}</KeyMessage>
      <Stack mt="20px">
        {tags.map((item, index) => (
          <Tag key={index}>#{item}</Tag>
        ))}
      </Stack>
      <Price outOfStock={outOfStock}>{priceText}</Price>
      {outOfStock ? (
        <Typography
          sx={{
            fontFamily: 'Outfit',
            fontSize: 14,
            lineHeight: 1,
            color: '#EB424B',
            textAlign: 'right',
            marginTop: '5px',
          }}
        >
          Sold out
        </Typography>
      ) : null}
    </CardActionArea>
  )
}

ItemCardMobile.defaultProps = defaultProps
