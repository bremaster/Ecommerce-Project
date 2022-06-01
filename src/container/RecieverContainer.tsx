import React, { useState, useEffect, useCallback } from 'react'

import { Route, Switch, useRouteMatch, useHistory, useLocation } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'

import {
  usePreventClickMashing,
  useAutoCompleteAddressFromPostalCode,
} from 'utilities/CommonHooks'
import { Head } from 'utilities/Head'
import { QUERY_GET_PRODUCTS_BY_IDS } from 'container/hooks'

import { Recieved } from 'pages/SPA/reciever/checkout/ReRecieved'
import { ShowProduct } from 'pages/SPA/reciever/checkout/ReShowProduct'
import { AddressForm } from 'pages/SPA/reciever/checkout/ReAddressForm'
import { AddressConfirm } from 'pages/SPA/reciever/checkout/ReAddressConfirm'
import { ReThank } from 'pages/SPA/reciever/checkout/ReThank'
import { ErrorPage } from 'pages/ErrorPage'
import { ZeftCard, formKeys, FormKey, Product as ProductType } from 'constants/index'
import { useForm } from '../utilities/useForm'
import { EngagedRow } from 'molecules'
/**
 * ギフト取得用フック
 */
function useProduct() {
  const search = useLocation().search
  const [zeftCard, setZeftCard] = useState<ZeftCard>({
    ProductIDList: [],
    Expires: '',
    Status: '',
    Message: '',
    To: '',
    From: '',
  })
  const [giftToken, setGiftToken] = useState('')
  const [isTokenValid, setIsTokenValid] = useState(true)
  const [fetchProducts, { data }] = useLazyQuery(QUERY_GET_PRODUCTS_BY_IDS)
  const fetchCard = useCallback(async (token: string) => {
    const apiUrl = process.env.REACT_APP_CLOUD_RUN_CADU_API_URL
    const res = await fetch(`${apiUrl}/card?token=${token}`)

    const json = await res.json()

    if (json !== null) {
      setZeftCard(json)
    } else if (res.status === 404) {
      setIsTokenValid(false)
    } else {
      throw new Error('An unexpected error has occurred.')
    }
  }, [])

  useEffect(() => {
    const token = new URLSearchParams(search).get('token')
    if (token !== null) {
      setGiftToken(token)
      fetchCard(token)
    }
  }, [])

  useEffect(() => {
    if (zeftCard !== null) {
      fetchProducts({ variables: { ids: zeftCard.ProductIDList, limit: 3 } })
    }
  }, [zeftCard])

  if (typeof data === 'undefined' || data.productDetailCollection.items.length === 0) {
    return { isTokenValid, giftToken, zeftCard, products: null }
  } else {
    const sorter = (a: ProductType, b: ProductType) => {
      const IndexOfA = zeftCard.ProductIDList.indexOf(a.sys.id)
      const IndexOfB = zeftCard.ProductIDList.indexOf(b.sys.id)
      return IndexOfA - IndexOfB
    }
    // sort without mutating original array
    const productItemsSorted = [...data.productDetailCollection.items].sort(sorter)

    return {
      isTokenValid,
      giftToken,
      zeftCard,
      products: productItemsSorted,
    }
  }
}

/**
 * 貰い手情報確定フック
 */
function useSendRecierverInfo() {
  const history = useHistory()
  const { path } = useRouteMatch()

  const sendRecieverInfo = async (
    name?: string,
    postalCode?: string,
    address?: string,
    email?: string,
    phoneNumber?: string,
    token?: string,
    selectedFinally?: string,
    productName?: string,
    isNewsletter?: boolean
  ) => {
    const apiUrl = process.env.REACT_APP_CLOUD_RUN_CADU_API_URL
    const res = await fetch(`${apiUrl}/recipient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        postalCode,
        address, // prefecture and the rest must be separated by space
        email,
        phoneNumber,
        token,
        selectedFinally,
        productName,
        isNewsletter,
      }),
    })
    const result = await res.json()
    if (result.Success) {
      history.push(`${path}/thank`)
    } else if (result.Success === false && result.Message !== '') {
      alert(result.Message)
    } else {
      alert('発注に失敗しました。時間をおいて再度クリックしてください。')
    }
  }

  return sendRecieverInfo
}

/**
 * リロード抑制用フック
 */
// function usePreventReload() {
//   useEffect(() => {
//     window.onbeforeunload = function () {
//       return true;
//     };
//     return () => {
//       window.onbeforeunload = null;
//     };
//   }, []);
// }

/**
 * コンテナコンポーネント
 */
const RecieverContainer: React.FC = () => {
  const { path } = useRouteMatch()
  const history = useHistory()
  const { isTokenValid, giftToken, zeftCard, products } = useProduct()

  const [recieverInfo, setRecieverInfo] = useForm<FormKey>(formKeys)
  const [isNewsletter, setIsNewsletter] = useState<boolean>(true)
  const sendRecieverInfoToBackend = useSendRecierverInfo()
  const { withClickStopSideEffect } = usePreventClickMashing()

  useAutoCompleteAddressFromPostalCode(
    recieverInfo.postalCode || '',
    (value: string) => setRecieverInfo('prefecture', value),
    (value: string) => setRecieverInfo('address1', value)
  )

  const [selected, setSelected] = useState<number>(0)

  const fullAddress = !!recieverInfo.address2
    ? `${recieverInfo.prefecture} ${recieverInfo.address1} ${recieverInfo.address2}`
    : `${recieverInfo.prefecture} ${recieverInfo.address1}`

  const handleChosen = (num: number) => {
    setSelected(num)
    history.push(`${path}/address`)
  }

  // リロード対策
  // usePreventReload();

  return (
    <Switch>
      <Route exact path={`${path}/thank`}>
        <Head title="受取手続き完了｜ZEFT ゼフト"></Head>
        <ReThank />
      </Route>
      <Route exact path={`${path}/confirm`}>
        <Head title="お届け先確認｜ZEFT ゼフト"></Head>
        <AddressConfirm
          postalCode={recieverInfo.postalCode}
          address={fullAddress}
          name={recieverInfo.name}
          email={recieverInfo.email}
          phoneNumber={recieverInfo.phoneNumber}
          handleBackButton={() => history.push(`${path}/address`)}
          handleNextButton={withClickStopSideEffect(() => {
            const { name, email, postalCode, phoneNumber } = recieverInfo
            if (products == null) {
              return
            }
            sendRecieverInfoToBackend(
              name,
              postalCode,
              fullAddress,
              email,
              phoneNumber,
              giftToken,
              zeftCard.ProductIDList[selected],
              products[selected].title,
              isNewsletter
            )
          })}
        >
          {!!products && (
            <EngagedRow
              mainText={products[selected].title}
              subText={products[selected].brand.brandName}
              image={products[selected].productImageCloudinary[0].secure_url}
              leftButtomButtonText="変更する"
              handleClickLeftButtomButton={() => {
                history.push(`${path}/card`)
              }}
            />
          )}
        </AddressConfirm>
      </Route>
      <Route exact path={`${path}/address`}>
        <Head title="お届け先入力｜ZEFT ゼフト"></Head>
        <AddressForm
          recieverName={recieverInfo.name === undefined ? '' : recieverInfo.name}
          onChangeRecieverName={(event) => setRecieverInfo('name', event.target.value)}
          email={recieverInfo.email === undefined ? '' : recieverInfo.email}
          onChangeEmail={(event) => setRecieverInfo('email', event.target.value)}
          postalCode={
            recieverInfo.postalCode === undefined ? '' : recieverInfo.postalCode
          }
          onChangePostalCode={(event) =>
            setRecieverInfo('postalCode', event.target.value)
          }
          prefecture={
            recieverInfo.prefecture === undefined ? '' : recieverInfo.prefecture
          }
          onChangePrefecture={(event) =>
            setRecieverInfo('prefecture', event.target.value)
          }
          address1={recieverInfo.address1 === undefined ? '' : recieverInfo.address1}
          onChangeAddress1={(event) => setRecieverInfo('address1', event.target.value)}
          address2={recieverInfo.address2 === undefined ? '' : recieverInfo.address2}
          onChangeAddress2={(event) => setRecieverInfo('address2', event.target.value)}
          phoneNumber={
            recieverInfo.phoneNumber === undefined ? '' : recieverInfo.phoneNumber
          }
          onChangePhoneNumber={(event) =>
            setRecieverInfo('phoneNumber', event.target.value)
          }
          isNewsletter={isNewsletter}
          toggleNewsLetter={() => {
            setIsNewsletter((prev) => !prev)
          }}
          onClickNextButton={() => {
            history.push(`${path}/confirm`)
          }}
        >
          {!!products && (
            <EngagedRow
              mainText={products[selected].title}
              subText={products[selected].brand.brandName}
              image={products[selected].productImageCloudinary[0].secure_url}
              leftButtomButtonText="変更する"
              handleClickLeftButtomButton={() => {
                history.push(`${path}/card`)
              }}
            />
          )}
        </AddressForm>
      </Route>
      <Route path={`${path}/card`}>
        <ShowProduct
          message={zeftCard.Message}
          products={!!products ? products : []}
          handleChosen={handleChosen}
          expires={zeftCard !== null ? getJapaneseDate(zeftCard.Expires) : ' - '}
        />
      </Route>
      <Route path={path}>
        {isTokenValid ? (
          <>
            <Head title="ZEFT ゼフト｜ギフトが届きました"></Head>
            <Recieved
              expires={zeftCard !== null ? getJapaneseDate(zeftCard.Expires) : ' - '}
              handleClick={() => history.push(`${path}/card`)}
              isProductDetailAvailable={!!products}
              sendRecieverInfo={zeftCard.To}
              senderSenderInfo={zeftCard.From}
              giftMessage={zeftCard.Message}
            />
          </>
        ) : (
          <>
            <Head title="エラー｜ZEFT ゼフト"></Head>
            <ErrorPage></ErrorPage>
          </>
        )}
      </Route>
    </Switch>
  )
}

export { RecieverContainer }

/**
 * utility
 */

function getJapaneseDate(timestamp: string) {
  // console.log(new Date(timestamp));
  // console.log(new Date());
  // バックエンドでは決算日時からきっかり15日分を有効日数として保持している
  // ユーザーへの表示としては 14日後で hh:mm を切り捨てる
  const template = 'yyyy年M月d日（E）' // https://date-fns.org/v2.16.1/docs/format
  const dt = new Date(timestamp)

  if (timestamp) {
    dt.setDate(dt.getDate() - 1)

    let jpDate = ''
    try {
      jpDate = format(dt, template, { locale: ja })
    } catch (e) {
      console.log(e)
    }

    return jpDate
  }
}
