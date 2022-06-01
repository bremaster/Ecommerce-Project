export type ZeftCard = {
  Expires: string
  Message: string
  ProductIDList: Array<string>
  Status: string
  To: string
  From: string
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

export const LANDING_SERVICE_ITEM_LIST = [
  {
    image: '/landing/service/service1.svg',
    title: '受け取り側が選べる。 決済は後から',
    subtitle:
      '贈り手が多種多様なギフトの中から3つまで選び、お相手に受取リンクを贈ります。受け取った方はその中から自分が一番欲しいと思うギフトを選び、受け取ることが出来ます。',
  },
  {
    image: '/landing/service/service2.png',
    title: '住所がなくても贈れる',
    subtitle:
      '贈り手は発行されたリンクをLINEやメールなどで送り、受け取ったお相手が配送先住所を入力します。住所を知らないお相手にもサプライズで贈ることが出来ます。',
  },
  {
    image: '/landing/service/service3.png',
    title: '各ライフイベントの マナー等最適化',
    subtitle:
      '各ライフイベントページではマナー等に適した商品の選定やそのライフイベントに最適なのし紙（水引や表書きなど）を提案しています。迷いなくスムーズにギフトを贈ることが出来ます。',
  },
  {
    image: '/landing/service/service4.png',
    title: '気持ちが伝わる開封体験',
    subtitle:
      '届いたリンクを開くとギフト包装を開封する高揚感のある体験がデジタル上のアニメーションで再現されています。またメッセージも添えてお相手にギフトを贈ることが出来ます。',
  },
]

export const LANDING_USE_ITEM_LIST = [
  {
    image: '/landing/use/image1.png',
    title: 'ギフト一覧から選択',
  },
  {
    image: '/landing/use/image2.png',
    title: 'メール認証し、ギフトリンクを発行',
  },
  {
    image: '/landing/use/image3.png',
    title: 'メッセージとギフトを 受け取る',
  },
  {
    image: '/landing/use/image4.png',
    title: '選ばれたギフトに 応じて後から決済',
  },
]
