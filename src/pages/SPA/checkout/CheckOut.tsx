import React, { useState, useEffect } from 'react'

import { Box, Typography, Divider } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { SquareButton } from 'atoms'
import { MenuAppBar, PaymentFormStripe } from 'organisms'
import { EngagedRow } from 'molecules'
import { Layout } from '../../../templates/Layout'
import { COLOR } from 'theme'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY as string
)

const useStyles = makeStyles({
  divider: {
    borderColor: COLOR.subtleGray,
  },
  priceSection: {
    fontFamily: '"Noto Sans JP", -apple-system, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    letterSpacing: '0',
  },
  priceSectionBold: {
    fontFamily: '"Noto Sans JP", -apple-system, sans-serif',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0',
  },
})

type Props = {
  item: {
    name: string
    photo: string
    brand: string
  }
  productPrice: number
  shippingFee: number
  paymentClientSecret: string
}

export const CheckOut: React.FC<Props> = (props) => {
  const [isPaymentFormShown, setIsPaymentFormShown] = useState(false)
  const classes = useStyles()

  const handleNextButton = () => {
    setIsPaymentFormShown(true)
  }

  const sellingPrice = props.productPrice + props.shippingFee

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
      colorBackground: COLOR.formGrey,
    },
    rules: {
      '.Label': {
        color: '#000000',
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
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
      },
      '.Tab': {
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
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
    <Layout>
      <Box width="100%">
        <MenuAppBar />
        <Header />

        {/* gift info section */}
        <Divider className={classes.divider} />
        <Box py={2} px="18px">
          <EngagedRow
            mainText={props.item.name}
            subText={props.item.brand}
            image={props.item.photo}
          />
        </Box>
        <Divider className={classes.divider} />

        {/* price section */}
        <Box mt={1}>
          <Box px="18px" display="flex" justifyContent="space-between">
            <Typography className={classes.priceSection}>商品価格</Typography>
            <Typography className={classes.priceSection}>
              {`${props.productPrice.toLocaleString('en-US')} 円（税込）`}
            </Typography>
          </Box>
          <Box px="18px" display="flex" justifyContent="space-between">
            <Typography className={classes.priceSection}>配送手数料</Typography>
            <Typography className={classes.priceSection}>
              {`${props.shippingFee.toLocaleString('en-US')} 円（税込）`}
            </Typography>
          </Box>
          <Box px="18px" display="flex" justifyContent="space-between">
            <Typography className={classes.priceSectionBold}>合計金額</Typography>
            <Typography className={classes.priceSectionBold}>
              {`${sellingPrice.toLocaleString('en-US')} 円（税込）`}
            </Typography>
          </Box>
        </Box>

        <Box width="100%" mt="2rem" mb="2rem">
          <SquareButton
            buttonType="primary"
            onClick={handleNextButton}
            fullWidth
            inactive={isPaymentFormShown}
          >
            決済へ進む
          </SquareButton>
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
  )
}

const useHeaderStyle = makeStyles({
  subTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '25px',
    letterSpacing: '0.25em',
    color: COLOR.gray700,
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '25px',
    letterSpacing: '0.05em',
    color: COLOR.gray800,
  },
  body: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    lineHeight: '25px',
    letterSpacing: '0.05em',
    color: COLOR.gray700,
    whiteSpace: 'pre',
    textAlign: 'center',
  },
})

const Header = () => {
  const classes = useHeaderStyle()

  return (
    <Box mt={1} mb="2rem" display="flex" flexDirection="column" alignItems="center">
      <Typography>
        <Box className={classes.subTitle}>CHECKOUT</Box>
      </Typography>
      <Box mt="1rem">
        <Typography>
          <Box className={classes.title}>ギフトが選択されました</Box>
        </Typography>
      </Box>
      <Typography>
        <Box mt="1rem" className={classes.body}>
          {
            'お相手がギフトを選び終えました。\n下記からお支払いが済み次第、配送を開始します。'
          }
        </Box>
      </Typography>
    </Box>
  )
}
