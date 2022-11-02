import React from 'react'
import { Card, useMediaQuery } from '@mui/material'

import { ProductWithHandlerAndStatus } from 'constants/index'

import { styled } from '@mui/system'

import { ItemCardLaptop, ItemCardMobile } from 'molecules'

const Root = styled(Card)({
  boxShadow: '0 0 0 0',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  '& button': {
    paddingBottom: 0,
  },
  '& .MuiTouchRipple-root': {
    display: 'none',
  },
  '& div': {
    '&:focusVisible': {
      display: 'none',
    },
  },
  '& .MuiCardActionArea-focusHighlight': {
    backgroundColor: 'white',
  },
  '&:hover': {
    '& .MuiCardActionArea-focusHighlight': {
      opacity: 0.5,
      backgroundColor: 'white',
    },
  },
})

type ItemCardProps = {
  item: ProductWithHandlerAndStatus & { onTap: () => void }
}

const YEN_MARK = '\xA5'

export const ItemCard = (props: ItemCardProps): JSX.Element => {
  const { item } = props

  const isMdSize = useMediaQuery('(min-width: 900px)')

  const outOfStock = item.stockOk === false
  const priceText = !!item.productPrice
    ? `${YEN_MARK}${item.productPrice.toLocaleString('en-US')}`
    : 'price not set'

  const imageList = item.productImageCloudinary.map((data) => data.secure_url)
  const tags = item.tagsCollection.items.map((data) => data.name)

  return (
    <Root onClick={item.onTap}>
      {isMdSize ? (
        <ItemCardLaptop
          img={imageList[0]}
          keyMessage={item.keyMessage}
          selectableStatus={item.selectableStatus}
          priceText={priceText}
          outOfStock={outOfStock}
        />
      ) : (
        <ItemCardMobile
          images={imageList}
          keyMessage={item.title}
          tags={tags}
          priceText={priceText}
          outOfStock={outOfStock}
        />
      )}
    </Root>
  )
}
