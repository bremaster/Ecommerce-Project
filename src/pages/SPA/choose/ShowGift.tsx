import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Box, Stack, Typography } from '@mui/material'

import { GiftListCart, Footer } from 'organisms'
import { ProductWithHandlerAndStatus } from 'constants/index'

import { styled } from '@mui/system'

type Props = {
  items: Array<ProductWithHandlerAndStatus>
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
  letterSpacing: '0.08em',
  [props.theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '40px',
  },
}))

const Arrow = styled(Stack)({
  marginTop: -24,
  marginBottom: -27,
})

// onboarding page
export const ShowGift = ({ items }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navigate = useNavigate()

  const { sceneid } = useParams<{ sceneid: string }>()

  const handleChooseItem = () => {
    navigate(`/product/choose/${sceneid ? sceneid : ''}`)
  }

  return (
    <>
      <Wrap>
        <Stack direction="column" alignItems="center" py={{ md: 7.5, xs: '30px' }}>
          <Title>
            貰った方が1つ選んで
            <br />
            受け取れます
          </Title>
        </Stack>
        <Arrow alignItems="center">
          <img src="/arrow-down.png" />
        </Arrow>
        <GiftListCart
          items={items}
          handleChooseClick={handleChooseItem}
          type="onboarding"
        />
      </Wrap>
      <Box
        // Add padding to avoid overrapped by button
        sx={{
          background: '#F6F6F6',
        }}
      >
        <Footer isMinimal={true} />
      </Box>
    </>
  )
}
