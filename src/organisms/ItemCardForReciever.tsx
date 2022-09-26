import React from 'react'

import { Card, CardActionArea, Typography } from '@mui/material'
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

const ItemCardForReciever: React.FC<Props> = (props) => {
  const { img, name, brand, handleClick } = props
  const aspectRatioRef = useAspectRatio<HTMLImageElement>(9 / 16)

  return (
    <Card
      onClick={handleClick}
      elevation={0}
      sx={{
        border: `solid 1px ${COLOR.borderGray}`,
        width: '100%',
      }}
    >
      <CardActionArea>
        <img
          style={{
            width: '100%',
            objectFit: 'cover',
            borderBottom: `1px solid ${COLOR.borderGray}`,
          }}
          src={img}
          alt="item_photo"
          ref={aspectRatioRef}
        />
        <div
          style={{
            width: '100%',
            padding: '0.8rem',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gridTemplateRows: '1fr 1fr',
            gridTemplateAreas: '"leftTop right" "leftBottom right"',
          }}
        >
          <Typography sx={{ gridArea: 'leftTop' }}>{name}</Typography>
          <Typography
            sx={{
              color: COLOR.brandNameGray,
              fontSize: '0.95rem',
              gridArea: 'leftBottom',
            }}
          >
            {brand}
          </Typography>
          <ArrowForwardIosIcon
            sx={{
              color: COLOR.brandNameGray,
              gridArea: 'right',
              justifySelf: 'right',
              alignSelf: 'center',
            }}
          />
        </div>
      </CardActionArea>
    </Card>
  )
}

ItemCardForReciever.defaultProps = defaultProps

export { ItemCardForReciever }
