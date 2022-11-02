import React, { useState, useEffect, useCallback } from 'react'

import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'

import {
  usePreventClickMashing,
  useAutoCompleteAddressFromPostalCode,
} from 'utilities/CommonHooks'
import { Head } from 'utilities/Head'
import { QUERY_GET_PRODUCTS_BY_IDS } from 'container/hooks'
import { dataLayerPush } from 'utilities/GoogleAnalytics'

import { Recieved } from 'pages/SPA/reciever/checkout/ReRecieved'
import { ShowProduct } from 'pages/SPA/reciever/checkout/ReShowProduct'
import { AddressForm } from 'pages/SPA/reciever/checkout/ReAddressForm'
import { AddressConfirm } from 'pages/SPA/reciever/checkout/ReAddressConfirm'
import { ReThank } from 'pages/SPA/reciever/checkout/ReThank'
import { PreviewGift } from 'pages/SPA/reciever/PreviewGift'
import { ChooseVariation } from 'pages/SPA/reciever/ChooseVariation'

import { ErrorPage } from 'pages/ErrorPage'
import {
  ZeftCard,
  PreviewData as PreviewDataType,
  formKeys,
  FormKey,
  Product as ProductType,
} from 'constants/index'
import { useForm } from '../utilities/useForm'
import { ItemSummary } from 'organisms'
/**
 * ギフト取得用フック
 */
function useProduct() {
  const search = useLocation().search
  const [zeftCard, setZeftCard] = useState<ZeftCard>({
    ProductIDList: [],
    Expires: '',
    Status: 'VALID_AND_NOT_RECEIVED',
    Message: '',
    To: '',
    From: '',
    SelectedFinally: '',
  })
  const [giftToken, setGiftToken] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(true)
  const [fetchProducts, { data }] = useLazyQuery<{
    productDetailCollection: { items: Array<ProductType>; total: number }
  }>(QUERY_GET_PRODUCTS_BY_IDS)
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
    const params = new URLSearchParams(search)
    const preToken = localStorage.getItem('giftToken')
    const token = params.get('token')
    const preview = params.get('preview')

    if (token !== null) {
      localStorage.setItem('giftToken', token)
      setGiftToken(token)
      setIsPreview(preview === 'true')
      fetchCard(token)
    }

    if (preToken !== null) {
      setGiftToken(preToken)
      setIsPreview(preview === 'true')
      fetchCard(preToken)
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
      isPreview,
    }
  }
}

function useItemVariation(product: ProductType | undefined): {
  variants: {
    title: string
    patterns: {
      title: string
      image: string | null
      isActive: boolean
      onClick: () => void
    }[]
  }[]
  selectedVariants: {
    variant: string
    selectedOption: string
  }[]
} {
  const variants = !!product ? product.variantsCollection.items : []
  const [selectedVariants, setSelectedVariants] = useState(
    variants.map((variant) => ({
      variant: variant.title,
      selectedOption: '',
    }))
  )

  useEffect(() => {
    setSelectedVariants(
      variants.map((variant) => ({
        variant: variant.title,
        selectedOption: '',
      }))
    )
  }, [JSON.stringify(variants)])

  const variantsWithHandler = variants.map((variant) => ({
    title: variant.title,
    patterns: variant.patternsCollection.items.map((pattern) => ({
      title: pattern.title,
      image: !!pattern.imageCloudinary ? pattern.imageCloudinary[0].secure_url : null,
      isActive:
        selectedVariants.find((v) => v.variant === variant.title)?.selectedOption ===
        pattern.title,
      onClick: () =>
        setSelectedVariants([
          ...selectedVariants.filter((v) => v.variant !== variant.title),
          { variant: variant.title, selectedOption: pattern.title },
        ]),
    })),
  }))

  return {
    variants: variantsWithHandler,
    selectedVariants,
  }
}

/**
 * 貰い手情報確定フック
 */
function useSendRecierverInfo() {
  const navigate = useNavigate()

  const sendRecieverInfo = async (
    name?: string,
    postalCode?: string,
    address?: string,
    email?: string,
    phoneNumber?: string,
    token?: string,
    selectedFinally?: string,
    productName?: string,
    isNewsletter?: boolean,
    selectedFinallyVariant?: string
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
        selectedFinallyVariant,
      }),
    })
    const result = await res.json()
    if (result.Success) {
      //push event to data layer
      dataLayerPush({ event: 'receiver address completed' })
      dataLayerPush({
        event: 'shipping info submitted',
        giftRecieved: selectedFinally as string,
        prefectureSent: address?.split(' ')[0] as string, // address is separated by space,
      })
      navigate(`/gift/thank`)
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
  const navigate = useNavigate()
  const { isTokenValid, giftToken, zeftCard, products, isPreview } = useProduct()

  const [recieverInfo, setRecieverInfo] = useForm<FormKey>(formKeys)
  const [isNewsletter, setIsNewsletter] = useState<boolean>(true)
  const [previewData, setPreviewData] = useState<PreviewDataType>({
    itemsInCart: [],
    message: '',
    to: '',
    from: '',
  })

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
    if (!!products && products[num].variantsCollection.items.length !== 0) {
      navigate(`/gift/variation`)
    } else {
      navigate(`/gift/address`)
    }
  }

  const productSelected = !!products ? products[selected] : undefined
  const { variants, selectedVariants } = useItemVariation(productSelected)

  const sendRecieverInfo = withClickStopSideEffect(() => {
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
      isNewsletter,
      selectedVariants.map((v) => `${v.variant}は${v.selectedOption}`).join(', ')
    )
  })

  useEffect(() => {
    if (localStorage.previewData) {
      const tempdata = JSON.parse(localStorage.previewData)
      setPreviewData(tempdata)
    }
  }, [])

  return (
    <Routes>
      <Route
        path={`thank`}
        element={
          <React.Fragment>
            <Head title="受取手続き完了｜ZEFT ゼフト"></Head>
            <ReThank />
          </React.Fragment>
        }
      />
      <Route
        path={`address`}
        element={
          <React.Fragment>
            <Head title="お届け先入力｜ZEFT ゼフト"></Head>
            <AddressForm
              recieverName={recieverInfo.name === undefined ? '' : recieverInfo.name}
              onChangeRecieverName={(event) =>
                setRecieverInfo('name', event.target.value)
              }
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
              onChangeAddress1={(event) =>
                setRecieverInfo('address1', event.target.value)
              }
              address2={recieverInfo.address2 === undefined ? '' : recieverInfo.address2}
              onChangeAddress2={(event) =>
                setRecieverInfo('address2', event.target.value)
              }
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
              isPreview={isPreview}
            >
              {!!products && (
                <ItemSummary
                  img={products[selected].productImageCloudinary[0].secure_url}
                  itemName={products[selected].title}
                  brand={products[selected].brand.brandName}
                  isNoshi={true} // do not show noshi chip at reciever's page
                  variants={selectedVariants}
                />
              )}
            </AddressForm>
          </React.Fragment>
        }
      />
      <Route
        path={`confirm`}
        element={
          <React.Fragment>
            <Head title="お届け先入力｜ZEFT ゼフト"></Head>
            <AddressConfirm
              recieverName={recieverInfo.name === undefined ? '' : recieverInfo.name}
              email={recieverInfo.email === undefined ? '' : recieverInfo.email}
              postalCode={
                recieverInfo.postalCode === undefined ? '' : recieverInfo.postalCode
              }
              prefecture={
                recieverInfo.prefecture === undefined ? '' : recieverInfo.prefecture
              }
              address1={recieverInfo.address1 === undefined ? '' : recieverInfo.address1}
              address2={recieverInfo.address2 === undefined ? '' : recieverInfo.address2}
              phoneNumber={
                recieverInfo.phoneNumber === undefined ? '' : recieverInfo.phoneNumber
              }
              onClickNextButton={sendRecieverInfo}
              isPreview={isPreview}
            >
              {!!products && (
                <ItemSummary
                  img={products[selected].productImageCloudinary[0].secure_url}
                  itemName={products[selected].title}
                  brand={products[selected].brand.brandName}
                  isNoshi={true} // do not show noshi chip at reciever's page
                  variants={selectedVariants}
                />
              )}
            </AddressConfirm>
          </React.Fragment>
        }
      />
      <Route
        path={`card/*`}
        element={
          <React.Fragment>
            <ShowProduct
              message={zeftCard.Message}
              products={!!products ? products : []}
              handleChosen={handleChosen}
              expires={zeftCard !== null ? getJapaneseDate(zeftCard.Expires) : ' - '}
              expiresDate={zeftCard.Expires}
              selected={
                zeftCard.Status === 'VALID_AND_RECEIVED' ||
                zeftCard.Status === 'EXPIRED_AND_RECEIVED'
              }
              isPreview={isPreview}
            />
          </React.Fragment>
        }
      />
      <Route
        path={`preview/*`}
        element={
          <PreviewGift
            itemsInCart={previewData ? previewData.itemsInCart : []}
            sendRecieverInfo={previewData ? previewData.to : ''}
            senderSenderInfo={previewData ? previewData.from : ''}
            giftMessage={previewData ? previewData.message : ''}
          />
        }
      />
      <Route path={`variation`} element={<ChooseVariation variants={variants} />} />
      <Route
        index
        element={
          isTokenValid ? (
            <>
              <Head title="ZEFT ゼフト｜ギフトが届きました"></Head>
              <Recieved
                handleClick={() => navigate(`/gift/card`)}
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
          )
        }
      />
    </Routes>
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
