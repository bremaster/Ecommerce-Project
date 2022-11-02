import { useNavigate, useLocation } from 'react-router-dom'

import { useStocks } from './useStocks'
import { ProductWithHandlerAndStatus } from 'constants/index'

// change to useChooseGift
export function useChooseGift(items: ProductWithHandlerAndStatus[]) {
  const navigate = useNavigate()

  const { pathname } = useLocation()
  const tappedItemId = getItemIdFromPath(pathname)

  const stocksAmount = useStocks(items.map((item) => item.sys.id))

  const handleTap = (item: ProductWithHandlerAndStatus) => {
    // handle tap after stock calcuration finished
    if (stocksAmount[item.sys.id] === undefined) {
      return
    }
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

function getItemIdFromPath(path: string): string | null {
  // product detail page path is like /product/detail/s2GhasIs3as23
  const match = path.match(/^\/product\/detail\/(.*)$/)
  if (match === null) {
    return null
  } else {
    return match[1]
  }
}
