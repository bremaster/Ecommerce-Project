import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useStocks } from './useStocks'
import { ProductWithHandlerAndStatus } from 'constants/index'

// change to useChooseGift
export function useChooseGift(items: ProductWithHandlerAndStatus[]) {
  const navigate = useNavigate()

  const [tappedItemId, setTappedItemId] = useState<string | null>(null)
  const stocksAmount = useStocks(items.map((item) => item.sys.id))

  const handleTap = (item: ProductWithHandlerAndStatus) => {
    // handle tap after stock calcuration finished
    if (stocksAmount[item.sys.id] === undefined) {
      return
    }
    setTappedItemId(item.sys.id)
    navigate(`/product/detail/${item.sys.id}`)
  }

  const itemsWithHandlerAndStock = items.map((item) => {
    const stock = stocksAmount[item.sys.id]
    return {
      ...item,
      onTap: () => handleTap(item),
      stockOk: stock === undefined ? undefined : stock > 0,
    }
  })

  const tappedItem = itemsWithHandlerAndStock.find(
    (item) => item.sys.id === tappedItemId
  ) as ProductWithHandlerAndStatus & {
    onTap: () => void
  }
  return {
    tappedItem,
    itemsWithHandlerAndStock,
  }
}
