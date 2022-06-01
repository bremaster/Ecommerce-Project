import React, { useState } from 'react'

import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import { ProductGuideModal, GiftList, GiftDetail } from 'organisms'
import { ProductWithHandlerAndStatus } from 'constants/index'
import { Head } from 'utilities/Head'
import { FormStateWithSetter } from 'constants/searchForm'
import { useStocks } from './useStocks'

export type ChooseGiftProps = {
  items: ProductWithHandlerAndStatus[]
  itemsInCart?: ProductWithHandlerAndStatus[]
  selectedItemId?: string | null
  searchForm?: FormStateWithSetter
}

// NOTICE: this is container component. not a single page.
const ChooseGift: React.FC<ChooseGiftProps> = ({
  items = [],
  itemsInCart = [],
  selectedItemId = null,
  searchForm = undefined,
}) => {
  const history = useHistory()
  const { path } = useRouteMatch()
  const [tappedItemId, setTappedItemId] = useState(selectedItemId) // initial value is for handling browser back
  const modalStatus = localStorage.getItem('modalStatus') === 'true'
  const stocksAmount = useStocks(items.map((item) => item.sys.id))

  const goToGiftBox = () => {
    history.push('/product/giftbox')
  }

  const handleTap = (item: ProductWithHandlerAndStatus) => {
    // handle tap after stock calcuration finished
    if (stocksAmount[item.sys.id] === undefined) {
      return
    }
    setTappedItemId(item.sys.id)
    history.push(`${path}/${item.sys.id}`)
  }

  const itemsWithHandlerAndStock = items.map((item) => {
    const stock = stocksAmount[item.sys.id]
    return {
      ...item,
      onTap: () => handleTap(item),
      handleClick: () => {
        item.handleClick()
        item.selectableStatus !== 'UNSELECTABLE' && goToGiftBox()
      },
      stockOk: stock === undefined ? undefined : stock > 0,
    }
  })

  const tappedItem = itemsWithHandlerAndStock.find(
    (item) => item.sys.id === tappedItemId
  ) as ProductWithHandlerAndStatus & {
    onTap: () => void
  }

  return (
    <Switch>
      <Route exact path={path}>
        <Head title="ギフト一覧｜ZEFT ゼフト"></Head>
        <GiftList
          items={itemsWithHandlerAndStock}
          handleNextButtonClick={goToGiftBox}
          howManyInCart={itemsInCart.length}
          form={searchForm}
        />
        <ProductGuideModal modalStatus={modalStatus} />
      </Route>
      <Route exact path={`${path}/:id`}>
        <Head title="ギフト詳細｜ZEFT ゼフト"></Head>
        <GiftDetail item={tappedItem} />
      </Route>
    </Switch>
  )
}

export default ChooseGift
