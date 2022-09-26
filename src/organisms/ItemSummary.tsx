import React from 'react'

import { Box, Typography, Stack } from '@mui/material'

type Props = {
  img: string
  brand: string
  itemName: string
  isNoshi?: boolean
  button?: React.ReactNode
  variants?: Array<{ variant: string; selectedOption: string }>
}

export const ItemSummary = ({
  img,
  brand,
  itemName,
  isNoshi = false,
  button = undefined,
  variants = [],
}: Props) => {
  return (
    <>
      <Box
        display="flex"
        height="90px"
        sx={{
          '& > img ': {
            borderRadius: '10px',
            objectFit: 'cover',
          },
        }}
      >
        <img src={img} alt={img} width="88px" height="88px" />
        <Box ml="7px" position="relative" height="100%">
          <Typography
            sx={{
              fontFamily: "'Noto Sans JP'",
              fontStyle: 'normal',
              fontSize: {
                xs: '11px',
                md: '14px',
              },
              lineHeight: {
                xs: '15.93px',
                md: '20.27px',
              },
              color: '#CFCAC4',
              letterSpacing: '0.03rem',
              display: '-webkit-box', // for long text
              WebkitLineClamp: '1', // for long text
              WebkitBoxOrient: 'vertical', // for long text
              overflow: 'hidden', // for long text
              fontWeight: 700,
            }}
          >
            {brand}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Noto Sans JP'",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: {
                xs: '16px',
                md: '20px',
              },
              lineHeight: {
                xs: '24px',
                md: '30px',
              },
              letterSpacing: '0.03em',
              color: '#4A4A4A',
              display: '-webkit-box', // for long text
              WebkitLineClamp: '2', // for long text
              WebkitBoxOrient: 'vertical', // for long text
              overflow: 'hidden', // for long text
            }}
          >
            {itemName}
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
            }}
          >
            {!isNoshi && noshiChip}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
          >
            {button}
          </Box>
        </Box>
      </Box>
      <Box mt="0.5rem" ml="12px">
        {variants.map((v) => (
          <Stack direction="row" key={v.variant}>
            <Typography
              sx={{
                fontFamily: "'Noto Sans JP'",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '12px',
                color: '#4A4A4A',
                whiteSpace: 'pre',
                lineHeight: '17px',
                letterSpacing: '0.03em',
              }}
            >{`✓ ${v.variant}は `}</Typography>
            <Typography
              sx={{
                fontFamily: "'Noto Sans JP'",
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '12px',
                color: '#4A4A4A',
                lineHeight: '17px',
                letterSpacing: '0.03em',
              }}
            >
              {v.selectedOption}
            </Typography>
          </Stack>
        ))}
      </Box>
    </>
  )
}

const noshiChip = (
  <Box
    sx={{
      boxSizing: 'border-box',
      width: '75px',
      height: '25px',
      background: '#FFFFFF',
      border: '1px solid #FE8B7B',
      borderRadius: '10px',
      display: 'grid',
      placeItems: 'center',
    }}
  >
    <Typography
      sx={{
        fontFamily: "'Noto Sans JP'",
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '100%',
        color: '#FE8B7B',
      }}
    >
      のし不可
    </Typography>
  </Box>
)
