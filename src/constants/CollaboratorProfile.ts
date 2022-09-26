const COLLABORATOR_IDS = ['nocollab', 'ploomx01']

type CollaboratorIndex = typeof COLLABORATOR_IDS[number] // like `nocollab | ploomx01`
type Collaborators = Record<CollaboratorIndex, Collaborator>

type Collaborator = {
  /* zeftとコラボするアプリのID */
  id: CollaboratorIndex
  /* zeftとコラボするアプリの名称 */
  name: string
  /* クーポンでの決済のみか否か */
  shouldPayBuyCoupon: boolean
  /* 各ページ固有の設定 */
  pageSettings: Record<string, PageSetting>
  /* このコラボするアプリ特有のクイズの設定 */
  quizSetting: QuizSetting
}

type PageSetting = {
  componentSettings: Record<string, ComponentSetting>
}

type ComponentSetting = {
  innerText?: string
  isShown?: boolean
}

type QuizSetting = {
  firstQuiz: string
  defaultAnswers: string[]
  shouldSkipPricingQuiz: boolean
}

const COLLABORATOR_PROFILE: Collaborators = {
  nocollab: {
    id: 'nocollab',
    name: 'デフォルト',
    shouldPayBuyCoupon: false,
    pageSettings: {
      senderCheckout: {
        componentSettings: {
          couponInput: {
            innerText: '',
            isShown: false,
          },
        },
      },
      recieverTop: {
        componentSettings: {
          mainMessage: {
            innerText: 'ギフトが届きました',
          },
          subMessage: {
            innerText: 'A GIFT FOR YOU',
          },
        },
      },
      recieverShowCard: {
        componentSettings: {
          mainMessageWhenSingleGift: {
            innerText: 'ギフトが届きました。',
          },
          mainMessageWhenMultiGifts: {
            innerText: 'ギフトを開封しました',
          },
          subMessageWhenMultiGifts: {
            innerText: '{0}つのうち1つを選んで受取り手続きに進んでください。',
          },
        },
      },
    },
    quizSetting: {
      firstQuiz: '4zA6Xeu1LGdulNb1eW8IRx',
      defaultAnswers: [],
      shouldSkipPricingQuiz: false,
    },
  },
  ploomx01: {
    id: 'ploomx01',
    name: 'プルームX',
    shouldPayBuyCoupon: true,
    pageSettings: {
      senderCheckout: {
        componentSettings: {
          couponInput: {
            innerText: 'Ploom X CLUBクーポンコード',
            isShown: true,
          },
        },
      },
      recieverTop: {
        componentSettings: {
          mainMessage: {
            innerText: 'Ploom X CLUB会員特典ギフトが届きました',
          },
          subMessage: {
            innerText: 'A GIFT FOR YOU',
          },
        },
      },
      recieverShowCard: {
        componentSettings: {
          mainMessageWhenSingleGift: {
            innerText: 'Ploom X CLUB 会員様より会員特典のギフトが届きました。',
          },
          mainMessageWhenMultiGifts: {
            innerText: 'Ploom X CLUB 会員様より会員特典のギフトが届きました。',
          },
          subMessageWhenMultiGifts: {
            innerText: '{0}つのうち1つを選んで受取り手続きに進んでください。',
          },
        },
      },
    },
    quizSetting: {
      firstQuiz: '3qxFCUvEIObbRGChueybEE',
      defaultAnswers: ['94qPzO331Mxo9sBonqXXo', 'ploomx1111111111111111'], // 価格帯およびploomxかどうかの回答
      shouldSkipPricingQuiz: true,
    },
  },
}

export type { Collaborator, CollaboratorIndex }
export { COLLABORATOR_PROFILE, COLLABORATOR_IDS }
