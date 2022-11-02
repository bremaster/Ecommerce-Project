import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export function getSalesChannel() {
  const value = sessionStorage.getItem('salesChannel')
  return value
}

// get query param on mount
export function useSalesChannel() {
  const { search } = useLocation()
  const query = useMemo(() => new URLSearchParams(search), [])

  const salesChannel = query.get('z_gift')

  if (!!salesChannel) {
    sessionStorage.setItem('salesChannel', salesChannel)
  }
}
