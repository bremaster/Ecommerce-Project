import React, { useState } from 'react'
import { Box } from '@mui/material'
import { Image } from 'cloudinary-react'
import Ticker from 'react-ticker'
import { optimize } from '../../../utilities/Cloudinary'

const mod = (modulus) => (num) => ((num % modulus) + modulus) % modulus

const BOXES = [
  {
    cloudname: 'item3_xviyko',
    publicid:
      'https://res.cloudinary.com/zeft/image/upload/v1628821671/zeft_landing/Ellipse_55_zupayl.png',
  },
  {
    cloudname: 'item1_ep86zy',
    publicid:
      'https://res.cloudinary.com/zeft/image/upload/v1628821671/zeft_landing/Ellipse_56_wq8rkr.png',
  },
  {
    cloudname: 'photo_007_1_bkmqht',
    publicid:
      'https://res.cloudinary.com/zeft/image/upload/v1628821852/zeft_landing/Ellipse_57_gjbhnz.png',
  },
]

//react ticker can not use makeStyles, so do not refactor
const style = {
  borderRadius: '50%',
}

const ContractBox = ({ cloudname, publicid }) => {
  return (
    <Box mr={5}>
      <Image cloudName={cloudname} publicId={publicid} width="140" style={style} />
    </Box>
  )
}

const getModularIndex = (array, i) => array[mod(array.length)(i)]

export function LpTicker() {
  const [move] = useState(true)

  const boxesOptimized = BOXES.map((box) => ({
    ...box,
    publicid: optimize(box.publicid),
  }))

  return (
    <>
      <Ticker speed={8} move={move}>
        {({ index }) => ContractBox(getModularIndex(boxesOptimized, index))}
      </Ticker>
    </>
  )
}
