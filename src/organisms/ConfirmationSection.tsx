import React, { FC, Fragment } from 'react'

import { Typography, Box, Divider } from '@mui/material'
import { EngagedRow } from 'molecules'
import { COLOR } from 'theme'

export type Props = {
  sender: {
    name: string
    email: string
    phone: string
  }
  items: {
    image: string
    brand: string
    name: string
  }[]
  price: number
}

export const ConfirmationSection: FC<Props> = (props: Props) => {
  const { name, email, phone } = props.sender

  return (
    <div style={{ width: '100%' }}>
      {/* sender info section */}
      <Box mb={3} px="18px">
        <Box pb={1}>
          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            購入者情報
          </Typography>
        </Box>
        {[name, email, phone].map((val) => (
          <Typography
            sx={{
              fontSize: '14px',
              fontFamily: 'Roboto',
              lineHeight: 1.5,
            }}
            key={val}
          >
            {val}
          </Typography>
        ))}
      </Box>

      {/* gift info section */}
      <Box mb={3}>
        <Box pb={1} px="18px">
          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            ギフトリスト
          </Typography>
        </Box>
        {props.items.map((item) => (
          <Fragment key={item.name}>
            <Divider sx={{ borderColor: COLOR.subtleGray }} />
            <Box py={1} px="18px">
              <EngagedRow mainText={item.name} subText={item.brand} image={item.image} />
            </Box>
          </Fragment>
        ))}
      </Box>

      {/* price section */}
      <Box px="18px" display="flex" justifyContent="space-between">
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: '0',
          }}
        >
          合計金額（送料込み）
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: '0',
          }}
        >
          {`${props.price.toLocaleString('en-US')} 円（税込）`}
        </Typography>
      </Box>
    </div>
  )
}
