import React from 'react'
import { Box, Stack } from '@mui/material'

import { StoryItem } from 'molecules'

import { styled } from '@mui/system'

const Wrap = styled(Box)((props) => ({
  backgroundColor: '#F7F7F7',
  paddingTop: '100px',
  paddingBottom: '231px',
  marginBottom: '123px',
  marginTop: '150px',
  [props.theme.breakpoints.down(900)]: {
    paddingTop: '70px',
    paddingBottom: '120px',
    marginBottom: '99px',
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

const StoryList1 = styled(Stack)((props) => ({
  width: '100%',
  [props.theme.breakpoints.down(900)]: {
    fontSize: '13px',
    marginTop: 50,
  },
}))

const StoryList2 = styled(Stack)((props) => ({
  width: '100%',
  marginTop: '196px',
  [props.theme.breakpoints.down(900)]: {
    fontSize: '13px',
    marginTop: 50,
  },
}))

const StoryGroup = styled(Stack)((props) => ({
  gap: '20px',
  flexDirection: 'row',
  [props.theme.breakpoints.down(900)]: {
    flexDirection: 'column',
  },
}))

const Title = styled(Box)((props) => ({
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: 1,
  fontFamily: 'Outfit',
  color: '#4A4A4A',
  letterSpacing: '0.08em',
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '31px',
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
  marginBottom: '118px',
  [props.theme.breakpoints.down(900)]: {
    color: '#000',
    marginBottom: '28px',
    fontSize: '24px',
  },
}))

const Arrow = styled('img')((props) => ({
  display: 'block',
  [props.theme.breakpoints.down(900)]: {
    display: 'none',
  },
}))

const TitleWrap = styled(Box)((props) => ({
  marginTop: '100px',
  display: 'none',
  [props.theme.breakpoints.down(900)]: {
    display: 'block',
  },
}))

export const Story = () => {
  return (
    <Wrap id="story">
      <StoryWrap>
        <Title>USER’S STORY</Title>

        <StoryList1>
          <SubTitle>ユーザーストーリー1</SubTitle>
          <StoryGroup justifyContent="space-between" alignItems="center">
            <StoryItem
              num={1}
              user="S.J.さん（女性 / 20代）"
              description="シンプルに便利！ それに久しぶりに話すきっかけにもなりました"
              review={
                <>
                  ４年近く会っていなかった同期の結婚祝いに使いました。 <br />
                  普通のカタログギフトとちがって、相手のことをあれこれ考えながら自分で商品リストを組めるのが良かったです！インドアなのは知っていたので、おうち時間に花を添えられるようなギフトのリストを作りました。他の話のきっかけにもなり良かったです！
                </>
              }
            />
            <Arrow src="/landing/Polygon_6.png" />
            <StoryItem
              num={2}
              user="S.I.さん（女性 / 30代）"
              description="ちょうど欲しかったものが来て驚きました！"
              review={
                <>
                  結婚したこともあり自宅で食卓を囲む時間が増え、「ちょっと料理こだわりたいな」と思っていた矢先、ものすごいお洒落なフレーバーソルトがあって、「これだ！」と思いました。もともとオリーブオイルやスパイスなどこだわるタイプなので、すごい重宝しています。
                  <br />
                  お祝いとしてタオルや食器ばかりいただいていたので、こういうギフトは本当に嬉しいです！
                </>
              }
            />
          </StoryGroup>
        </StoryList1>

        <TitleWrap mt={12.5}>
          <Title>USER’S STORY</Title>
        </TitleWrap>

        <StoryList2>
          <SubTitle>ユーザーストーリー2</SubTitle>
          <StoryGroup justifyContent="space-between" alignItems="center">
            <StoryItem
              num={3}
              user="H.K.さん（女性 / 20代）"
              description="まさかの発見がありました！笑"
              review={
                <>
                  学生時代の友人の結婚祝いに使いました。結婚を機に田舎に移住したと聞き、昔から甘いものが大好きなだった彼女には都会ならではのスイーツを贈る事にしました。そしたらまさかの友人はビーガンになっており、卵や乳製品の入ったものは食べれないとの事！選んだうちの一つがビーガンスイーツだったので、友人も大喜びでした！お互い少し離れるだけで色々な変化があるものだなと改めて考えさせられました（笑）
                </>
              }
            />
            <Arrow src="/landing/Polygon_6.png" />
            <StoryItem
              num={4}
              user="M.O.さん（女性 / 20代）"
              description="食べられないものが多い私にとって、選べるというのはとても感激でした！！"
              review={
                <>
                  ここ数年でビーガンにハマった私は普段から頂き物などは食べられないことが多く、結婚祝いでも大の甘党だった私を知る友人からはスイーツを沢山いただきました。しかしどれも食べられないものばかりで、渋々夫にあげていました。そんな中いただいた選べるギフトの中にビーガンスイーツが入っており、とても嬉しかったです！このサービスだったら、私のようにライフスタイルが変わった方や趣味嗜好の変化にも対応できる可能性があると感じました！
                </>
              }
            />
          </StoryGroup>
        </StoryList2>
      </StoryWrap>
    </Wrap>
  )
}
