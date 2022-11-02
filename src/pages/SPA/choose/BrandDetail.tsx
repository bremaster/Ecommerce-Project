import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Box, Stack, Typography, Grid } from '@mui/material'
import { styled } from '@mui/system'

import { MenuAppBar, Footer, ItemCard } from 'organisms'
import { QUERY_GET_BRAND_DETAIL } from 'container/hooks'
import { ProductWithHandlerAndStatus } from 'constants/index'
import { useStocks } from 'container/hooks/sender/useStocks'
import { Head } from 'utilities/Head'

import { useLazyQuery } from '@apollo/client'

const Header = styled(Stack)({
  width: '100%',
  background: 'white',
  height: '187px',
})

const HeaderImage = styled('img')({
  maxWidth: 1000,
  width: 'auto',
  height: '187px',
})

const SubTitle = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
  textAlign: 'center',
  letterSpacing: '0.08em',
  color: '#4A4A4A',
})

const DescriptionWrap = styled(Stack)((props) => ({
  maxWidth: 1150,
  width: '90%',
  margin: '0 auto',
  gap: '30px',
  padding: '0 25px',
  marginTop: 30,
  [props.theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

const Description = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontSize: '14px',
  lineHeight: '21px',
  letterSpacing: '0.08em',
  color: '#4A4A4A',
})

const GiftList = styled(Stack)((props) => ({
  maxWidth: '1150px',
  width: '90%',
  margin: '0 auto',
  marginTop: '70px',
  padding: '0 25px',
  [props.theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

const GiftListTitle = styled(Typography)({
  fontFamily: 'Outfit',
  fontWeight: 600,
  fontStyle: 'normal',
  fontSize: '18px',
  lineHeight: '23px',
  textAlign: 'left',
  color: '#4A4A4A',
})

export const BrandDetail = () => {
  const { brandId } = useParams()
  const navigate = useNavigate()

  const [fetch, { data }] = useLazyQuery(QUERY_GET_BRAND_DETAIL)

  const stocks = useStocks(
    data === undefined
      ? []
      : data.brandDetail.linkedFrom.productDetailCollection.items.map(
          (item: { sys: { id: string } }) => item.sys.id
        )
  )

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch({ variables: { id: brandId } })
  }, [])

  const metaTag = {
    title: `${data?.brandDetail.brandName}｜ZEFT ゼフト`,
    description:
      // get brand description from 1st item of this brand
      data?.brandDetail.linkedFrom.productDetailCollection.items[0]
        .brandDescriptionCollection.items[0].body,
  }

  return (
    <>
      <Head {...metaTag} />
      <MenuAppBar giftBoxButton={false} />
      <Header
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <HeaderImage src={data?.brandDetail.brandImageCloudinary[0].url} />
      </Header>

      <DescriptionWrap>
        <SubTitle>{data?.brandDetail.brandName}</SubTitle>
        <Description>
          {
            // get brand description from 1st item of this brand
            data?.brandDetail.linkedFrom.productDetailCollection.items[0]
              .brandDescriptionCollection.items[0].body
          }
        </Description>
      </DescriptionWrap>

      <GiftList>
        <GiftListTitle>ギフト一覧</GiftListTitle>
        <Box mt={'10px'}>
          <Grid container spacing={2}>
            {data?.brandDetail.linkedFrom.productDetailCollection.items.map(
              (item: ProductWithHandlerAndStatus & { onTap: () => void }) => (
                <Grid
                  key={item.title}
                  item
                  xs={6}
                  md={4}
                  lg={3}
                  sx={{
                    paddingTop: {
                      sm: '20px !important',
                      xs: '58px !important',
                    },
                  }}
                >
                  <ItemCard
                    item={{
                      ...item,
                      onTap: () => navigate(`/product/detail/${item.sys.id}`),
                      stockOk: isInStock(stocks[item.sys.id]),
                    }}
                  />
                </Grid>
              )
            )}
          </Grid>
        </Box>
      </GiftList>

      <Box mt={{ xs: '3rem', md: '6rem' }}>
        <Footer />
      </Box>
    </>
  )
}

function isInStock(amount: number | undefined): boolean | undefined {
  if (amount === undefined) {
    return undefined
  }
  return amount > 0
}
