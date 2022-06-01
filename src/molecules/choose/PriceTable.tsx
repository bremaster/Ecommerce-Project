import React from 'react'
import { Box, Typography, Divider } from '@mui/material'

const YEN_MARK = '\xA5'

type Props = {
  productPrice: number
  minShipping: number
  maxShipping: number
}

export const PriceTable = (props: Props) => {
  const productPrice = YEN_MARK + props.productPrice.toLocaleString('en-US')
  const shippingRange =
    props.minShipping === props.maxShipping
      ? YEN_MARK + props.minShipping.toLocaleString('en-US')
      : YEN_MARK +
        props.minShipping.toLocaleString('en-US') +
        '～' +
        YEN_MARK +
        props.maxShipping.toLocaleString('en-US')

  const sellingRange =
    props.minShipping === props.maxShipping
      ? YEN_MARK + (props.productPrice + props.minShipping).toLocaleString('en-US')
      : YEN_MARK +
        (props.productPrice + props.minShipping).toLocaleString('en-US') +
        '～' +
        YEN_MARK +
        (props.productPrice + props.maxShipping).toLocaleString('en-US')

  return (
    <Box
      sx={{
        '& .MuiTypography-root': {
          lineHeight: 'normal',
        },
        minWidth: '210px',
      }}
    >
      <Box display="flex" justifyContent="space-between" mb="8px">
        <Typography sx={LeftStyle}>価格</Typography>
        <Typography sx={RightStyle}>{productPrice}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb="8px">
        <Typography sx={LeftStyle}>送料</Typography>
        <Typography sx={RightStyle}>{shippingRange}</Typography>
      </Box>
      <Divider
        sx={{
          borderColor: '#F7F7F7',
        }}
      />
      <Box display="flex" alignItems="center" justifyContent="space-between" mt="8px">
        <Typography sx={LeftStyle}>合計</Typography>
        <Box display="flex" alignItems="baseline">
          <Typography sx={{ LeftStyle, fontSize: '10px', mr: '6px', ml: '10px' }}>
            税込
          </Typography>
          <Typography sx={{ ...RightStyle, fontWeight: 600, fontSize: '16px' }}>
            {sellingRange}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

const LeftStyle = {
  fontFamily: "'Noto Sans JP'",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  letterSpacing: '0.03em',
  color: '#4A4A4A',
}

const RightStyle = {
  fontFamily: "'Outfit'",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  letterSpacing: '0.05em',
  color: '#4A4A4A',
}
