import React, { useEffect } from 'react'

import { Box, Typography, Stack, useMediaQuery } from '@mui/material'
import { Theme } from '@mui/material/styles'

import { GradientButton } from 'atoms'
import { GiftListCart, Footer } from 'organisms'
import { ProductWithHandlerAndStatus } from 'constants/index'

import { styled } from '@mui/system'

type Props = {
  items: Array<ProductWithHandlerAndStatus>
  handleChooseClick: () => void
  handleConversionClick: () => void
}

const Wrap = styled(Box)((props) => ({
  maxWidth: 948,
  padding: '0 24px',
  margin: '0 auto 354px',
  [props.theme.breakpoints.down('sm')]: {
    marginBottom: 70,
  },
}))

const Title = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontWeight: 700,
  fontSize: '32px',
  lineHeight: '48px',
  textAlign: 'center',
  color: '#4A4A4A',
  letterSpacing: '0.03em',
  marginBottom: '5px',
  [props.theme.breakpoints.down('sm')]: {
    fontSize: '28px',
    lineHeight: '35px',
  },
}))

const SubTitle = styled(Typography)((props) => ({
  fontFamily: 'Outfit',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '23px',
  letterSpacing: '0.05em',
  color: '#4A4A4A',
  [props.theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '17.64px',
  },
}))

export const GiftBox = ({ items, handleChooseClick, handleConversionClick }: Props) => {
  const isLaptop = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {
    defaultMatches: false,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const itemExistsInCart = items.length > 0

  return (
    <>
      <Wrap>
        <Stack direction="column" alignItems="center" py={{ md: 7.5, xs: '35px' }}>
          <Title>選んだギフト</Title>
          <SubTitle>Selected Gifts</SubTitle>
        </Stack>

        <GiftListCart items={items} handleChooseClick={handleChooseClick} type="cart" />

        {isLaptop || items.length < 3 ? (
          <Stack width="300px" mt={{ md: 12.5, xs: 5 }} mx="auto">
            {itemExistsInCart ? (
              <GradientButton fontSize={15} onClick={handleConversionClick}>
                次へ
              </GradientButton>
            ) : (
              <GradientButton onClick={handleChooseClick}>次へ</GradientButton>
            )}
          </Stack>
        ) : (
          <Stack width="100%" my="16px">
            {itemExistsInCart ? (
              <Box
                sx={{
                  position: 'fixed',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  backgroundColor: 'white',
                  borderTop: '1px solid #DDDDDD',
                  zIndex: 3,
                  p: '16px 5%',
                }}
              >
                <GradientButton fontSize={15} onClick={handleConversionClick}>
                  次へ
                </GradientButton>
              </Box>
            ) : (
              <Box
                sx={{
                  position: 'fixed',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  backgroundColor: 'white',
                  borderTop: '1px solid #DDDDDD',
                  zIndex: 3,
                  p: '16px 5%',
                }}
              >
                <GradientButton onClick={handleChooseClick}>次へ</GradientButton>
              </Box>
            )}
          </Stack>
        )}
      </Wrap>
      <Box
        // Add padding to avoid overrapped by button
        pb={{ xs: '80px', md: '0px' }}
        sx={{
          background: '#F6F6F6',
        }}
      >
        <Footer isMinimal={true} />
      </Box>
    </>
  )
}
