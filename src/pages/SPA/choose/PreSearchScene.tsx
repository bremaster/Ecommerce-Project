import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Stack, Grid, Button } from '@mui/material'

import { SearchSceneItem } from 'atoms'
import { PreSearchHeader } from 'molecules'
import { Footer } from 'organisms'

import { SCENE_CONFIG_LIST, SceneType } from 'constants/index'

// onboarding page
export const PreSearchScene = () => {
  const navigate = useNavigate()

  const { sceneid } = useParams<{ sceneid: string }>()

  const checkSidebar = (item: SceneType) => {
    return item.id === sceneid
  }

  return (
    <>
      <PreSearchHeader
        title="ギフトシーンを選んでください（1/3）"
        subtitle="シーンに合った商品を見つけることが出来ます"
      />
      <Grid container px={2} mt={'-30px'}>
        {SCENE_CONFIG_LIST.map((scene, index) =>
          checkSidebar(scene) ? (
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="center"
              pt={'30px'}
              key={index}
            >
              <SearchSceneItem
                onClick={() =>
                  navigate(`/product/presearch/price/${scene.id ? scene.id : ''}`)
                }
                selected={true}
              >
                <Stack>
                  <img src={scene.iconBlackWhite} />
                </Stack>
                {scene.title === 'すべてのギフト' ? '選択なし' : scene.title}
              </SearchSceneItem>
            </Grid>
          ) : (
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="center"
              pt={'30px'}
              key={index}
            >
              <SearchSceneItem
                onClick={() =>
                  navigate(`/product/presearch/price/${scene.id ? scene.id : ''}`)
                }
                selected={false}
              >
                <Stack>
                  <img src={scene.iconBlackWhite} />
                </Stack>
                {scene.title === 'すべてのギフト' ? '選択なし' : scene.title}
              </SearchSceneItem>
            </Grid>
          )
        )}
      </Grid>
      <Stack alignItems="center" mt={5} mb={10}>
        <Button
          sx={{
            fontFamily: 'Noto Sans JP',
            fontSize: 12,
            textAlign: 'center',
            textDecoration: 'underline',
            color: 'black',
          }}
          onClick={() => navigate('/product/choose')}
        >
          とりあえずギフトを見る
        </Button>
      </Stack>
      <Footer isMinimal={true} />
    </>
  )
}
