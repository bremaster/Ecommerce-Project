export const GIFT_SCENE_LIST = [
  'すべてのギフト',
  '出産祝い',
  '出産内祝い',
  '結婚祝い',
  '結婚内祝い',
]

// convert array to union
export type GiftScene = typeof GIFT_SCENE_LIST[number]

export type FormAction =
  | {
      type: 'changeScene'
      payload: GiftScene
    }
  | {
      type: 'changeKeywords'
      payloads: string[]
    }
  | {
      type: 'changeMinPrice'
      payload: number | null
    }
  | {
      type: 'changeMaxPrice'
      payload: number | null
    }
  | {
      type: 'changePage'
      payload: number
    }
  | {
      type: 'replaceKeywordsOptions'
      payloads: Array<string>
    }
  | {
      type: 'replacePriceOptions'
      payloads: Array<number>
    }
  | {
      type: 'setMaxPage'
      payload: number
    }

export type FormState = {
  scene: {
    value: GiftScene
    options: Array<GiftScene>
  }
  minPrice: {
    value: number | null
    options: Array<number>
  }
  maxPrice: {
    value: number | null
    options: Array<number>
  }
  keywords: {
    values: Array<string>
    options: Array<string>
  }
  page: {
    current: number
    max: number
  }
  defaultPriceOptions: Array<number>
}

export type FormStateWithSetter = FormState & {
  scene: {
    setValue: (value: FormState['scene']['value']) => void
  }
  keywords: {
    setValues: (values: FormState['keywords']['values']) => void
  }
  minPrice: {
    setValue: (value: FormState['minPrice']['value']) => void
  }
  maxPrice: {
    setValue: (value: FormState['maxPrice']['value']) => void
  }
  page: {
    setValue: (value: FormState['page']['current']) => void
  }
}

export const INITIAL_FORM_STATE = {
  scene: {
    value: 'すべてのギフト',
    options: GIFT_SCENE_LIST,
  },
  keywords: {
    values: [],
    options: [],
  },
  minPrice: {
    value: null,
    options: [],
  },
  maxPrice: {
    value: null,
    options: [],
  },
  defaultPriceOptions: [],
  page: {
    current: 1,
    max: 1,
  },
}

export const MAX_PRICE = 15000 as const
export const MIN_PRICE = 1000 as const
