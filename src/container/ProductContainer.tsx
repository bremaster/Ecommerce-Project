import React, { useState, useEffect } from 'react'

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { Top } from 'pages/SPA/top/Top'
import { ShowGift } from 'pages/SPA/choose/ShowGift'
import { PreSearch } from 'pages/SPA/choose/PreSearch'
import { GiftBox } from 'pages/SPA/choose/GiftBox'
import { GiftList } from 'pages/SPA/choose/GiftList'

import { Brand } from 'pages/SPA/choose/Brand'
import { BrandDetail } from 'pages/SPA/choose/BrandDetail'

import { GiftDetailContainer } from './GiftDetailContainer'
import { RegisterGift } from 'pages/SPA/checkout/RegisterGift'
import { Thank } from 'pages/SPA/checkout/Thank'
import { ReThank } from 'pages/SPA/reciever/checkout/ReThank'
import { RecomendLoading } from 'pages/SPA/quiz/RecomendLoading'
import { useForm } from 'utilities/useForm'
import { WAIT_TIME_FADE_IN, WAIT_TIME_FADE_OUT } from 'constants/index'
import { useRecommendProducts } from 'container/hooks/sender/useRecommendProducts'
import { useChooseGift } from 'container/hooks/sender/useChooseGift'
import { useCheckIfSceneIsSelectedOnLP } from 'container/hooks/sender/useCheckIfSceneIsSelectedOnLP'
import { Product, SCENE_CONFIG_LIST } from 'constants/index'
import { Head } from 'utilities/Head'

const itemListPagePaths = SCENE_CONFIG_LIST.map((scene) => '/product/choose/' + scene.id)

const itemOnboardingPagePaths = SCENE_CONFIG_LIST.map(
  (scene) => '/product/onboarding/' + scene.id
)

/**
 * Main Container
 */
const ProductContainer: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const {
    products,
    productsInCart,
    searchForm,
    scenesInCart,
    giftScene,
    addOnSelectedHandler,
    totalItems,
  } = useRecommendProducts()

  const [message, setMessage] = useState('')
  const [isNewsletter, setIsNewsletter] = useState<boolean>(true)
  const [senderInfo, sendSenderInfo] = useForm([
    'name',
    'email',
    'phone',
    'recipientName',
  ])
  const [expire, setExpire] = useState('')

  const selectedItems: Array<string> = productsInCart.map((product) => product.sys.id)

  const { tappedItem, itemsWithHandlerAndStock } = useChooseGift(products)

  // リロード対策
  useEffect(() => {
    // 一覧ページ、決済完了ページ、ギフトボックスページではそのまま
    const DIRECT_ACCESSABLE_PATHES = [
      '/product/choose',
      ...itemListPagePaths,
      '/product/onboarding',
      ...itemOnboardingPagePaths,
      '/product/success',
      '/product/giftbox',
      '/product/brand',
    ]

    if (
      DIRECT_ACCESSABLE_PATHES.includes(pathname) ||
      pathname.startsWith('/product/detail/') ||
      pathname.startsWith('/product/brand/')
    ) {
      return
    }

    if (window.location.hash.indexOf('access_token') < 0) {
      navigate(`/product/choose`)
    }
  }, [])

  const isSceneSelectedOnLP = useCheckIfSceneIsSelectedOnLP(giftScene)

  return (
    <>
      <Routes>
        <Route
          path={`top`}
          element={
            <React.Fragment>
              <Head title="質問のご案内｜ZEFT ゼフト"></Head>
              <Top />
            </React.Fragment>
          }
        />
        <Route
          path={`loading`}
          element={
            <React.Fragment>
              <Head title="ロード中｜ZEFT ゼフト"></Head>
              <RecomendLoading />
            </React.Fragment>
          }
        />
        <Route
          path={`detail/:itemId`}
          element={
            <React.Fragment>
              <GiftDetailContainer
                item={tappedItem}
                howManyInCart={productsInCart.length}
                addOnSelectedHandler={addOnSelectedHandler}
              />
            </React.Fragment>
          }
        />
        <Route
          path={`choose`}
          element={
            <React.Fragment>
              <GiftList
                items={itemsWithHandlerAndStock}
                handleNextButtonClick={() => navigate(`/product/giftbox`)}
                howManyInCart={productsInCart.length}
                form={searchForm}
                totalItems={totalItems}
              />
            </React.Fragment>
          }
        />
        <Route
          path={`choose/:sceneid`}
          element={
            <React.Fragment>
              <GiftList
                items={itemsWithHandlerAndStock}
                handleNextButtonClick={() => navigate(`/product/giftbox`)}
                howManyInCart={productsInCart.length}
                form={searchForm}
                totalItems={totalItems}
              />
            </React.Fragment>
          }
        />
        <Route
          path={`onboarding/:sceneid`}
          element={
            <React.Fragment>
              <ShowGift items={productsInCart} />
            </React.Fragment>
          }
        />
        <Route
          path={`onboarding`}
          element={
            <React.Fragment>
              <ShowGift items={productsInCart} />
            </React.Fragment>
          }
        />
        <Route
          path={`presearch/*`}
          element={
            <React.Fragment>
              <PreSearch form={searchForm} skipScene={isSceneSelectedOnLP} />
            </React.Fragment>
          }
        />
        <Route
          path={`giftbox`}
          element={
            <React.Fragment>
              <Head></Head>
              <GiftBox
                items={productsInCart}
                handleChooseClick={() => {
                  const scene = SCENE_CONFIG_LIST.find(
                    (scene) => scene.title === giftScene
                  )
                  const sceneID = !!scene ? scene.id : 'subeteNoGift'
                  navigate(`/product/choose/${sceneID}`)
                }}
                handleConversionClick={() => {
                  navigate(`/product/checkout`)
                }}
              />
            </React.Fragment>
          }
        />

        {/* <Route path={`waygift`}> */}
        {/*   <WayGiftTemplate */}
        {/*     handleSNSClick={() => { */}
        {/*       sendByURL(); */}
        {/*       navigate('/product/message'); */}
        {/*     }} */}
        {/*     handleCardClick={() => { */}
        {/*       sendByCard(); */}
        {/*       navigate('/product/message'); */}
        {/*     }} */}
        {/*     handleDirectSendClick={() => { */}
        {/*       sendByDirect(); */}
        {/*       navigate('/product/checkout'); */}
        {/*     }} */}
        {/*   /> */}
        {/* </Route> */}
        {/* <Route path={`message`}> */}
        {/*   <Head title="メッセージ入力｜ZEFT ゼフト"></Head> */}
        {/*   <MessageForm */}
        {/*     // {...giftDetail} */}
        {/*     handleNextButtonClicked={() => navigate(`${pathname}/checkout`)} */}
        {/*     message={message} */}
        {/*     setMessage={setMessage} */}
        {/*   /> */}
        {/* </Route> */}
        {/* <Route path={`chooseconfirm`}> */}
        {/*   <Head title="ギフト確認｜ZEFT ゼフト"></Head> */}
        {/*   <GiftConfirm */}
        {/*     {...giftsDetail} */}
        {/*     handleNoLoginAndBuy={() => { */}
        {/*       sendByURL(); */}
        {/*       navigate('/product/message'); */}
        {/*     }} */}
        {/*   /> */}
        {/* </Route> */}
        <Route
          path={`checkout`}
          element={
            <React.Fragment>
              <Head title="お客様情報入力｜ZEFT ゼフト"></Head>
              <RegisterGift
                sender={{
                  name: senderInfo.name === undefined ? '' : senderInfo.name,
                  onChangeName: (e) => sendSenderInfo('name', e.target.value),
                  email: senderInfo.email === undefined ? '' : senderInfo.email,
                  onChangeEmail: (e) => sendSenderInfo('email', e.target.value),
                  phone: senderInfo.phone === undefined ? '' : senderInfo.phone,
                  onChangePhone: (e) =>
                    // ブラウザの履歴機能で電話番号入れる際に、- が入ることがあるようなので削除
                    sendSenderInfo('phone', e.target.value),
                  recipientName: senderInfo?.recipientName,
                  onChangeRecipientName: (e) =>
                    sendSenderInfo('recipientName', e.target.value),
                  message: message,
                  setMessage: setMessage,
                  isNewsletter: isNewsletter,
                  toggleNewsLetter: () => {
                    setIsNewsletter((prev) => !prev)
                  },
                  selectedItems: selectedItems,
                }}
                price={getPriceForPayment(products, selectedItems[0] || null) || 0}
                setExpire={setExpire}
                scenesInCart={scenesInCart}
                itemsInCart={productsInCart}
              />
            </React.Fragment>
          }
        />
        <Route
          path={`success`}
          element={
            <React.Fragment>
              <Head title="購入完了｜ZEFT ゼフト"></Head>
              <Thank expire={expire} />
            </React.Fragment>
          }
        />
        <Route
          path={`thank`}
          element={
            <React.Fragment>
              <ReThank />
            </React.Fragment>
          }
        />
        <Route
          path={`brand`}
          element={
            <React.Fragment>
              <Brand />
            </React.Fragment>
          }
        />
        <Route
          path={`brand/:brandId`}
          element={
            <React.Fragment>
              <BrandDetail />
            </React.Fragment>
          }
        />
      </Routes>
    </>
  )
}

/**
 * utilities
 */

/* function getBrandForChooseGiftConfirm( */
/*   items: Array<ProductWithHandlerAndStatus>, */
/*   itemId: string */
/* ) { */
/*   const chosen = items.find((item) => item.sys.id === itemId) */
/*   return chosen?.brand.brandName as string */
/* } */

/* function getClickHandlerForChooseGiftConfirm( */
/*   items: Array<ProductWithHandlerAndStatus>, */
/*   itemId: string */
/* ) { */
/*   const chosen = items.find((item) => item.sys.id === itemId) */
/*   return chosen */
/*     ? () => { */
/*         chosen.handleClick() */
/*       } */
/*     : () => { */
/*         return 'clicked' */
/*       } */
/* } */

/* function getNameForChooseGiftConfirm( */
/*   items: Array<ProductWithHandlerAndStatus>, */
/*   itemId: string */
/* ) { */
/*   const chosen = items.find((item) => item.sys.id === itemId) */
/*   return chosen?.title as string */
/* } */

/* function getImageForChooseGiftConfirm( */
/*   items: Array<ProductWithHandlerAndStatus>, */
/*   itemId: string */
/* ) { */
/*   const chosen = items.find((item) => item.sys.id === itemId) */
/*   return chosen?.productImageCloudinary[0].secure_url as string */
/* } */

/* function getPricesForChooseGiftConfirm(price: number, tax: number) { */
/*   price = price + tax // add tax */
/*   const totalPrice = price */
/*   let prices: Array<{ col1: string; col2: string }> = [ */
/*     //{ col1: "ギフト", col2: `¥${numberWithCommas(price)}円（税込）` }, */
/*     // { col1: 'ギフト', col2: `${numberWithCommas(price)}円（税込）` }, */
/*     // { col1: '送料', col2: '0円（税込）' }, */
/*   ] */
/*   prices = [ */
/*     ...prices, */
/*     { */
/*       col1: '合計金額（送料込み）', */
/*       //col2: `¥${numberWithCommas(totalPrice)}円（税込）`, */
/*       col2: `${numberWithCommas(totalPrice)}円（税込）`, */
/*       // isImportant: true,  // 太文字がだいぶ目立つのでいったん不要に */
/*     }, */
/*   ] */
/*   return prices */
/* } */

/* function numberWithCommas(x: number) { */
/*   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') */
/* } */

function getPriceForPayment(products: Product[], selectedItem: string | null) {
  if (selectedItem === null) {
    return null
  }
  let price = products.find((item) => item.sys.id === selectedItem)?.price as number
  const tax = products.find((item) => item.sys.id === selectedItem)?.tax as number
  price = price + tax // add tax
  return price
}

/* const getGiftDetail = ( */
/*   products: Array<ProductWithHandlerAndStatus>, */
/*   selectedItem: string */
/* ) => ({ */
/*   name: getNameForChooseGiftConfirm(products, selectedItem), */
/*   image: getImageForChooseGiftConfirm(products, selectedItem), */
/*   brand: getBrandForChooseGiftConfirm(products, selectedItem), */
/*   /1* handleClick: getClickHandlerForChooseGiftConfirm(products, selectedItem) *1/ */
/*   /1*   ? getClickHandlerForChooseGiftConfirm(products, selectedItem) *1/ */
/*   /1*   : () => { *1/ */
/*   /1*       return 'clicked'; *1/ */
/*   /1*     }, *1/ */
/* }) */

export { ProductContainer, WAIT_TIME_FADE_IN, WAIT_TIME_FADE_OUT }
