import React, { useState, useEffect } from 'react'

import { Route, Switch, useRouteMatch, useHistory, useLocation } from 'react-router-dom'

import { Top } from 'pages/SPA/top/Top'
import { Quiz } from 'pages/SPA/quiz/Quiz'
import ChooseGift from 'pages/SPA/choose/ChooseGift'
import { GiftBox } from 'pages/SPA/choose/GiftBox'
/* import { GiftConfirm } from '../pages/SPA/choose/Confirm'; */
/* import { MessageForm } from '../pages/SPA/choose/Message'; */
import { RegisterGift } from 'pages/SPA/checkout/RegisterGift'
import { Thank } from 'pages/SPA/checkout/Thank'
import { ReThank } from 'pages/SPA/reciever/checkout/ReThank'
import { RecomendLoading } from 'pages/SPA/quiz/RecomendLoading'
import { useForm } from 'utilities/useForm'
import { WAIT_TIME_FADE_IN, WAIT_TIME_FADE_OUT } from 'constants/index'
import { useSurvey } from 'container/hooks/sender/useSurvey'
import { useRecommendProducts } from 'container/hooks/sender/useRecommendProducts'
import { Product } from 'constants/index'
import { Head } from 'utilities/Head'

/**
 * Main Container
 */
const ProductContainer: React.FC = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const location = useLocation()
  const { page, quizList, answeredQuizIds, loading } = useSurvey()
  const currentQuiz = quizList[page - 1]

  const { products, productsInCart, searchForm, scenesInCart } = useRecommendProducts(
    answeredQuizIds
  )

  const [message, setMessage] = useState('')
  const [isNewsletter, setIsNewsletter] = useState<boolean>(true)
  const [senderInfo, sendSenderInfo] = useForm([
    'name',
    'email',
    'phone',
    'recipientName',
  ])
  const [expire, setExpire] = useState('')

  /* const giftsDetail = { */
  /*   gifts: selectedItems.map((item) => getGiftDetail(products, item)), */
  /*   prices: */
  /*     //全商品同一価格なので一つ目の要素から取得 */
  /*     selectedItems.length !== 0 */
  /*       ? getPricesForChooseGiftConfirm( */
  /*           products.find((item) => item.sys.id === selectedItems[0])?.price as number, */
  /*           products.find((item) => item.sys.id === selectedItems[0])?.tax as number */
  /*         ) */
  /*       : [{ col1: '', col2: '' }], */
  /* } */

  const selectedItems: Array<string> = productsInCart.map((product) => product.sys.id)

  // リロード対策
  useEffect(() => {
    // 決済完了ページではそのまま
    if (location.pathname === '/product/success') {
      return
    }
    if (!('1' in answeredQuizIds) && location.pathname !== `${match.path}/top`) {
      if (location.pathname.includes(`${match.path}/quiz/`)) {
        history.push(`${match.path}/quiz/1`)
      } else if (window.location.hash.indexOf('access_token') < 0) {
        history.push(`${match.path}/choose/`)
      }
    }
  }, [])

  if ((loading || quizList === []) && page === 1) {
    return <p style={{ paddingTop: '6rem', textAlign: 'center' }}>Loading...</p>
  }

  return (
    <Switch>
      <Route exact path={`${match.path}/top`}>
        <Head title="質問のご案内｜ZEFT ゼフト"></Head>
        <Top />
      </Route>
      <Route path={`${match.path}/loading`}>
        <Head title="ロード中｜ZEFT ゼフト"></Head>
        <RecomendLoading />
      </Route>
      <Route path={`${match.path}/quiz/:number`}>
        <Head title="質問｜ZEFT ゼフト"></Head>
        {loading || currentQuiz === undefined ? undefined : (
          <Quiz
            quizType={currentQuiz.visualization}
            content={currentQuiz.title}
            linkToAnswers={currentQuiz.linkToAnswers} // NOTICE: 一時的に４選択肢までに制限
            page={page}
            tip={currentQuiz.tip}
          />
        )}
      </Route>
      <Route path={`${match.path}/choose`}>
        <ChooseGift
          items={products}
          itemsInCart={productsInCart}
          selectedItemId={
            selectedItems.length >= 1 ? selectedItems[selectedItems.length - 1] : null
          }
          searchForm={searchForm}
        />
      </Route>
      <Route path={`${match.path}/giftbox`}>
        <GiftBox
          items={productsInCart}
          handleChooseClick={() => {
            history.push(`${match.path}/choose`)
          }}
          handleConversionClick={() => {
            history.push(`${match.path}/checkout`)
          }}
        />
      </Route>
      {/* <Route path={`${match.path}/waygift`}> */}
      {/*   <WayGiftTemplate */}
      {/*     handleSNSClick={() => { */}
      {/*       sendByURL(); */}
      {/*       history.push('/product/message'); */}
      {/*     }} */}
      {/*     handleCardClick={() => { */}
      {/*       sendByCard(); */}
      {/*       history.push('/product/message'); */}
      {/*     }} */}
      {/*     handleDirectSendClick={() => { */}
      {/*       sendByDirect(); */}
      {/*       history.push('/product/checkout'); */}
      {/*     }} */}
      {/*   /> */}
      {/* </Route> */}
      {/* <Route path={`${match.path}/message`}> */}
      {/*   <Head title="メッセージ入力｜ZEFT ゼフト"></Head> */}
      {/*   <MessageForm */}
      {/*     // {...giftDetail} */}
      {/*     handleNextButtonClicked={() => history.push(`${match.path}/checkout`)} */}
      {/*     message={message} */}
      {/*     setMessage={setMessage} */}
      {/*   /> */}
      {/* </Route> */}
      {/* <Route path={`${match.path}/chooseconfirm`}> */}
      {/*   <Head title="ギフト確認｜ZEFT ゼフト"></Head> */}
      {/*   <GiftConfirm */}
      {/*     {...giftsDetail} */}
      {/*     handleNoLoginAndBuy={() => { */}
      {/*       sendByURL(); */}
      {/*       history.push('/product/message'); */}
      {/*     }} */}
      {/*   /> */}
      {/* </Route> */}
      <Route path={`${match.path}/checkout`}>
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
            onChangeRecipientName: (e) => sendSenderInfo('recipientName', e.target.value),
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
      </Route>
      <Route path={`${match.path}/success`}>
        <Head title="購入完了｜ZEFT ゼフト"></Head>
        <Thank expire={expire} />
      </Route>
      <Route exact path={`${match.path}/thank`}>
        <ReThank />
      </Route>
    </Switch>
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
