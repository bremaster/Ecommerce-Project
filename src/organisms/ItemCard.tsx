import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import { Card, CardActionArea, CardMedia, Typography, Stack } from '@mui/material'
import { TagList } from 'molecules/TagList'

import { SelectStatus } from 'constants/index'

type DinamicStyleProps = {
  selectableStatus?: SelectStatus
  outOfStock: boolean
}

const useStyles = makeStyles({
  root: {
    /* aspectRatio: '10 / 16', */
    boxShadow: '0 0 0 0',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '& button': {
      paddingBottom: '20px',
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
  },
  brand: {
    color: '#CFCAC4',
    fontFamily: 'Noto Sans JP',
    fontSize: '14px',
    lineHeight: '21px',
    letterSpacing: '0.03em',
  },
  imageWrapperCard: {
    borderRadius: '10px',
    backgroundColor: '#EDF3FC', // for testing,
  },
  checkIcon: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
  },
  iconWrapper: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  pricetitle: {
    fontFamily: 'Noto Sans JP',
    fontSize: '10px',
    lineHeight: '10px',
    letterSpacing: '0.03em',
    textAlign: 'left',
    color: ({ outOfStock }: DinamicStyleProps) =>
      outOfStock === true ? '#B0B0B0' : '#4A4A4A',
  },
  price: {
    fontFamily: 'Outfit',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '12px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: ({ outOfStock }: DinamicStyleProps) =>
      outOfStock === true ? '#B0B0B0' : '#4A4A4A',
  },
})

interface Props {
  /** main photo of the item */
  img: string
  /** price text */
  priceText: string
  /** click handler */
  handleClick: () => void
  /** brand name */
  brand?: string
  /** tag objects */
  tags?: { name: string }[]
  /** item selection status */
  selectableStatus?: SelectStatus
  /** out of stock or not */
  outOfStock: boolean
}

const defaultProps: Props = {
  img: '/static/images/cards/contemplative-reptile.jpg',
  priceText: '9999YEN',
  handleClick: () => alert('test'),
  brand: '',
  tags: [],
  selectableStatus: 'SELECTABLE',
  outOfStock: false,
}

export const ItemCard = (props: Props): JSX.Element => {
  const { img, handleClick, brand, tags, selectableStatus, priceText, outOfStock } = props

  const classes = useStyles({ selectableStatus, outOfStock })

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          className={classes.imageWrapperCard}
          component="img"
          alt="Contemplative Reptile"
          image={img}
          title="Contemplative Reptile"
        />
        <div className={classes.iconWrapper}>
          {selectableStatus === 'SELECTED' && <img width="100%" src="/bookmark.svg" />}
        </div>
        {tags && <TagList tags={tags.map((tag) => tag.name)} />}
        <Typography className={classes.brand}>{brand}</Typography>
        <Stack direction="row" alignItems="end" gap="4px" mt="4px">
          <Typography className={classes.pricetitle}>税込</Typography>
          <Typography className={classes.price}>{priceText}</Typography>
        </Stack>
        {outOfStock && <SoldOutText />}
      </CardActionArea>
    </Card>
  )
}

const SoldOutText = () => (
  <Typography
    sx={{
      fontFamily: "'Outfit'",
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '23px',
      color: '#FE8B7B',
    }}
  >
    SOLD OUT!
  </Typography>
)

ItemCard.defaultProps = defaultProps
