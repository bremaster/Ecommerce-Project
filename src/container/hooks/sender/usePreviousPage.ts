import { useRef, useEffect } from 'react'

export const usePreviousPage = (value: number): number => {
  const ref = useRef<number>(1)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
