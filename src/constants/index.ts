import { GiftScene } from './searchForm'

export type ZeftCard = {
  Expires: string
  Message: string
  ProductIDList: Array<string>
  Status:
    | 'VALID_AND_RECEIVED'
    | 'VALID_AND_NOT_RECEIVED'
    | 'EXPIRED_AND_RECEIVED'
    | 'EXPIRED_AND_NOT_RECEIVED'
  SelectedFinally: string
  To: string
  From: string
}

export type PreviewData = {
  to: string
  from: string
  message: string
  itemsInCart: Array<Product>
}

export type PaymentIntentResponse = {
  success: boolean
  clientSecret: string
  productId: string
  productPrice: number
  shippingFee: number
}

export type PaymentIntentResponseError = {
  success: boolean
  detail: string
}

// TODO Brand, Tag など、コンテントフルのModel単位で定数分けた方が、organismなど他のコンポーネントでも使いまわせる？
// ContentfulのModel->reactのUIコンポーネントが完全に一対一になり、
// react側では関数的にContentfulのデータをUIに変換しているだけになったら対応する
export type Product = {
  sys: {
    id: string
  }
  title: string
  tagsCollection: {
    items: {
      name: string
    }[]
  }
  productDescriptionSectionsCollection?: {
    items: {
      header?: string
      image?: {
        secure_url: string
      }[]
      imageCaption?: string
      body?: string
    }[]
  }
  keyMessage: string
  price: number
  tax: number
  productPrice: number
  shippingFee: {
    minFee: number
    maxFee: number
    hokkaidoFee: number
    okinawaFee: number
    undeliverable: Array<string> | null
  }
  productIntroduction: string
  productImageCloudinary: {
    secure_url: string
  }[]
  brand: {
    brandName: string
    brandImageCloudinary: { secure_url: string }[]
  }
  brandDescriptionCollection: {
    items: {
      title: string
      body: string
    }[]
  }
  tableCollection: {
    items: {
      column1: string
      column2: string
    }[]
  }
  variantsCollection: {
    items: {
      title: string
      patternsCollection: {
        items: {
          title: string
          imageCloudinary: null | Array<{
            secure_url: string
          }>
        }[]
      }
    }[]
  }
  scenes: string[]
  keywords: string[]
  noshi: boolean
  stockOk: undefined | boolean // if undefined, stock fetching is on going
}

export type ProductWithHandlerAndStatus = Product & {
  selectableStatus: SelectStatus
  handleClick: () => void
}

export type Quiz = {
  sys: {
    id: string
  }
  title: string
  visualization: string | null
  tip: string | null
  answersCollection: {
    items: Array<Answer> | null
    total: number
  }
  linkToAnswers?: Array<AnswerWithHandler>
}

export type Answer = {
  imageUrl: string | null
  title: string
  description: string | null
  sys: {
    id: string
  }
  nextQuiz: {
    sys: {
      id: string
    }
  } | null
}
export type AnswerWithHandler = Answer & { handleClick: () => void }

export const formKeys = [
  'name',
  'email',
  'postalCode',
  'prefecture',
  'address2',
  'address1',
  'phoneNumber',
] as const

export type FormKey = typeof formKeys[number]

export type WayGiftType = 'URLONLY' | 'REALCARD' | 'DIRECT'
export type WayRecipientType = 'UNKNOWN' | 'SENDER' | 'OTHERS'
export type SelectStatus = 'SELECTABLE' | 'UNSELECTABLE' | 'SELECTED'

export const WAIT_TIME_FADE_IN = 600
export const WAIT_TIME_FADE_OUT = 300
export const MAX_SELECTABLE_ITEMS = 3

export const PRICING_QUIZ_ID = '2K8a9KhX3glSlYAZKJtv2w'

export const IS_BUSSY_SEASON = false

export const GUIDE_ITEM_LIST = [
  {
    title: '/assets/product_guide/step-1.svg',
    image: '/assets/product_guide/image-1.svg',
    text1: 'ギフトを3つまで',
    text2: '選ぶことができます。',
  },
  {
    title: '/assets/product_guide/step-2.svg',
    image: '/assets/product_guide/image-2.svg',
    text1: '選んだギフト一覧の',
    text2: 'リンクを伝えます。',
  },
  {
    title: '/assets/product_guide/step-3.svg',
    image: '/assets/product_guide/image-3.svg',
    text1: '相手はギフトを一つ',
    text2: '選んで受け取ります。',
  },
  {
    title: '/assets/product_guide/step-4.svg',
    image: '/assets/product_guide/image-4.svg',
    text1: 'ギフトに応じて',
    text2: '後払い決済をします。',
  },
]

export const SCENE_CONFIG_LIST: Array<{
  id: string
  title: GiftScene
  iconBlackWhite: string
  iconColored: string
  metaTag: { title: string; description: string }
}> = [
  {
    title: 'すべてのギフト',
    iconBlackWhite: '/gift_icon/icon1.svg',
    iconColored: '/gift_icon/sicon1.svg',
    id: 'subeteNoGift',
    metaTag: {
      title: 'おすすめギフト一覧｜ZEFT ゼフト',
      description:
        'ギフトの一覧です。ZEFT（ゼフト）は選んだ3つの中から相手が選べるソーシャルギフトサービスです。出産祝いののしにも対応しています。',
    },
  },
  {
    title: '誕生日',
    iconBlackWhite: '/gift_icon/cake-black.png',
    iconColored: '/gift_icon/cake-color.png',
    id: 'tanjobi',
    metaTag: {
      title: 'おすすめ誕生日ギフト一覧｜ZEFT ゼフト',
      description:
        'おしゃれでおすすめの誕生日で贈るギフトの一覧です。ZEFT（ゼフト）は選んだ3つの中から相手が選べるソーシャルギフトサービスです。',
    },
  },
  {
    title: 'お礼',
    iconBlackWhite: '/gift_icon/thank-black.png',
    iconColored: '/gift_icon/thank-color.png',
    id: 'orei',
    metaTag: {
      title: 'おすすめお礼ギフト一覧｜ZEFT ゼフト',
      description:
        'おしゃれでおすすめのお礼で贈るギフトの一覧です。ZEFT（ゼフト）は選んだ3つの中から相手が選べるソーシャルギフトサービスです。',
    },
  },
  {
    title: '結婚祝い',
    iconBlackWhite: '/gift_icon/icon2.png',
    iconColored: '/gift_icon/sicon2.png',
    id: 'kekkonIwai',
    metaTag: {
      title: 'おすすめ結婚祝いギフト一覧｜ZEFT ゼフト',
      description:
        'おしゃれでおすすめの結婚祝いで贈るギフトの一覧です。ZEFT（ゼフト）は選んだ3つの中から相手が選べるソーシャルギフトサービスです。結婚祝いののしにも対応しています。',
    },
  },
  {
    title: '出産祝い',
    iconBlackWhite: '/gift_icon/icon3.svg',
    iconColored: '/gift_icon/sicon3.svg',
    id: 'syussannIwai',
    metaTag: {
      title: 'おすすめ出産祝いギフト一覧｜ZEFT ゼフト',
      description:
        'おしゃれでおすすめの出産祝いで贈るギフトの一覧です。ZEFT（ゼフト）は選んだ3つの中から相手が選べるソーシャルギフトサービスです。出産祝いののしにも対応しています。',
    },
  },
  {
    title: '結婚内祝い',
    iconBlackWhite: '/gift_icon/icon4.svg',
    iconColored: '/gift_icon/sicon4.svg',
    id: 'kekkonUchiIwai',
    metaTag: {
      title: 'おすすめ結婚内祝いギフト一覧｜ZEFT ゼフト',
      description:
        'おしゃれでおすすめの結婚内祝いで贈るギフトの一覧です。ZEFT（ゼフト）は選んだ3つの中から相手が選べるソーシャルギフトサービスです。結婚内祝いののしにも対応しています。',
    },
  },
  {
    title: '出産内祝い',
    iconBlackWhite: '/gift_icon/icon5.svg',
    iconColored: '/gift_icon/sicon5.svg',
    id: 'syussannUchiIwai',
    metaTag: {
      title: 'おすすめ出産内祝いギフト一覧｜ZEFT ゼフト',
      description:
        'おしゃれでおすすめの出産内祝いで贈るギフトの一覧です。ZEFT（ゼフト）は選んだ3つの中から相手が選べるソーシャルギフトサービスです。出産内祝いののしにも対応しています。',
    },
  },
]
