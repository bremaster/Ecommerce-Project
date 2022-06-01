/**
 * windowsオブジェクトにdataLayerインターフェースを追加
 * for dataLayer used in google tag manager
 */
declare global {
  interface Window {
    dataLayer: Array<unknown>
  }
}

const dataLayerPush = function (data: DataLayerItem): void {
  window.dataLayer.push(data)
}

type DataLayerItem = QuizAnswer | Purchase

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

export { dataLayerPush }
