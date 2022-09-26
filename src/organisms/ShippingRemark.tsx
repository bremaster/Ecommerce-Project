import React from 'react'

import { Typography, Box } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Carousel from 'nuka-carousel'

import { styled } from '@mui/system'

const Title = styled(Typography)({
  fontFamily: "'Noto Sans JP'",
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '130%',
  letterSpacing: '0.03em',
  color: '#FE8B7B',
})

const NormalText = styled(Typography)((props) => ({
  fontFamily: "'Noto Sans JP'",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '13px',
  lineHeight: '130%',
  letterSpacing: '0.03em',
  color: '#4A4A4A',
  [props.theme.breakpoints.up('md')]: {
    whiteSpace: 'pre',
  },
}))

const TableRoot = styled(Box)((props) => ({
  fontFamily: "'Noto Sans JP'",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '13px',
  lineHeight: '130%',
  letterSpacing: '0.03em',
  color: '#4A4A4A',
  [props.theme.breakpoints.up('md')]: {
    whiteSpace: 'pre',
  },
}))

const TableHeaderText = styled(Typography)({
  fontFamily: "'Noto Sans JP'",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '13px',
  lineHeight: '19px',
  letterSpacing: '0.03em',
  color: '#FE8B7B',
  padding: '15px 17px',
})

const TableRow = styled(Box)({
  display: 'flex',
  background: 'rgba(254, 139, 123, 0.05)',
  borderTop: '1px solid rgba(254, 139, 123, 0.20)',
  '& .MuiTypography-root': {
    padding: '15px 17px',
    fontFamily: "'Noto Sans JP'",
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '19px',
    letterSpacing: '0.03em',
    color: '#4A4A4A',
  },
})

type Props = {
  items: {
    itemName: string
    hokkaidoFee: number
    okinawaFee: number
    undeliverableSites: string[]
  }[]
}

export const ShippingRemark = ({ items = [] }: Props) => {
  // If multiple items, use a carousel
  let nameAndPrice: React.ReactNode
  if (items.length === 1) {
    nameAndPrice = (
      <NameAndPrice
        itemName={items[0].itemName}
        hokkaidoFee={items[0].hokkaidoFee}
        okinawaFee={items[0].okinawaFee}
        undeliverableSites={items[0].undeliverableSites}
      />
    )
  } else if (items.length > 1) {
    nameAndPrice = (
      <Carousel
        autoplay={true}
        autoplayInterval={5000}
        renderCenterLeftControls={({ previousSlide }) => (
          <ArrowForwardIosIcon
            onClick={previousSlide}
            sx={{
              transform: 'rotate(180deg)',
              cursor: 'pointer',
              color: 'rgba(254, 139, 123, 0.5)',
              ml: '-10px',
            }}
          />
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <ArrowForwardIosIcon
            onClick={nextSlide}
            sx={{
              cursor: 'pointer',
              color: 'rgba(254, 139, 123, 0.5)',
              mr: '-10px',
            }}
          />
        )}
        defaultControlsConfig={{
          // nextButtonStyle: { display: 'none' },
          // prevButtonStyle: { display: 'none' },
          pagingDotsStyle: {
            fill: '#FE8B7B',
            padding: '2.5px',
          },
        }}
        speed={500}
        style={{
          cursor: 'pointer',
        }}
      >
        {items.map((item, idx) => (
          <Box key={item.itemName + idx} mb="2rem" px="1.5rem">
            <NameAndPrice
              itemName={item.itemName}
              hokkaidoFee={item.hokkaidoFee}
              okinawaFee={item.okinawaFee}
              undeliverableSites={item.undeliverableSites}
            />
          </Box>
        ))}
      </Carousel>
    )
  }

  return (
    <Box>
      <Title mb="24px">北海道・沖縄（離島・一部地域）への送料について</Title>
      <NormalText mb="24px">
        {
          '下記以外の地域に関しては、表示の送料幅に収まります。\nお相手が住所を入力したタイミングで送料は確定します。'
        }
      </NormalText>
      {nameAndPrice}
    </Box>
  )
}

const NameAndPrice = ({
  itemName,
  hokkaidoFee,
  okinawaFee,
  undeliverableSites,
}: {
  itemName: string
  hokkaidoFee: number
  okinawaFee: number
  undeliverableSites: string[]
}) => {
  const hokkaido = hokkaidoFee.toLocaleString('en-US') + '円'
  const okinawa = okinawaFee.toLocaleString('en-US') + '円'

  return (
    <>
      <NormalText mb="14px">{itemName}</NormalText>
      <TableRoot>
        <Box
          sx={{
            background:
              'linear-gradient(102.49deg, #FFF3E9 -18.78%, #FFECDD -12.51%, #FFEAE7 56.55%, #EBE6FF 166.15%)',
            display: 'flex',
          }}
        >
          <TableHeaderText
            width="100px"
            sx={{ borderRight: '1px solid rgba(254, 139, 123, 0.20)' }}
          >
            配送先
          </TableHeaderText>
          <TableHeaderText>送料</TableHeaderText>
        </Box>
        <TableRow>
          <Typography
            width="100px"
            sx={{ borderRight: '1px solid rgba(254, 139, 123, 0.20)' }}
          >
            北海道
          </Typography>
          <Typography>{hokkaido}</Typography>
        </TableRow>
        <TableRow>
          <Typography
            width="100px"
            sx={{ borderRight: '1px solid rgba(254, 139, 123, 0.20)' }}
          >
            沖縄
          </Typography>
          <Typography>{okinawa}</Typography>
        </TableRow>
        {undeliverableSites.map((site) => (
          <TableRow key={site}>
            <Typography
              width="100px"
              sx={{ borderRight: '1px solid rgba(254, 139, 123, 0.20)' }}
            >
              {site}
            </Typography>
            <Typography>配送不可</Typography>
          </TableRow>
        ))}
      </TableRoot>
    </>
  )
}
