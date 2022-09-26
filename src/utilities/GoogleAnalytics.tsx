import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * windowsオブジェクトにdataLayerインターフェースを追加
 * for dataLayer used in google tag manager
 */
declare global {
  interface Window {
    dataLayer: Array<unknown>
  }
}

/*
 * datalayerに贈るイベントを抽象化した型
 * any型は抽象度が高すぎたので不可
 */
/* type SomeEvent = { */
/*   event: string */
/* } */

type DataLayerItem =
  /* | SomeEvent */
  | QuizAnswer
  | Purchase
  | LinkCreated
  | RecieverAddressCompleted
  | GiftAdded
  | ShippingInfoSubmitted
  | PageView
  | TooltipViewed
  | SnsOpened
  | LinkCopied
  | CreateLinkInfoSubmitted

const dataLayerPush = function (data: DataLayerItem): void {
  // Show event when in development environments
  if (process.env.REACT_APP_ENV !== 'production') {
    console.log('Debug event data ' + JSON.stringify(data, null, 2))
  }
  window.dataLayer.push(data)
}

/*
 * クイズ回答時に送信するデータ
 * 独自イベント
 */
type QuizAnswer = {
  event: 'onClickAnswerButton'
  quiz: {
    id: string | undefined
    name: string | undefined
  }
  answer: {
    id: string
    name: string
  }
}

/*
 * 決済完了時に送信するデータ
 * google analytics 4 推奨イベント.
 * https://developers.google.com/gtagjs/reference/ga4-events#purchase
 * それプラス、ギフト候補として選択された商品IDをselectedに設定.
 */

type Purchase = {
  event: 'onPurchaseSucceeded'
  purchaseParam: {
    currency: 'JPY'
    transaction_id: string
    value: number
    coupon?: string
    items: {
      item_id: string
      item_name: string
    }[]
    selected: string[] // 推奨パラメータでないがカスタマイズとして設定
    how_many_selected: number
  }
}

type RecieverAddressCompleted = {
  event: 'receiver address completed'
}

type LinkCreated = {
  event: 'link created'
  cardToken: string
}

type GiftAdded = {
  event: 'gift added'
  giftId: string
  giftName: string
  giftPrice: number
  sceneOfGiftSelected: string
}

type ShippingInfoSubmitted = {
  event: 'shipping info submitted'
  giftRecieved: string
  prefectureSent: string
}

type PageView = {
  event: 'page view'
  path: string
}

type TooltipViewed = {
  event: 'tooltip viewed'
  step: number
}

type SnsOpened = {
  event: 'sns opened'
  snsType: string
}

type LinkCopied = {
  event: 'link copied'
}

type CreateLinkInfoSubmitted = {
  event: 'create link info submitted'
  totalPriceRange: string
  numberOfGifts: number
  sceneSelected: string
  noshiApplied: boolean
  noshiTypeSelected: number
}

export function usePageViews() {
  const { pathname } = useLocation()
  useEffect(() => {
    dataLayerPush({
      event: 'page view',
      path: pathname,
    })
  }, [pathname])
}

export { dataLayerPush }
