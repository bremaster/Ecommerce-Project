import React from 'react'

import { Box, Typography, Stack, useMediaQuery } from '@mui/material'
import { Theme } from '@mui/material/styles'
import Carousel from 'nuka-carousel'

import { SquareButton } from 'atoms'
import { ProductGuideItem } from 'molecules'
import { Card, CheckoutSummary } from 'organisms'
import { Layout } from 'templates/Layout'
import { GUIDE_ITEM_LIST, ProductWithHandlerAndStatus } from 'constants/index'

type Props = {
  items: Array<ProductWithHandlerAndStatus>
  handleChooseClick: () => void
  handleConversionClick: () => void
}

const GiftBox = ({ items, handleChooseClick, handleConversionClick }: Props) => {
  const isLaptop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'), {
    defaultMatches: false,
  })
  // item slots are 3 at most
  const emptySlot = new Array(3 - items.length).fill(undefined)

  return (
    <Layout maxWidth="md">
      <PageTitle />

      {isLaptop ? <ProductGuideList /> : <ProductGuideCarousel />}

      <Box width="100%" mt={{ xs: '20px', md: '40px' }}>
        {items.map((item, idx) => (
          <Card
            key={item.sys.id}
            header={getCardHeaderText(idx)}
            mb={{ xs: '28px', md: '40px' }}
            iconAtTopRight={
              <Box
                sx={{ width: '30px', cursor: 'pointer' }}
                component="img"
                src="/assets/cancel.svg"
                onClick={item.handleClick}
              />
            }
          >
            <Box mb={{ xs: '1.5rem', md: '2rem' }}>
              <CheckoutSummary
                itemSummary={{
                  img: item.productImageCloudinary[0].secure_url,
                  brand: item.brand.brandName,
                  itemName: item.title,
                  isNoshi: item.noshi,
                }}
                priceTable={{
                  productPrice: item.productPrice,
                  minShipping: item.shippingFee.minFee,
                  maxShipping: item.shippingFee.maxFee,
                }}
              />
            </Box>
          </Card>
        ))}
        {emptySlot.map((_, i) => (
          <Card
            key={`empty-${items.length + i + 1}`}
            mb={{ xs: '28px', md: '40px' }}
            iconAtTopRight={
              <Box
                sx={{ width: '30px', cursor: 'pointer', transform: 'rotate(45deg)' }}
                component="img"
                src="/assets/cancel.svg"
                onClick={handleChooseClick}
              />
            }
          >
            <Typography
              onClick={handleChooseClick}
              sx={{
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0.03em',
                color: '#4A4A4A',
                cursor: 'pointer',
                padding: {
                  xs: '0 0',
                  md: '1rem 0',
                },
                width: '100%',
              }}
            >{`${items.length + i + 1}つ目のギフトを選ぶ`}</Typography>
          </Card>
        ))}
      </Box>

      <Box my={3}>
        <Typography>※北海道・沖縄・離島・一部地域の送料に関しては こちら</Typography>
      </Box>

      {isLaptop ? (
        <Box width="300px" m="80px 0 180px 0">
          <SquareButton fullWidth buttonType="primary" onClick={handleConversionClick}>
            ギフトを贈る
          </SquareButton>
        </Box>
      ) : (
        <Box width="100%" my="16px">
          <SquareButton fullWidth buttonType="primary" onClick={handleConversionClick}>
            ギフトを贈る
          </SquareButton>
        </Box>
      )}
    </Layout>
  )
}

const ProductGuideList = () => (
  <Stack direction="row" mx="auto">
    {GUIDE_ITEM_LIST.map((item, index) => (
      <Stack direction="row" key={index}>
        <Box height="200px" key={index}>
          <ProductGuideItem item={item} />
        </Box>
        {index + 1 < GUIDE_ITEM_LIST.length && (
          <Stack alignItems="center" justifyContent="center">
            <Box component="img" src="/assets/CaretDown.svg" sx={{ width: '25px' }} />
          </Stack>
        )}
      </Stack>
    ))}
  </Stack>
)

const ProductGuideCarousel = () => (
  <Box width="265px">
    <Carousel
      autoplay={true}
      autoplayInterval={4000}
      renderCenterLeftControls={undefined}
      renderCenterRightControls={undefined}
      defaultControlsConfig={{
        nextButtonStyle: { display: 'none' },
        prevButtonStyle: { display: 'none' },
        pagingDotsStyle: {
          fill: '#FE8B7B',
          padding: '2.5px',
        },
      }}
      speed={500}
      wrapAround={true}
    >
      {GUIDE_ITEM_LIST.map((item) => (
        <Box key={item.title} mb="2.5rem">
          <ProductGuideItem
            item={item}
            option={{
              direction: 'row',
            }}
          />
        </Box>
      ))}
    </Carousel>
  </Box>
)

const PageTitle = () => (
  <Stack direction="column" alignItems="center" py="60px">
    <Typography
      sx={{
        fontFamily: "'Outfit'",
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '28px',
        lineHeight: '35px',
        textAlign: 'center',
        color: '#4A4A4A',
        marginBottom: '0.5rem',
      }}
    >
      選んだギフト
    </Typography>
    <Typography
      sx={{
        fontFamily: "'Outfit'",
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '18px',
        letterSpacing: '0.05em',
        color: '#4A4A4A',
      }}
    >
      Selected Gifts
    </Typography>
  </Stack>
)

const getCardHeaderText = (num: number): string => {
  switch (num) {
    case 0: {
      return '1つ目のギフト'
    }
    case 1: {
      return '2つ目のギフト'
    }
    case 2: {
      return '3つ目のギフト'
    }
    default: {
      return 'Gift'
    }
  }
}

export { GiftBox }
