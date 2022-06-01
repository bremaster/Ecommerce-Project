import React from 'react'

import { Card, CardActionArea, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { COLOR } from 'theme'
import { useAspectRatio } from 'utilities/CommonHooks'

interface Props {
  /** photo URL string */
  img: string
  /** name of the item */
  name: string
  /** brand of the item */
  brand: string
  /** click handler */
  handleClick: () => void
}

const defaultProps: Props = {
  img: 'https://flusso.jp/wp-content/uploads/2020/09/MG_3370-150x100.jpg',
  name: 'フルーツソルト',
  brand: 'Flusso',
  handleClick: () => alert('clicked'),
}

const useStyles = makeStyles({
  root: {
    border: `solid 1px ${COLOR.borderGray}`,
    width: '100%',
  },
  photo: {
    width: '100%',
    objectFit: 'cover',
    /* aspectRatio: '16 / 9', */
    borderBottom: `1px solid ${COLOR.borderGray}`,
  },
  gridWrapper: {
    width: '100%',
    padding: '0.8rem',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: '1fr 1fr',
    gridTemplateAreas: '"leftTop right" "leftBottom right"',
  },
  name: {
    gridArea: 'leftTop',
  },
  brand: {
    color: COLOR.brandNameGray,
    fontSize: '0.95rem',
    gridArea: 'leftBottom',
  },
  nextIcon: {
    color: COLOR.brandNameGray,
    gridArea: 'right',
    justifySelf: 'right',
    alignSelf: 'center',
  },
})

const ItemCardForReciever: React.FC<Props> = (props) => {
  const { img, name, brand, handleClick } = props
  const classes = useStyles()
  const aspectRatioRef = useAspectRatio<HTMLImageElement>(9 / 16)

  return (
    <Card className={classes.root} onClick={handleClick} elevation={0}>
      <CardActionArea>
        <img className={classes.photo} src={img} alt="item_photo" ref={aspectRatioRef} />
        <div className={classes.gridWrapper}>
          <Typography className={classes.name}>{name}</Typography>
          <Typography className={classes.brand}>{brand}</Typography>
          <ArrowForwardIosIcon className={classes.nextIcon} />
        </div>
      </CardActionArea>
    </Card>
  )
}

ItemCardForReciever.defaultProps = defaultProps

export { ItemCardForReciever }
