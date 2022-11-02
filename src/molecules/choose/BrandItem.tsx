import React from 'react'
import { Link } from 'react-router-dom'

import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'

import { BrandType } from 'constants/index'

const Wrap = styled(Box)({
  width: '100%',
})

const Item = styled(Link)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 25px',
  borderBottom: '1px solid #CFCAC4',
  height: 50,
  letterSpacing: '0.03em',
  '&:hover': {
    textDecoration: 'none',
  },
})

const SubTitle = styled(Typography)({
  fontFamily: 'Outfit',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '30px',
  letterSpacing: '0.05em',
  color: 'white',
  backgroundColor: '#666666',
  padding: '0 25px',
  textTransform: 'capitalize',
})

const BrandName = styled(Typography)((props) => ({
  fontFamily: 'Outfit',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px',
  letterSpacing: '0.05em',
  color: '#4A4A4A',
  [props.theme.breakpoints.down('md')]: {
    lineHeight: '18px',
  },
}))

type BrandItemType = {
  title: string
  items?: Array<BrandType>
  loading: boolean
}

export const BrandItem = ({ title, items, loading }: BrandItemType) => {
  const check = (str: string) => {
    if (title === '0~9') return /^-?\d+$/.test(str)
    return str === title
  }

  const showArray = items?.filter((temp) => check(temp.sortKey[0]))

  const length = showArray ? showArray.length > 0 : false

  return (
    <>
      {!loading && length && (
        <Wrap>
          <SubTitle>{title}</SubTitle>
          {showArray?.map((item, key) => (
            <Item key={key} to={`/product/brand/${item.sys.id}`}>
              <BrandName>{item.brandName}</BrandName>
              <Box component="img" src="/right-arrow.png" />
            </Item>
          ))}
        </Wrap>
      )}
    </>
  )
}
