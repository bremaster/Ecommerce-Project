import React, { useEffect } from 'react'

import { useLazyQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

import { GiftDetail, GiftDetailProps } from 'pages/SPA/choose/GiftDetail'
import { ProductWithHandlerAndStatus, Product } from 'constants/index'
import { QUERY_GET_PRODUCT_BY_ID } from 'container/hooks/index'
import { useStocks } from 'container/hooks/sender/useStocks'
import { ErrorPage } from 'pages/ErrorPage'
import { Loading } from 'organisms'

type Props = GiftDetailProps & {
  addOnSelectedHandler: (item: Product) => ProductWithHandlerAndStatus
}

export const GiftDetailContainer = (props: Props) => {
  // if cached in react state, just return it
  if (!!props.item) {
    return <GiftDetail {...props} />
  }

  // else, fetch item and its stock from backend
  const param = useParams<{ itemId: string }>()
  const [fetchProduct, fetchProductResult] = useLazyQuery<{ productDetail: Product }>(
    QUERY_GET_PRODUCT_BY_ID
  )

  const stock = useStocks([param.itemId ? param.itemId : ''])[
    param.itemId ? param.itemId : ''
  ]
  const stockOk = stock === undefined || stock > 0
  useEffect(() => {
    props.item === undefined && fetchProduct({ variables: { id: param.itemId } })
  }, [])

  // render based on fetch result
  if (fetchProductResult.called === false || fetchProductResult.loading === true) {
    return <Loading />
  }

  if (!!fetchProductResult.data?.productDetail) {
    const itemWithHandler = props.addOnSelectedHandler(
      fetchProductResult.data.productDetail
    )
    const itemsWithHandlerAndStock = { ...itemWithHandler, stockOk: stockOk }
    return (
      <GiftDetail item={itemsWithHandlerAndStock} howManyInCart={props.howManyInCart} />
    )
  }

  return <ErrorPage />
}
