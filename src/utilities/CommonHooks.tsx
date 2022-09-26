import { useRef, useLayoutEffect, useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

import { normalizePostalCode, fetchAddressAPI } from './CommonFunctions'

/**
 * 縦横比を固定するようのフック
 * iPhoneでCSSのaspect-ratioが2021年5月時点でまだ動かないので
 * デフォルトで横1に対して、縦1.618の黄金比
 * autoExpandがtrueだと、カードの中身が多いときには縦横比を保持せず縦長に伸びていく
 **/
function useAspectRatio<T extends HTMLElement>(
  ratio = 1.618,
  option: {
    autoExpand: boolean
  } = { autoExpand: false }
): React.RefObject<T> {
  const ref: React.RefObject<T> = useRef<T>(null)
  // must calucurate height BEFORE rendering
  useLayoutEffect(() => {
    const domElem: T | null = ref ? ref.current : null
    if (domElem !== null) {
      const width: number = domElem.clientWidth
      if (option.autoExpand) {
        domElem.style.minHeight = `${width * ratio}px`
      } else {
        domElem.style.height = `${width * ratio}px`
      }
    }
  }, [ref.current])
  return ref
}

/**
 * 同一ページでの複数回のクリックを防ぐフック（連打対策）
 */
const usePreventClickMashing = function (): {
  /* shows if clickable or not */
  clickableStatus: 'CLICKABLE' | 'UNCLICKABLE'
  /* higer order function to add side effect */
  withClickStopSideEffect: (func: () => void) => () => void
  setClickableStatus: (val: 'CLICKABLE' | 'UNCLICKABLE') => void
} {
  const [status, setStatus] = useState<'CLICKABLE' | 'UNCLICKABLE'>('CLICKABLE')

  const { pathname } = useLocation()

  useEffect(() => {
    setStatus('CLICKABLE')
  }, [pathname])

  //連打回避の副作用付ける高階関数
  type Fn = () => void
  const withClickStopSideEffect = (func: Fn): Fn => {
    const newFunc = () => {
      if (status === 'CLICKABLE') {
        setStatus('UNCLICKABLE')
        func()
      }
    }
    return newFunc
  }

  return {
    clickableStatus: status,
    withClickStopSideEffect,
    setClickableStatus: setStatus,
  }
}

// 紐付けしたHTMLElementがViewに入ったかどうかの真偽値を返す
function useElementInView(
  targetRef: React.MutableRefObject<HTMLElement>,
  threshold?: number
): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const options = {
      threshold: threshold || 0.4,
    }
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setIsVisible(true)
    }, options)
    observer.observe(targetRef.current)
  }, [])

  return isVisible
}

/**
 * 郵便番号から、都道府県および市区町村+町域を補完する
 */
const useAutoCompleteAddressFromPostalCode = function (
  /*
   * 郵便番号
   */
  postalCode: string,
  /*
   * 都道府県のセッター
   */
  setPrefecture: (value: string) => void,
  /*
   * `市区町村 町域` のセッター
   */
  setAddress: (value: string) => void
): void {
  const fetchAddress = useCallback(
    (code: string) => {
      fetchAddressAPI(code, (ken, shikuchoson, choiki) => {
        setPrefecture(ken)
        setAddress(shikuchoson + ' ' + choiki)
      })
    },
    [setPrefecture, setAddress]
  )

  // 郵便番号をウォッチ。正規化して問題ない郵便番号ならば住所を検索
  useEffect(() => {
    if (!!postalCode === false) {
      return
    }
    const [normalizedCode, ok] = normalizePostalCode(postalCode)
    if (ok) {
      try {
        fetchAddress(normalizedCode)
      } catch (err) {
        console.log(err)
      }
    }
  }, [postalCode])
}

export {
  useAspectRatio,
  usePreventClickMashing,
  useElementInView,
  useAutoCompleteAddressFromPostalCode,
}
