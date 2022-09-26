import React from 'react'

import { Box } from '@mui/material'

type Props = {
  current: number
  max: number
  onClickNumber: (page: number) => void
}

export const PageIndicator = ({ current, max, onClickNumber }: Props) => {
  const next = current + 1
  const prev = current - 1

  return (
    <Box sx={{ display: 'flex', columnGap: '8px', justifyContent: 'center' }}>
      {/* left arrow */}
      <Box
        onClick={prev >= 1 ? () => onClickNumber(prev) : undefined}
        sx={{
          mr: '12px',
          display: 'grid',
          placeItems: 'center',
          transform: 'rotate(180deg)',
        }}
      >
        <img src="/assets/item_list/arrow.svg" alt="arrow" />
      </Box>

      {/* page 1 */}
      {current != 1 && <NumberButton onClick={() => onClickNumber(1)}>{1}</NumberButton>}

      {/* show current page - 1 */}
      {max > 3 && current >= 3 && <Dots />}
      {current >= 3 && (
        <NumberButton onClick={() => onClickNumber(prev)}>{prev}</NumberButton>
      )}

      {/* current page */}
      <NumberButton isActive={true}>{current}</NumberButton>

      {/* show current page + 1 */}
      {current <= max - 2 && (
        <NumberButton onClick={() => onClickNumber(next)}>{next}</NumberButton>
      )}
      {max > 3 && current <= max - 2 && <Dots />}

      {/* the last page */}
      {current != max && (
        <NumberButton onClick={() => onClickNumber(max)}>{max}</NumberButton>
      )}

      {/* right arrow */}
      <Box
        onClick={next <= max ? () => onClickNumber(next) : undefined}
        sx={{
          ml: '12px',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <img src="/assets/item_list/arrow.svg" alt="arrow" />
      </Box>
    </Box>
  )
}

const NumberButton = ({
  onClick,
  isActive = false,
  children,
}: {
  onClick?: () => void
  isActive?: boolean
  children?: React.ReactNode
}) => {
  return (
    <Box
      sx={{
        width: '35px',
        height: '35px',
        display: 'grid',
        placeItems: 'center',
        border: '1px solid #FE8B7B',
        borderRadius: '10px',
        borderColor: '#FE8B7B',
        fontSize: '15px',
        fontFamily: 'Outfit',
        cursor: 'pointer',
        paddingLeft: '1px',
        color: isActive ? '#FFFFFF' : '#FE8B7B',
        background: isActive ? '#FE8B7B' : 'transparent',
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  )
}

const Dots = () => (
  <Box
    sx={{
      color: '#FE8B7B',
      cursor: 'default',
      fontFamily: "'Outfit'",
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '18px',
    }}
  >
    <span>...</span>
  </Box>
)
