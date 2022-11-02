import React from 'react'

import Slider, { SliderThumb } from '@mui/material/Slider'

import { styled } from '@mui/system'

type AirbnbSliderProps = {
  defaultMinPrice: number | null
  defaultMaxPrice: number | null
  values: (number | null | undefined)[]
  setValues: (value: (number | null | undefined)[]) => void
  min: number
  max: number
  step: number
}

const AirbnbSliderItem = styled(Slider)({
  color: '#B5B5B5',
  height: 3,
  width: '270px',
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
    color: 'white',
    background:
      'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
    borderImageSource:
      'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  },
  '& .MuiSlider-rail': {
    color: '#B5B5B5',
    opacity: 1,
    height: 1,
  },
})

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  )
}

export const AirbnbSlider = ({
  defaultMinPrice,
  defaultMaxPrice,
  values,
  setValues,
  min,
  max,
  step,
}: AirbnbSliderProps) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue == 'number') return

    const prices = [...newValue]
    setValues([prices[0], prices[1]])
  }

  return (
    <AirbnbSliderItem
      components={{ Thumb: AirbnbThumbComponent }}
      getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
      defaultValue={[
        defaultMinPrice ? defaultMinPrice : 0,
        defaultMaxPrice ? defaultMaxPrice : 0,
      ]}
      value={[values[0] ? values[0] : 0, values[1] ? values[1] : 0]}
      onChange={handleChange}
      step={step}
      min={min}
      max={max}
    />
  )
}
