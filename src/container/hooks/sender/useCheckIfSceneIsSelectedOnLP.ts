import { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'
import { SCENE_CONFIG_LIST } from 'constants/index'

export function useCheckIfSceneIsSelectedOnLP(giftScene: string) {
  // check if scene had been selected when onboarding
  const [selected, setSelected] = useState<boolean>(false)

  const { pathname } = useLocation()

  useEffect(() => {
    if (
      pathname.startsWith('/product/onboarding') &&
      !!giftScene &&
      giftScene !== SCENE_CONFIG_LIST[0].title
    ) {
      setSelected(true)
    }
  }, [pathname, giftScene])

  return selected
}
