import React, { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'

import { Stack } from '@mui/material'

import { SearchSceneItem } from 'atoms'

import { SCENE_CONFIG_LIST, SceneType } from 'constants/index'

export const MobileSceneItem = ({
  setMobileStep,
  giftScene,
}: {
  setMobileStep: Dispatch<SetStateAction<number>>
  giftScene?: SceneType
}) => {
  const navigate = useNavigate()

  const checkSidebar = (item: SceneType) => {
    return item.id === giftScene?.id
  }

  return (
    <Stack direction="row" mt={3.5} gap={2} overflow={'auto'}>
      {SCENE_CONFIG_LIST.map((scene, index) =>
        checkSidebar(scene) ? (
          <SearchSceneItem key={index} selected={true}>
            <Stack>
              <img src={scene.iconBlackWhite} />
            </Stack>
            {scene.title === 'すべてのギフト' ? '選択なし' : scene.title}
          </SearchSceneItem>
        ) : (
          <SearchSceneItem
            onClick={() => {
              navigate(`/product/choose/${scene?.id}`)
              setMobileStep(2)
            }}
            key={index}
            selected={false}
          >
            <Stack>
              <img src={scene.iconBlackWhite} />
            </Stack>
            {scene.title === 'すべてのギフト' ? '選択なし' : scene.title}
          </SearchSceneItem>
        )
      )}
    </Stack>
  )
}
