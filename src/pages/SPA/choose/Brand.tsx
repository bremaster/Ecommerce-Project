import React, { useEffect } from 'react'

import { MenuAppBar, Footer } from 'organisms'
import { BrandItem } from 'molecules'

import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'

import { BrandType } from 'constants/index'
import { QUERY_GET_BRAND_LIST } from 'container/hooks'

import { useLazyQuery } from '@apollo/client'

const Header = styled(Stack)((props) => ({
  width: '100%',
  background: 'white',
  height: '196px',
  [props.theme.breakpoints.down('md')]: {
    height: '120px',
  },
}))

const SubTitle = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '32px',
  lineHeight: '40px',
  textAlign: 'center',
  letterSpacing: '0.05em',
  color: '#4A4A4A',
  [props.theme.breakpoints.down('md')]: {
    fontSize: '28px',
    lineHeight: 1,
  },
}))

const Title = styled(Typography)((props) => ({
  fontFamily: 'Outfit',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '22px',
  letterSpacing: '0.05em',
  color: '#4A4A4A',
  [props.theme.breakpoints.down('md')]: {
    lineHeight: '18px',
  },
}))

const BrandList = styled(Box)((props) => ({
  maxWidth: '1150px',
  width: '90%',
  margin: '0 auto',
  [props.theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

const sortArray = ['0~9', ...'abcdefghijklmnopqrstuvwxyz'.split('')]

interface LinkedProducts {
  linkedFrom: {
    productDetailCollection: {
      total: number
    }
  }
}

export const Brand = () => {
  const [fetch, { loading, data }] = useLazyQuery<{
    brandDetailCollection: {
      items: Array<BrandType & LinkedProducts>
    }
  }>(QUERY_GET_BRAND_LIST)

  //remove brand having no product
  const brandListToBeShown = data?.brandDetailCollection.items.filter(
    (b) => b.linkedFrom.productDetailCollection.total > 0
  )

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch()
  }, [])

  return (
    <>
      <MenuAppBar giftBoxButton={false} />
      <Header
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <SubTitle>BRAND</SubTitle>
        <Box mt={{ md: '12px', xs: '10px' }} sx={{ zIndex: 20 }}>
          <Title>ブランド一覧</Title>
        </Box>
      </Header>
      <BrandList>
        {sortArray.map((title: string, key: number) => (
          <BrandItem
            title={title}
            key={key}
            items={brandListToBeShown}
            loading={loading}
          />
        ))}
      </BrandList>
      <Box mt={{ xs: '3rem', md: '6rem' }}>
        <Footer />
      </Box>
    </>
  )
}
