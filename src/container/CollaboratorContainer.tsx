import React, { ReactNode } from 'react'

import { createContext, useState, useLayoutEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'

import {
  COLLABORATOR_PROFILE,
  COLLABORATOR_IDS,
  Collaborator,
  CollaboratorIndex,
} from 'constants/CollaboratorProfile'

// コラボ相手のIDを取得. プロバイダーコンポーネントでコンテクストに入れて渡す
const useCollaboratorId = (): CollaboratorIndex => {
  const [id, setId] = useState<CollaboratorIndex>('nocollab')

  const { search, pathname } = useLocation()
  const searchInstance = new URLSearchParams(search)

  // URLもしくはセッションストレージからID取得
  // 取得したIDはステートだけではなくセッションストレージにもセット
  useLayoutEffect(() => {
    const key = 'collab'
    let value = searchInstance.get(key)

    // パラメータ無しでトップページへアクセスした際にはコラボ独自設定をオフに
    if (pathname === '/' && value === null) {
      sessionStorage.removeItem(key)
      return
    }

    if (value === null) {
      value = sessionStorage.getItem(key)
    }

    if (!!value && COLLABORATOR_IDS.includes(value)) {
      sessionStorage.setItem(key, value)
      setId(value as CollaboratorIndex)
    }
  }, [])

  return id
}

// コンテクスト作成(nocollabがデフォルト)
const CollaboratorIdContext = createContext<CollaboratorIndex>('nocollab')

// プロバイダーコンポーネント
const CollaboratorIdProvider = (props: { children: ReactNode }): JSX.Element => {
  const collaboratorId: CollaboratorIndex = useCollaboratorId()

  return (
    <CollaboratorIdContext.Provider value={collaboratorId}>
      {props.children}
    </CollaboratorIdContext.Provider>
  )
}

// コンシューマコンポーネント用のフック
const useCollaboratorProfile = (): Collaborator => {
  //コンテクストからID取得
  const id = useContext(CollaboratorIdContext)

  const collaborator: Collaborator = COLLABORATOR_PROFILE[id]
  return collaborator
}

export { CollaboratorIdProvider, useCollaboratorProfile }
