import { useState, useEffect, useReducer } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  QUERY_GET_PRODUCTS_WITH_FILTER,
  QUERY_GET_PRICE_AND_CATEGORY,
} from 'container/hooks/index'
import { MAX_SELECTABLE_ITEMS } from 'constants/index'
import {
  INITIAL_FORM_STATE,
  GiftScene,
  FormAction,
  FormState,
  FormStateWithSetter,
  SearchConfig,
} from 'constants/searchForm'
import { Product, ProductWithHandlerAndStatus, SCENE_CONFIG_LIST } from 'constants/index'
import { SelectStatus } from '../../../constants/index'

import { orgCeil, orgFloor, range } from 'utilities/CommonFunctions'
import { dataLayerPush } from 'utilities/GoogleAnalytics'

const LAYOUT_BREAK_POINT = 1000

/**
 * 回答IDからリコメンド商品IDを取得し、商品詳細情報を取得
 */
export function useRecommendProducts(): {
  products: Array<ProductWithHandlerAndStatus>
  productsInCart: Array<ProductWithHandlerAndStatus>
  scenesInCart: Array<GiftScene>
  searchForm: FormStateWithSetter
  giftScene: GiftScene
  addOnSelectedHandler: (item: Product) => ProductWithHandlerAndStatus
  totalItems: number
} {
  const navigate = useNavigate()
  const location = useLocation()

  let productsSorted: Array<ProductWithHandlerAndStatus> = []

  // filter condition
  const initialFormState: FormState = INITIAL_FORM_STATE
  const isSmallScreen = useMediaQuery(`(max-width:${LAYOUT_BREAK_POINT}px)`, {
    defaultMatches: true,
  })
  const itemsPerPage = isSmallScreen ? 20 : 30

  const [form, dispatchAction] = useReducer(formReducer, initialFormState)
  const [fetchProductsByFilter, responseFetchProductsByFilter] = useLazyQuery<{
    productDetailCollection: { items: Array<Product>; total: number }
  }>(QUERY_GET_PRODUCTS_WITH_FILTER)
  const [fetchPriceAndCategory, responseFetchPriceAndCategory] = useLazyQuery<{
    giftSceneCollection: {
      items: Array<{ categories: string[]; minPrice: number; maxPrice: number }>
    }
  }>(QUERY_GET_PRICE_AND_CATEGORY)

  const path = location.pathname

  const getGiftScene = () => {
    const sceneParam = path.split('/').pop()
    const currentScene = SCENE_CONFIG_LIST.find((item) => item.id === sceneParam)
    return !!currentScene ? currentScene.title : 'すべてのギフト'
  }

  // get scene from url
  const [giftScene, setGiftScene] = useState<GiftScene>(getGiftScene())

  useEffect(() => {
    if (
      path.startsWith('/product/choose') ||
      path.startsWith('/product/presearch/price')
    ) {
      const newGiftScene = getGiftScene()

      if (newGiftScene !== giftScene) setGiftScene(newGiftScene)
    }
  }, [location.pathname])

  // watch parameters and fetch API
  useEffect(() => {
    fetchProductsByFilter({
      variables: {
        limit: itemsPerPage,
        skip: itemsPerPage * (form.page.current - 1),
        category: form.category.values.length >= 1 ? form.category.values : ['default'],
        scene: giftScene,
        minPrice: form.minPrice.value,
        maxPrice: form.maxPrice.value,
        sortKeys: [SearchConfig[giftScene].itemSortKey + '_DESC', 'sys_publishedAt_DESC'],
      },
    })
  }, [
    giftScene,
    form.minPrice.value,
    form.maxPrice.value,
    form.category.values.toString(),
    form.page.current,
    itemsPerPage,
  ])

  useEffect(() => {
    fetchPriceAndCategory({
      variables: { scene: giftScene },
    })
    dispatchAction({ type: 'changePage', payload: 1 })
  }, [giftScene])

  // watch api result and synchronize the result with form
  const allItems = responseFetchPriceAndCategory?.data?.giftSceneCollection.items
  const [categoryOptions, priceOptions] = getCategoryAndPriceOptions(allItems)

  const totalItems = !!responseFetchProductsByFilter?.data?.productDetailCollection.total
    ? responseFetchProductsByFilter?.data?.productDetailCollection.total
    : 0
  const maxPage = !!responseFetchProductsByFilter?.data?.productDetailCollection.total
    ? Math.ceil(
        responseFetchProductsByFilter.data.productDetailCollection.total / itemsPerPage
      )
    : 1

  useEffect(() => {
    if (categoryOptions.toString() !== form.category.options.toString()) {
      dispatchAction({ type: 'replaceCategoryOptions', payloads: categoryOptions })
    }
  }, [categoryOptions.toString(), form.category.options.toString()])

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
  const [selectedScenes, setSelectedScenes] =
    useState<Array<{ itemId: string; scene: GiftScene }>>(prevSelectedScenes)

  const addItem = (item: Product) => {
    const newSelectedItems = [...selectedItems, item]
    const newSelectedScenes = [
      ...selectedScenes,
      { itemId: item.sys.id, scene: giftScene },
    ]
    setSelectedItems(newSelectedItems)
    setSelectedScenes(newSelectedScenes)
    sessionStorage.setItem('selectedItems', JSON.stringify(newSelectedItems))
    sessionStorage.setItem('selectedScenes', JSON.stringify(newSelectedScenes))
    dataLayerPush({
      event: 'gift added',
      giftId: item.sys.id,
      giftName: item.title,
      giftPrice: item.productPrice,
      sceneOfGiftSelected: giftScene,
    })
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

  const goToGiftBox = () => {
    navigate('/product/giftbox')
  }

  const addClickHandler = (item: Product): ProductWithHandlerAndStatus => {
    let handler
    let status: SelectStatus
    if (selectedItems.map((item) => item.sys.id).includes(item.sys.id)) {
      handler = () => {
        removeItem(item)
        goToGiftBox()
      }
      status = 'SELECTED'
    } else if (selectedItems.length >= MAX_SELECTABLE_ITEMS) {
      handler = () => {
        navigate(-1)
      }
      status = 'UNSELECTABLE'
    } else {
      handler = () => {
        addItem(item)
        goToGiftBox()
      }
      status = 'SELECTABLE'
    }
    return {
      ...item,
      handleClick: handler,
      selectableStatus: status,
    }
  }

  const productsInCart = selectedItems.map(addClickHandler)

  // フィルタリングの結果のデータが存在する場合
  if (!!responseFetchProductsByFilter?.data) {
    const { items } = responseFetchProductsByFilter.data.productDetailCollection
    productsSorted = items.map(addClickHandler)
  }

  return {
    products: productsSorted,
    productsInCart,
    searchForm: {
      category: {
        ...form.category,
        setValues: (values) =>
          dispatchAction({ type: 'changeCateogry', payloads: values }),
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
      clear: () => dispatchAction({ type: 'init' }),
    },
    scenesInCart: selectedScenes.map((obj) => obj.scene),
    giftScene: giftScene,
    addOnSelectedHandler: addClickHandler,
    totalItems: totalItems,
  }
}

function formReducer(state: FormState, action: FormAction): FormState {
  const init = INITIAL_FORM_STATE
  switch (action.type) {
    case 'changeCateogry': {
      const newCategory = { values: action.payloads, options: state.category.options }
      // go to the first page
      const newPage = { ...state.page, current: 1 }
      return { ...state, category: newCategory, page: newPage }
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
    case 'replaceCategoryOptions': {
      if (action.payloads.length > 0) {
        const tempCategoryValues = state.category.values
        const validOptions = tempCategoryValues.filter((value) =>
          action.payloads.includes(value)
        )
        const newCategory = {
          // exclude `default` category from options
          values: validOptions,
          options: action.payloads.filter((option) => option !== 'default'),
        }

        return { ...state, category: newCategory }
      }
      return state
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
    case 'init': {
      return init
    }
    default: {
      throw new Error()
    }
  }
}

function getCategoryAndPriceOptions(
  items: Array<{ categories: string[]; minPrice: number; maxPrice: number }> | undefined
): [string[], number[]] {
  if (items === undefined || items.length === 0) {
    return [[], []]
  }

  const categoryListUnique = items[0].categories

  const minPrice = items[0].minPrice
  const maxPrice = items[0].maxPrice
  const minPriceFloored = orgFloor(minPrice, 1000)
  const maxPriceCeiled = orgCeil(maxPrice, 1000)
  const priceOptions = range(minPriceFloored, maxPriceCeiled + 1, 1000)

  return [categoryListUnique, priceOptions]
}
