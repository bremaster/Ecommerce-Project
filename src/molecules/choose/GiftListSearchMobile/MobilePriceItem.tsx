import React, { Dispatch, SetStateAction } from 'react'

import { Stack, Button, Divider, Typography } from '@mui/material'

import { styled } from '@mui/system'

import { GradientOutlinedButton, AirbnbSlider } from 'atoms'

import { MobileSearchItemTitle } from './MobileSearchItemLayout'

const MobileSearchItemWrap = styled(Stack)({
  borderRadius: 10,
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
  padding: '20px 0',
  paddingBottom: 0,
})

const PriceBox = styled(Stack)({
  width: 120,
  height: 56,
  borderRadius: 10,
  padding: 12,
  border: '1px solid #CFCAC4',
  gap: 5,
  justifyContent: 'center',
})

const PriceTitle = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: 0.03,
  color: '#70757A',
})

const PriceValue = styled(Typography)({
  fontFamily: 'Outfit',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1,
  letterSpacing: 0,
  color: '#4A4A4A',
})

const YEN_MARK = '\xA5'

export const MobilePriceItem = ({
  setMobileStep,
  defaultMinPrice,
  defaultMaxPrice,
  tempPrice,
  setTempPrice,
  max,
}: {
  setMobileStep: Dispatch<SetStateAction<number>>
  defaultMinPrice: number | null
  defaultMaxPrice: number | null
  tempPrice: (number | null | undefined)[]
  setTempPrice: Dispatch<SetStateAction<(number | null | undefined)[]>>
  max: number | null | undefined
}) => {
  return (
    <MobileSearchItemWrap>
      <Stack px={'20px'}>
        <MobileSearchItemTitle>価格は？</MobileSearchItemTitle>
      </Stack>
      <Stack py={4} gap={3} alignItems="center">
        <Stack direction="row" justifyContent="center" alignItems="center" gap={'10px'}>
          <PriceBox>
            <PriceTitle>最低価格</PriceTitle>
            <PriceValue>
              {tempPrice[0] ? `${YEN_MARK} ${tempPrice[0].toLocaleString()}` : '下限なし'}
            </PriceValue>
          </PriceBox>
          <Divider sx={{ borderColor: '#CFCAC4', width: 20 }} />
          <PriceBox>
            <PriceTitle>最高価格</PriceTitle>
            <PriceValue>
              {!tempPrice[1] || tempPrice[1] === 40000
                ? '上限なし'
                : `${YEN_MARK} ${tempPrice[1].toLocaleString()}`}
            </PriceValue>
          </PriceBox>
        </Stack>
        <AirbnbSlider
          defaultMinPrice={defaultMinPrice ? defaultMinPrice : 0}
          defaultMaxPrice={defaultMaxPrice ? defaultMaxPrice : 0}
          values={[tempPrice[0] ? tempPrice[0] : 0, tempPrice[1] ? tempPrice[1] : 40000]}
          setValues={setTempPrice}
          min={0}
          max={max ? max : 0}
          step={1000}
        />
      </Stack>
      <Divider sx={{ borderColor: '#F2F2F2', width: '100%' }} />
      <Stack px={3} py={'10px'} direction="row" justifyContent="space-between">
        <Button
          sx={{
            fontFamily: 'Noto Sans JP',
            fontSize: 16,
            fontWeight: 700,
            textAlign: 'center',
            textDecoration: 'underline',
            color: 'black',
          }}
          onClick={() => {
            if (tempPrice[0] || tempPrice[1]) setTempPrice([0, 0])
            else setMobileStep(3)
          }}
        >
          スキップ
        </Button>
        <GradientOutlinedButton
          onClick={() => {
            setMobileStep(3)
          }}
          width={'75px'}
          fontSize={16}
        >
          次へ
        </GradientOutlinedButton>
      </Stack>
    </MobileSearchItemWrap>
  )
}
