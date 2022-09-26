import React, { useState } from 'react'

import { Box, Stack, Typography, Divider, useMediaQuery } from '@mui/material'
import { Theme } from '@mui/material/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import { ItemSummary } from 'organisms'
import { PriceTable } from 'molecules'

interface Props {
  itemSummary: {
    img: string
    brand: string
    itemName: string
    isNoshi?: boolean
  }
  priceTable: {
    productPrice: number
    minShipping: number
    maxShipping: number
    defaultCollapse?: boolean
  }
}

export const CheckoutSummary = (props: Props) => {
  const isLaptop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'), {
    defaultMatches: false,
  })
  if (isLaptop) {
    return <CheckoutSummaryLaptop {...props} />
  } else {
    return <CheckoutSummaryMobile {...props} />
  }
}

export const CheckoutSummaryLaptop = (props: Props) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <ItemSummary {...props.itemSummary} />
      <PriceTable {...props.priceTable} />
    </Stack>
  )
}

export const CheckoutSummaryMobile = (props: Props) => {
  const [opened, setOpened] = useState<boolean>(props.priceTable.defaultCollapse === true)
  const toggle = () => setOpened(!opened)

  return (
    <Box>
      <ItemSummary {...props.itemSummary} />
      <AccordionButton isOn={opened} onClick={toggle} />
      {opened && <PriceTable {...props.priceTable} />}
    </Box>
  )
}

const AccordionButton = ({ isOn, onClick }: { isOn: boolean; onClick: () => void }) => (
  <Box
    onClick={onClick}
    sx={{
      cursor: 'pointer',
      my: '12px',
    }}
  >
    <Divider
      sx={{
        borderColor: '#F7F7F7',
      }}
    />
    <Box display="flex" justifyContent="center" alignItems="center" py="10px">
      <Typography
        sx={{
          fontFamily: "'Noto Sans JP'",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '12px',
          lineHeight: '100%',
          color: '#CFCAC4',
        }}
      >
        合計金額を見る
      </Typography>
      <ArrowBackIosNewIcon
        sx={{
          ml: '1rem',
          transform: isOn ? 'rotate(90deg)' : 'rotate(-90deg)',
          fontSize: '12px',
          color: '#CFCAC4',
        }}
      />
    </Box>
    <Divider
      sx={{
        borderColor: '#F7F7F7',
      }}
    />
  </Box>
)
