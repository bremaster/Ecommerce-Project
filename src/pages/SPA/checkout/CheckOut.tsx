import React, { useState, useEffect } from 'react'

import { Box, Typography, Stack } from '@mui/material'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { GradientButton } from 'atoms'
import { MenuAppBar, PaymentFormStripe, Footer, Card, CheckoutSummary } from 'organisms'
import { Layout } from 'templates/Layout'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY as string
)

type Props = {
  item: {
    name: string
    photo: string
    brand: string
    noshiOk: boolean
  }
  productPrice: number
  shippingFee: number
  paymentClientSecret: string
}

export const CheckOut: React.FC<Props> = (props) => {
  const [isPaymentFormShown, setIsPaymentFormShown] = useState(false)

  const handleNextButton = () => {
    setIsPaymentFormShown(true)
  }

  // scroll to payment form area
  useEffect(() => {
    if (isPaymentFormShown) {
      setTimeout(() => {
        window.scroll({
          top: 500,
          behavior: 'smooth',
        })
      }, 150)
    }
  }, [isPaymentFormShown])

  // styling for stripe: https://stripe.com/docs/stripe-js/appearance-api
  const stripeAppearance = {
    // なぜかerror になるのでキャストする
    theme: 'flat' as 'none' | 'flat' | 'stripe' | 'night' | undefined,
    variables: {
      // web fonts not work on some iOS devices
      fontFamily: '"Noto Sans JP", -apple-system, sans-serif',
      borderRadius: '0px',
      colorBackground: '#F7F7F7',
    },
    rules: {
      '.Label': {
        color: '#4A4A4A',
        marginTop: '5px',
        marginBottom: '8px',
        letterSpacing: '0.5px',
        fontSize: '12px',
      },
      '.Error': {
        fontSize: '12px',
        paddingTop: '6px',
      },
      '.Input': {
        fontSize: '16px',
        lineHeight: '20px',
        padding: '12px 10px',
        borderRadius: '10px',
        color: '#4A4A4A',
      },
      '.Tab': {
        borderRadius: '10px',
      },
    },
  }
  const stripeOptions = {
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap',
      },
    ],
    clientSecret: props.paymentClientSecret,
    appearance: stripeAppearance,
    locale: 'ja' as 'ja', // string type causes error
  }

  return (
    <>
      <MenuAppBar giftBoxButton={false} />
      <Layout maxWidth="md">
        <Box width="100%">
          <PageTitle />

          {/* gift info */}
          <Card num={1} header="選ばれたギフト" width="100%" mb="2rem">
            <Box mb={{ xs: '1.5rem', md: '2rem' }}>
              <CheckoutSummary
                itemSummary={{
                  img: props.item.photo,
                  brand: props.item.brand,
                  itemName: props.item.name,
                  isNoshi: props.item.noshiOk,
                }}
                priceTable={{
                  productPrice: props.productPrice,
                  minShipping: props.shippingFee,
                  maxShipping: props.shippingFee,
                  defaultCollapse: true,
                }}
              />
            </Box>
          </Card>

          <Box width="100%" mt="2rem" mb="2rem">
            {!isPaymentFormShown && (
              <GradientButton onClick={handleNextButton}>決済へ進む</GradientButton>
            )}
          </Box>

          {/* payment form */}
          <Box minHeight="420px" display={isPaymentFormShown ? 'block' : 'none'}>
            {!!props.paymentClientSecret ? (
              // FIXME: ts error will be fixed by https://github.com/stripe/react-stripe-js/pull/280
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <Elements options={stripeOptions} stripe={stripePromise}>
                <PaymentFormStripe clientSecret={props.paymentClientSecret} />
              </Elements>
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Box>
        </Box>
      </Layout>
      <Footer />
    </>
  )
}

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
      お支払い
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
      Checkout
    </Typography>
  </Stack>
)
