import { useState, useEffect, useCallback } from 'react'

type ApiSuccessResponse = Array<{ ID: string; Amount: number }>
type StockMap = { [id: string]: number | undefined }

export const useStocks = (itemIds: Array<string>): StockMap => {
  const init = itemIds.reduce((obj, itemId) => ({ ...obj, [itemId]: undefined }), {})

  const [stock, setStock] = useState<StockMap>(init)

  const fetcher = useCallback(async (ids: Array<string>) => {
    const queryParams = ids.map((id) => `id=${id}`).join('&')
    const apiUrl = process.env.REACT_APP_CLOUD_RUN_CADU_API_URL
    const res = await fetch(`${apiUrl}/stocks?${queryParams}`)

    const noStocks = ids.reduce((obj, itemId) => ({ ...obj, [itemId]: 0 }), {})

    if (res.status === 200 && (await res.clone().text()) === 'all no stock') {
      setStock(noStocks)
    } else if (res.status === 200) {
      const json: ApiSuccessResponse = await res.json()
      const response = json.reduce(
        (obj, item) => ({ ...obj, [item.ID]: item.Amount }),
        {}
      )
      // overwrite stock object by backend response
      const merged = { ...noStocks, ...response }
      setStock(merged)
    } else if (res.status === 400) {
      setStock(noStocks)
    } else {
      throw new Error('An unexpected error has occurred.')
    }
  }, [])

  useEffect(() => {
    if (itemIds.length > 0) {
      fetcher(itemIds)
    }
  }, [JSON.stringify(itemIds)])

  return stock
}
