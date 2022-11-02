import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FormStateWithSetter } from 'constants/searchForm'
import { styled } from '@mui/system'

import { Stack, Divider, Typography } from '@mui/material'

import { PreSearchHeader, PreSearchFooter } from 'molecules'
import { AirbnbSlider } from 'atoms'

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

// onboarding page
export const PreSearchPrice = ({
  form,
  step,
  maxStep,
}: {
  form?: FormStateWithSetter
  step: number
  maxStep: number
}) => {
  const navigate = useNavigate()
  const [tempPrice, setTempPrice] = useState([form?.minPrice.value, form?.maxPrice.value])

  const { sceneid } = useParams<{ sceneid: string }>()

  const defaultMax = form?.defaultPriceOptions.slice(-1).pop()

  const fractionText = `${step}/${maxStep}`

  return (
    <>
      <PreSearchHeader
        title={`価格の幅を調整してください（${fractionText}）`}
        subtitle="価格範囲の商品を見つけることが出来ます"
      />
      {form && (
        <Stack py={4} gap={3} alignItems="center">
          <Stack direction="row" justifyContent="center" alignItems="center" gap={'10px'}>
            <PriceBox>
              <PriceTitle>最低価格</PriceTitle>
              <PriceValue>
                {tempPrice[0]
                  ? `${YEN_MARK} ${tempPrice[0].toLocaleString()}`
                  : '下限なし'}
              </PriceValue>
            </PriceBox>
            <Divider sx={{ borderColor: '#CFCAC4', width: 20 }} />
            <PriceBox>
              <PriceTitle>最高価格</PriceTitle>
              <PriceValue>
                {!tempPrice[1] || tempPrice[1] === defaultMax
                  ? '上限なし'
                  : `${YEN_MARK} ${tempPrice[1].toLocaleString()}`}
              </PriceValue>
            </PriceBox>
          </Stack>
          <AirbnbSlider
            defaultMinPrice={form.minPrice.value ? form.minPrice.value : 0}
            defaultMaxPrice={form.maxPrice.value ? form.maxPrice.value : 0}
            values={[
              tempPrice[0] ? tempPrice[0] : 0,
              tempPrice[1] ? tempPrice[1] : 40000,
            ]}
            setValues={setTempPrice}
            min={0}
            max={defaultMax ? defaultMax : 0}
            step={1000}
          />
        </Stack>
      )}
      <PreSearchFooter
        leftFunction={() =>
          navigate(`/product/presearch/category/${sceneid ? sceneid : ''}`)
        }
        rightFunction={() => {
          form?.minPrice.setValue(tempPrice[0] ? tempPrice[0] : 0)
          form?.maxPrice.setValue(tempPrice[1] ? tempPrice[1] : 40000)
          navigate(`/product/presearch/category/${sceneid ? sceneid : ''}`)
        }}
      />
    </>
  )
}
