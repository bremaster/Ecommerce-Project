import React from 'react'
import { Box, Stack } from '@mui/material'

import { StoryHikidemonoItem } from 'molecules'

import { styled } from '@mui/system'

const Wrap = styled(Box)((props) => ({
  backgroundColor: '#F7F7F7',
  paddingTop: '148px',
  paddingBottom: '168px',
  marginTop: '150px',
  [props.theme.breakpoints.down(900)]: {
    paddingTop: '70px',
    paddingBottom: '120px',
    marginTop: '100px',
  },
}))

const StoryWrap = styled(Box)((props) => ({
  maxWidth: '1100px',
  width: '100%',
  margin: '0 auto',
  padding: '0 30px',
  [props.theme.breakpoints.down(900)]: {
    padding: '0 25px',
  },
}))

const StoryList = styled(Stack)((props) => ({
  width: '100%',
  marginTop: 36,
  [props.theme.breakpoints.down(900)]: {
    fontSize: '13px',
    marginTop: 50,
  },
}))

const StoryGroup = styled(Stack)((props) => ({
  gap: '64px',
  flexDirection: 'row',
  marginTop: 160,
  [props.theme.breakpoints.down(900)]: {
    gap: '20px',
    flexDirection: 'column',
    marginTop: 20,
  },
}))

const Title = styled(Box)((props) => ({
  fontSize: '32px',
  fontWeight: 700,
  lineHeight: 1,
  fontFamily: 'Outfit',
  color: '#4A4A4A',
  letterSpacing: '0.08em',
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  width: 'fit-content',
  [props.theme.breakpoints.down(900)]: {
    fontSize: '20px',
  },
}))

const SubTitle = styled(Box)((props) => ({
  fontSize: '32px',
  fontWeight: 700,
  lineHeight: 1,
  fontFamily: 'Noto Sans JP',
  color: '#4A4A4A',
  letterSpacing: '0.08em',
  [props.theme.breakpoints.down(900)]: {
    color: '#000',
    fontSize: '24px',
  },
}))

export const Story = () => {
  return (
    <Wrap id="story">
      <StoryWrap>
        <Title>USER’S STORY</Title>

        <StoryList>
          <SubTitle>ユーザーストーリー</SubTitle>
          <StoryGroup justifyContent="space-between" alignItems="center">
            <StoryHikidemonoItem
              image="/landing/story/hikidemostory-story-1.jpeg"
              user="S.J.さん（女性 / 20代）"
              description="カタログギフトは商品の割に高いなと思ってたのでZEFTを使いました！"
              review={
                <>
                  結婚式の引き出物をどれにしようか探している中で見つけて使いました。
                  <br />
                  カタログギフトにしようかとも思ったのですが、カタログギフトの商品が気に入らず自分で選べたので今回ZEFTを利用しました。商品が選べる点と商品ごとの実費だったので無駄な出費がなくよかったです。
                </>
              }
            />
            <StoryHikidemonoItem
              image="/landing/story/hikidemostory-story-2.jpeg"
              user="K.H.さん（男性 / 30代）"
              description="選ばれた時だけの支払いなので無駄がなくいいなと思いました"
              review={
                <>
                  自分自身の経験的にもカタログギフトはあんまりいいモノがなく、そのまま放置して受け取りそびれたことがあったのですごくもったいないと思ってました。
                  <br />
                  後払いで期限切れの場合は支払わなくてもいいのは合理的でいいなと思います。
                </>
              }
            />
          </StoryGroup>
        </StoryList>
      </StoryWrap>
    </Wrap>
  )
}
