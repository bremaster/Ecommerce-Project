import React, { useState, useEffect, useCallback } from 'react'

import { Route, Switch, useRouteMatch, useLocation } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { Box } from '@mui/material'

import { CircularProgressWithLabel } from 'molecules'
import { CheckOut } from 'pages/SPA/checkout/CheckOut'
import { ErrorPage } from 'pages/ErrorPage'
import {
  PaymentIntentResponse,
  PaymentIntentResponseError,
  Product,
} from 'constants/index'
import { Head } from 'utilities/Head'
import { QUERY_GET_PRODUCTS_BY_IDS } from 'container/hooks'

export const AfterPayContainer: React.FC = () => {
  const match = useRouteMatch()
  const { token: giftToken, error: giftTokenError } = useGiftToken()
  const [paymentIntent, paymentIntentError] = usePaymentIntent(giftToken)
  const [product, productError] = useProductInfo(paymentIntent?.productId)

  // trap error cases
  if (giftTokenError !== '') {
    return <ErrorPage body={giftTokenError} />
  }
  if (paymentIntentError !== null) {
    return <ErrorPage header="Sorry" body={paymentIntentError.detail} />
  }
  if (productError !== '') {
    return <ErrorPage header="Sorry" body={productError} />
  }

  // loading
  if (giftToken === '') {
    return <Loading value={25} />
  }
  if (paymentIntent === null) {
    return <Loading value={60} />
  }
  if (product === null) {
    return <Loading value={85} />
  }

  return (
    <Switch>
      {/* After Pay top page */}
      <Route exact path={`${match.path}`}>
        <Head title="お支払い ｜ ZEFT ゼフト" />
        <CheckOut
          item={{
            name: product.title,
            brand: product.brand.brandName,
            photo: product.productImageCloudinary[0].secure_url,
          }}
          productPrice={paymentIntent.productPrice}
          shippingFee={paymentIntent.shippingFee}
          paymentClientSecret={paymentIntent.clientSecret}
        />
      </Route>
      {/* Other routes */}
      <Route>
        <Head title="エラー｜ZEFT ゼフト"></Head>
        <ErrorPage />
      </Route>
    </Switch>
  )
}

function useGiftToken(): { token: string; error: string } {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const { search } = useLocation()
  useEffect(() => {
    const tokenValue = new URLSearchParams(search).get('token')
    if (!!tokenValue) {
      setToken(tokenValue)
    } else {
      setError('リンクを取得できないようです。URLを確認し、再度アクセスしてください。')
    }
  }, [])
  return { token, error }
}

function usePaymentIntent(
  token: string
): [PaymentIntentResponse | null, PaymentIntentResponseError | null] {
  const [response, setResponse] = useState<PaymentIntentResponse | null>(null)
  const [error, setError] = useState<PaymentIntentResponseError | null>(null)

  const fetchPaymentIntent = useCallback(async () => {
    const apiUrl = process.env.REACT_APP_CLOUD_RUN_CADU_API_URL
    const res = await fetch(`${apiUrl}/payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    })

    const json = await res.json()

    if (json.success === true) {
      setResponse(json)
    } else if (json.success === false) {
      setError(json)
    } else {
      setError({
        success: false,
        detail: 'エラーが発生しました。通信環境をご確認ください。',
      })
    }
  }, [token])

  useEffect(() => {
    if (!!token) {
      fetchPaymentIntent()
    }
  }, [token])

  return [response, error]
}

function useProductInfo(productId: string | undefined): [Product | null, string] {
  const [fetchProducts, { data, error }] = useLazyQuery(QUERY_GET_PRODUCTS_BY_IDS)
  useEffect(() => {
    if (!!productId) {
      fetchProducts({ variables: { ids: [productId], limit: 1 } })
    }
  }, [productId])

  if (!!error) {
    return [null, `${error}`]
  }
  if (!!data) {
    return [data.productDetailCollection.items[0], '']
  }
  return [null, '']
}

const Loading = ({ value }: { value: number }) => {
  return (
    <>
      <p style={{ paddingTop: '6rem', textAlign: 'center' }}>Loading...</p>
      <Box width="100%" mt={5} display="flex" justifyContent="center">
        <CircularProgressWithLabel value={value} />
      </Box>
    </>
  )
}
