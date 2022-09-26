export const GIFT_SCENE_LIST = [
  'すべてのギフト',
  '出産祝い',
  '出産内祝い',
  '結婚祝い',
  '結婚内祝い',
  '誕生日',
  'お礼',
]

// convert array to union
export type GiftScene = typeof GIFT_SCENE_LIST[number]

export type FormAction =
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

export const SearchConfig: {
  [key: string]: { itemSortKey: string }
} = {
  すべてのギフト: {
    itemSortKey: 'orderAllIwai',
  },
  出産祝い: {
    itemSortKey: 'orderSyussanIwai',
  },
  出産内祝い: {
    itemSortKey: 'orderSyussanUchiIwai',
  },
  結婚祝い: {
    itemSortKey: 'orderKekkonIwai',
  },
  結婚内祝い: {
    itemSortKey: 'orderKekkonUchiIwai',
  },
  誕生日: {
    itemSortKey: 'orderTanjobi',
  },
  お礼: {
    itemSortKey: 'orderOrei',
  },
}
