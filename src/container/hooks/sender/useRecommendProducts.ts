import { useState, useEffect, useReducer } from 'react'

import { useHistory, useLocation } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  QUERY_GET_PRODUCTS_BY_IDS,
  QUERY_GET_PRODUCTS_WITH_FILTER,
  QUERY_GET_PRICE_AND_KEYWORDS,
} from 'container/hooks/index'
import { MAX_SELECTABLE_ITEMS } from 'constants/index'
import {
  INITIAL_FORM_STATE,
  GiftScene,
  FormAction,
  FormState,
  FormStateWithSetter,
  MAX_PRICE,
  MIN_PRICE,
} from 'constants/searchForm'
import { Product, ProductWithHandlerAndStatus } from 'constants/index'
import { SelectStatus } from '../../../constants/index'
import { useCollaboratorProfile } from 'container/CollaboratorContainer'

import { orgCeil, orgFloor, range } from 'utilities/CommonFunctions'

const isPreview = process.env.REACT_APP_ENV === 'staging' ? true : false

const LAYOUT_BREAK_POINT = 1000

/**
 * 回答IDからリコメンド商品IDを取得し、商品詳細情報を取得
 */
export function useRecommendProducts(
  answers: { [key: number]: string } = {}
): {
  products: Array<ProductWithHandlerAndStatus>
  loading: boolean
  productsInCart: Array<ProductWithHandlerAndStatus>
  scenesInCart: Array<GiftScene>
  isDone: string
  searchForm: FormStateWithSetter
} {
  const history = useHistory()
  const location = useLocation()
  const { quizSetting } = useCollaboratorProfile()

  const [isDone, setIsDone] = useState('')
  const [fetchProductsByIds, { loading, data }] = useLazyQuery<{
    productDetailCollection: { items: Array<Product> }
  }>(QUERY_GET_PRODUCTS_BY_IDS)

  let productsSorted: Array<ProductWithHandlerAndStatus> = []

  // normal filter condition without recommend API
  const formStateInCache = sessionStorage.getItem('searchForm')
  const initialFormState: FormState = !!formStateInCache
    ? (JSON.parse(formStateInCache as string) as FormState)
    : INITIAL_FORM_STATE
  const isSmallScreen = useMediaQuery(`(max-width:${LAYOUT_BREAK_POINT}px)`)
  const itemsPerPage = isSmallScreen ? 12 : 30

  const [form, dispatchAction] = useReducer(formReducer, initialFormState)
  const [fetchProductsByFilter, responseFetchProductsByFilter] = useLazyQuery<{
    productDetailCollection: { items: Array<Product>; total: number }
  }>(QUERY_GET_PRODUCTS_WITH_FILTER)
  const [fetchPriceAndKeywords, responseFetchPriceAndKeywords] = useLazyQuery<{
    productDetailCollection: {
      total: number
      items: Array<{ price: number; keywords: string[] }>
    }
  }>(QUERY_GET_PRICE_AND_KEYWORDS)

  // watch form and fetch API
  useEffect(() => {
    fetchProductsByFilter({
      variables: {
        isPreview,
        limit: itemsPerPage,
        skip: itemsPerPage * (form.page.current - 1),
        keywords: form.keywords.values.length >= 1 ? form.keywords.values : ['default'],
        scene: form.scene.value,
        minPrice: form.minPrice.value,
        maxPrice: form.maxPrice.value,
      },
    })
  }, [
    form.scene.value,
    form.minPrice.value,
    form.maxPrice.value,
    form.keywords.values.toString(),
    form.page.current,
    itemsPerPage,
  ])

  useEffect(() => {
    fetchPriceAndKeywords({
      variables: { isPreview, limit: 100, skip: 0, scene: form.scene.value },
    })
  }, [form.scene.value])

  // watch api result and synchronize the result with form
  const allItems = responseFetchPriceAndKeywords?.data?.productDetailCollection.items
  const [keywordOptions, priceOptions] = getKeywordAndPriceOptions(allItems)
  const maxPage = !!responseFetchProductsByFilter?.data?.productDetailCollection.total
    ? Math.ceil(
        responseFetchProductsByFilter.data.productDetailCollection.total / itemsPerPage
      )
    : 1

  useEffect(() => {
    if (keywordOptions.toString() !== form.keywords.options.toString()) {
      dispatchAction({ type: 'replaceKeywordsOptions', payloads: keywordOptions })
    }
  }, [keywordOptions.toString(), form.keywords.options.toString()])

  useEffect(() => {
    if (priceOptions.toString() !== form.defaultPriceOptions.toString()) {
      dispatchAction({ type: 'replacePriceOptions', payloads: priceOptions })
    }
  }, [priceOptions.toString(), form.defaultPriceOptions.toString()])

  useEffect(() => {
    if (maxPage !== form.page.max) {
      dispatchAction({ type: 'setMaxPage', payload: maxPage })
    }
  }, [maxPage, form.page.max])

  const prevSelectedItems =
    sessionStorage.getItem('selectedItems') !== null
      ? (JSON.parse(sessionStorage.getItem('selectedItems') as string) as Array<Product>)
      : []
  const prevSelectedScenes =
    sessionStorage.getItem('selectedScenes') !== null
      ? (JSON.parse(sessionStorage.getItem('selectedScenes') as string) as Array<{
          itemId: string
          scene: GiftScene
        }>)
      : []

  const [selectedItems, setSelectedItems] = useState<Array<Product>>(prevSelectedItems)
  const [selectedScenes, setSelectedScenes] = useState<
    Array<{ itemId: string; scene: GiftScene }>
  >(prevSelectedScenes)
  const [productIds, setProductIds] = useState([])

  const isRecommend = isDone === 'DONE' || isDone === 'PENDING' || productIds.length > 0

  useEffect(() => {
    // chooseページになってから商品が必要
    const LOADING_WAIT = 8000
    if (location.pathname === '/product/loading') {
      setIsDone('PENDING')
      //非同期で取得しているリコメンド一覧が遅いと、前回リコメンドしたものを表示してしまうのでいったん空に
      setProductIds([])
      handleSurveyCompleted([...Object.values(answers), ...quizSetting.defaultAnswers])
      const timer = setTimeout(() => {
        setIsDone('DONE')
        history.push('/product/choose')
      }, LOADING_WAIT)
      return () => clearTimeout(timer)
    } else {
      setIsDone('')
    }
  }, [location])

  const addItem = (item: Product) => {
    const newSelectedItems = [...selectedItems, item]
    const newSelectedScenes = [
      ...selectedScenes,
      { itemId: item.sys.id, scene: form.scene.value },
    ]
    setSelectedItems(newSelectedItems)
    setSelectedScenes(newSelectedScenes)
    sessionStorage.setItem('selectedItems', JSON.stringify(newSelectedItems))
    sessionStorage.setItem('selectedScenes', JSON.stringify(newSelectedScenes))
  }
  const removeItem = (item: Product) => {
    const removeTargetId = item.sys.id
    const newSelectedItems = selectedItems.filter(
      (item) => item.sys.id !== removeTargetId
    )
    const newSelectedScenes = selectedScenes.filter(
      (scene) => scene.itemId !== removeTargetId
    )
    setSelectedItems(newSelectedItems)
    setSelectedScenes(newSelectedScenes)
    sessionStorage.setItem('selectedItems', JSON.stringify(newSelectedItems))
    sessionStorage.setItem('selectedScenes', JSON.stringify(newSelectedScenes))
  }

  const addClickHandler = (data: Product[]): Array<ProductWithHandlerAndStatus> => {
    return data.map((item) => {
      let handler
      let status: SelectStatus
      if (
        // confirm ページでクリックされた際も必要
        selectedItems.map((item) => item.sys.id).includes(item.sys.id) &&
        location.pathname === '/product/chooseconfirm'
      ) {
        handler = () => {
          if (selectedItems.length === 1) {
            history.push('/product/choose')
          }
          removeItem(item)
        }
        status = 'SELECTED'
      } else if (selectedItems.map((item) => item.sys.id).includes(item.sys.id)) {
        handler = () => {
          removeItem(item)
        }
        status = 'SELECTED'
      } else if (selectedItems.length >= MAX_SELECTABLE_ITEMS) {
        handler = () => {
          history.goBack()
        }
        status = 'UNSELECTABLE'
      } else {
        handler = () => {
          addItem(item)
        }
        status = 'SELECTABLE'
      }
      return {
        ...item,
        handleClick: handler,
        selectableStatus: status,
      }
    })
  }

  const products =
    typeof data !== 'undefined' && isRecommend === true
      ? addClickHandler(data.productDetailCollection.items)
      : []

  const productsInCart = addClickHandler(selectedItems)

  const handleSurveyCompleted = async (answers: Array<string>) => {
    const res = await fetch(process.env.REACT_APP_CLOUD_FUNCTION_RECOMEND_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer_ids: answers }),
      cache: 'no-cache',
    })
    const json = await res.json()
    const product_ids = json.data.map((item: { id: string }) => item.id)
    fetchProductsByIds({
      variables: { ids: product_ids, limit: 10, preview: isPreview },
    })
    setProductIds(product_ids)
  }

  // フィルタリングの結果のデータが存在する場合
  // 直接レコメンド一覧にアクセスされた場合のハンドリングも含む
  if (isRecommend === false && !!responseFetchProductsByFilter?.data) {
    const { items } = responseFetchProductsByFilter.data.productDetailCollection
    productsSorted = addClickHandler(items)
    sessionStorage.setItem('searchForm', JSON.stringify(form))
  }

  // リコメンドされた順序に則った商品リストを作成
  if (isRecommend === true && productsSorted.length === 0) {
    productIds.forEach((productId) => {
      const product = products.find((item) => item.sys.id === productId)
      if (typeof product !== 'undefined') {
        productsSorted = [...productsSorted, product]
      }
    })
  }

  return {
    products: productsSorted,
    loading,
    productsInCart,
    isDone,
    searchForm: {
      scene: {
        ...form.scene,
        setValue: (value) => dispatchAction({ type: 'changeScene', payload: value }),
      },
      keywords: {
        ...form.keywords,
        setValues: (values) =>
          dispatchAction({ type: 'changeKeywords', payloads: values }),
      },
      minPrice: {
        ...form.minPrice,
        setValue: (value) => dispatchAction({ type: 'changeMinPrice', payload: value }),
      },
      maxPrice: {
        ...form.maxPrice,
        setValue: (value) => dispatchAction({ type: 'changeMaxPrice', payload: value }),
      },
      page: {
        ...form.page,
        setValue: (value) => dispatchAction({ type: 'changePage', payload: value }),
      },
      defaultPriceOptions: form.defaultPriceOptions,
    },
    scenesInCart: selectedScenes.map((obj) => obj.scene),
  }
}

function formReducer(state: FormState, action: FormAction): FormState {
  const init = INITIAL_FORM_STATE
  switch (action.type) {
    case 'changeScene': {
      // reset all values except for `scene`
      const newScene = { value: action.payload, options: init.scene.options }
      return { ...init, scene: newScene }
    }
    case 'changeKeywords': {
      const newKeywords = { values: action.payloads, options: state.keywords.options }
      // go to the first page
      const newPage = { ...state.page, current: 1 }
      return { ...state, keywords: newKeywords, page: newPage }
    }
    case 'changeMinPrice': {
      // also change max price options
      const { payload: value } = action
      const newMinPrice = { value, options: state.minPrice.options }
      const newMaxPrice = {
        value: state.maxPrice.value,
        options:
          value !== null
            ? state.defaultPriceOptions.filter((option) => option > value)
            : state.defaultPriceOptions,
      }
      // go to the first page
      const newPage = { ...state.page, current: 1 }
      return { ...state, minPrice: newMinPrice, maxPrice: newMaxPrice, page: newPage }
    }
    case 'changeMaxPrice': {
      // also change min price options
      const { payload: value } = action
      const newMinPrice = {
        value: state.minPrice.value,
        options:
          value !== null
            ? state.defaultPriceOptions.filter((option) => option < value)
            : state.defaultPriceOptions,
      }
      const newMaxPrice = { value, options: state.maxPrice.options }
      // go to the first page
      const newPage = { ...state.page, current: 1 }
      return { ...state, minPrice: newMinPrice, maxPrice: newMaxPrice, page: newPage }
    }
    case 'changePage': {
      return {
        ...state,
        page: {
          ...state.page,
          current: action.payload,
        },
      }
    }
    case 'replaceKeywordsOptions': {
      const newKeywords = {
        // exclude `default` keyword from options
        values: init.keywords.values,
        options: action.payloads.filter((option) => option !== 'default'),
      }
      return { ...state, keywords: newKeywords }
    }
    case 'replacePriceOptions': {
      const defaultPriceOptions = action.payloads
      const newMinPrice = {
        value: init.minPrice.value,
        options: defaultPriceOptions,
      }
      const newMaxPrice = {
        value: init.maxPrice.value,
        options: defaultPriceOptions,
      }
      return {
        ...state,
        minPrice: newMinPrice,
        maxPrice: newMaxPrice,
        defaultPriceOptions,
      }
    }
    case 'setMaxPage': {
      return {
        ...state,
        page: {
          ...state.page,
          max: action.payload,
        },
      }
    }
    default: {
      throw new Error()
    }
  }
}

function getKeywordAndPriceOptions(
  items: Array<{ price: number; keywords: string[] }> | undefined
): [string[], number[]] {
  if (items === undefined || items.length === 0) {
    return [[], []]
  }

  let keywordList: Array<string> = []
  let priceList: Array<number> = []

  for (const item of items) {
    keywordList = [...keywordList, ...item.keywords]
  }

  priceList = items.map((item) => item.price)

  const keywordListUnique = Array.from(new Set(keywordList))
  const priceListUnique = Array.from(new Set(priceList))

  const minPrice = priceListUnique.length > 1 ? Math.min(...priceListUnique) : MIN_PRICE
  const maxPrice = priceListUnique.length > 1 ? Math.max(...priceListUnique) : MAX_PRICE
  const minPriceFloored = orgFloor(minPrice, 1000)
  const maxPriceCeiled = orgCeil(maxPrice, 1000)
  const priceOptions = range(minPriceFloored, maxPriceCeiled + 1, 1000)

  return [keywordListUnique, priceOptions]
}
