import React, { useEffect, useState } from 'react'

import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Box, CircularProgress } from '@mui/material'

import { GradientButton, GreyButton } from 'atoms'
import { TermsOfService, Alert, LoadingModal, Card } from 'organisms'
import { usePreventClickMashing } from 'utilities/CommonHooks'
/* import { PaymentIntentResponse } from 'constants/index'; */

type Props = {
  clientSecret: string
}

// https://stripe.com/docs/payments/quickstart
export const PaymentFormStripe = ({ clientSecret }: Props): JSX.Element => {
  const stripe = useStripe()
  const elements = useElements()

  const [errorMessage, setErrorMessage] = useState<null | undefined | string>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { withClickStopSideEffect, setClickableStatus } = usePreventClickMashing()

  const cleanup = () => {
    setErrorMessage(null)
    setIsLoading(false)
    setClickableStatus('CLICKABLE')
  }

  useEffect(() => {
    if (!stripe) {
      return
    }

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      // CAUTION
      // payment intent のステータス変更までけっこう時間がかかるので注意。
      // ステータスが完了後のコールバックは、URLのリダイレクトが先にはじまるため実行されない
      switch (paymentIntent?.status) {
        case 'succeeded':
          // setErrorMessage('Payment succeeded!');
          break
        case 'processing':
          break
        case 'requires_payment_method':
          // setErrorMessage('Your payment was not successful, please try again.');
          break
        default:
          setErrorMessage('ペイメントインテントのステータスにエラーが発生しました。')
          break
      }
    })

    return cleanup
  }, [stripe])

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const thanksPageURL = `${window.location.origin}/success/afterpay`

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: thanksPageURL,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setErrorMessage(error.message)
    } else {
      setErrorMessage('決済処理でエラーが発生しました。')
    }

    setIsLoading(false)
    setClickableStatus('CLICKABLE')
  }

  // payment form state and handler
  const [isFormReady, setIsFormReady] = useState(false)
  const [isFormFilled, setIsFormFilled] = useState(false)
  const handleReadyPaymentElement = (): void => {
    setIsFormReady(true)
  }
  const handleChangePaymentElement = (event: { complete: boolean }): void => {
    if (event.complete === true) {
      setIsFormFilled(true)
    } else {
      setIsFormFilled(false)
    }
  }

  const isButtonDisabled = isLoading || !stripe || !elements || !isFormFilled

  return (
    <form id="payment-form">
      <Card num={2} header="決済情報" width="100%" pb="1rem">
        {isFormReady === false && (
          <Box p="1rem" textAlign="center">
            <CircularProgress />
          </Box>
        )}
        <PaymentElement
          id="payment-element"
          onChange={handleChangePaymentElement}
          onReady={handleReadyPaymentElement}
        />
        <Box p="1rem" />
      </Card>

      <Box width="100%" mt="1rem" p={3} textAlign="center">
        <TermsOfService />
      </Box>

      <Box mt={3} pb={5}>
        {isButtonDisabled ? (
          <GreyButton>決済する</GreyButton>
        ) : (
          <GradientButton type="submit" onClick={withClickStopSideEffect(handleSubmit)}>
            決済する
          </GradientButton>
        )}
      </Box>

      {isLoading && <LoadingModal />}

      {!!errorMessage && (
        <Alert
          message={errorMessage}
          handleClose={() => {
            setErrorMessage('')
          }}
        />
      )}
    </form>
  )
}

// Maybe use below later
//
// import { dataLayerPush } from 'utilities/GoogleAnalytics';
//
// const dispatchGoogleAnalytics = (cardId, price, itemIds) => {
//   // 購入商品名は、SKU_ZEFTCARD_{ギフト候補商品のIDの上5桁}_{ギフト候補商品のIDの上5桁}... の形式。
//   const itemId =
//     'SKU_ZEFTCARD_' +
//     itemIds
//       .sort()
//       .map((id) => id.slice(0, 5))
//       .join('_');

//   // トランザクションのIDには日付とカードIDを利用
//   const transactionId = new Date().toISOString().slice(0, 10) + '_' + cardId.slice(0, 7);

//   const param = {
//     currency: 'JPY',
//     transaction_id: transactionId,
//     value: price,
//     items: [
//       {
//         item_id: itemId,
//         item_name: itemId,
//       },
//     ],
//     selected: itemIds,
//     how_many_selected: itemIds.length,
//   };

//   dataLayerPush({
//     event: 'onPurchaseSucceeded',
//     purchaseParam: param,
//   });
// };
