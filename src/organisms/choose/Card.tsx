import React, { useState, useEffect, useRef } from 'react'
import { Grid, Box, Typography } from '@mui/material'

const Card = ({
  title = '猫茶セット',
  brand = 'THAN',
  img = '/assets/goods_photo/img_41_1.jpg',
  handleClick = () => alert('delete clicked!!!'),
  ...rest
}) => {
  const [width, setWidth] = useState<number | null>(null)
  const wrapperEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperEl !== null && wrapperEl.current !== null) {
      const w = wrapperEl.current.offsetWidth
      setWidth(w) // without px. just value.
    }
  }, [width])

  const imageWidth = width !== null ? `${width / 4.5}px` : '0px'

  return (
    <div ref={wrapperEl} {...rest}>
      <Grid container direction="row" justifyContent="space-between">
        <img
          css={{ objectFit: 'cover', borderRadius: '0.3rem' }}
          width={imageWidth}
          height={imageWidth}
          src={img}
        />
        <div css={{ width: '70%', position: 'relative' }}>
          <h2 css={{ fontSize: '13px', margin: '0px' }}>{title}</h2>
          <h2 css={{ fontSize: '12px', color: 'grey', margin: '0px' }}>{brand}</h2>
          <Box position="absolute" right="0">
            <Typography
              css={{
                fontSize: '12px',
                cursor: 'pointer',
                lineHeight: '20px',
                textDecorationLine: 'underline',
              }}
              onClick={handleClick}
            >
              削除する
            </Typography>
          </Box>
        </div>
      </Grid>
    </div>
  )
}

export default Card
