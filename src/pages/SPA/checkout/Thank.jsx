import React, { useEffect, useState } from 'react'

import { Typography, Stack, Box } from '@mui/material'
import { useLocation, Navigate } from 'react-router-dom'
import useClipboard from 'react-use-clipboard'
import { isMobile } from 'react-device-detect'

import { GradientButton, GradientOutlinedButton } from 'atoms'
import { GiftPreview } from 'organisms'
// TODO .d.tsファイルが存在しないため、tsx化するとtype errorを起こす。
// ハンドリング方法要検討
// -> cloudinary の skd をやめたので、ts化可能に
import { useCollaboratorProfile } from 'container/CollaboratorContainer'
import { MenuAppBar, Footer } from 'organisms'
import { dataLayerPush } from 'utilities/GoogleAnalytics'

import { styled } from '@mui/system'

const environment = process.env.REACT_APP_ENV // development | staging | production

const LAYOUT_BREAK_POINT = 1000

const Wrap = styled(Stack)({
  maxWidth: 700,
  margin: '0 auto',
})

const Expires = styled(Typography)((props) => ({
  color: '#FE8B7B',
  fontFamily: 'Noto Sans JP',
  fontSize: 16,
  letterSpacing: '0.05rem',
  lineHeight: '25.6px',
  marginTop: 9,
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    marginTop: 13,
  },
}))

const BackCircle = styled(Box)((props) => ({
  placeItems: 'center',
  marginTop: 100,
  width: 244,
  '& img': {
    width: '100%',
  },
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    marginTop: 80,
  },
}))

const Header = styled(Typography)((props) => ({
  color: '#4A4A4A',
  fontFamily: 'Noto Sans JP',
  fontSize: 32,
  fontWeight: 700,
  letterSpacing: '0.03rem',
  lineHeight: '48px',
  marginTop: 20,
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    marginTop: 40,
    fontSize: 24,
    lineHeight: '36px',
  },
}))

const TextStyle = styled(Typography)((props) => ({
  fontFamily: 'Outfit',
  fontWeight: 600,
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: 14,
  marginTop: 8,
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    marginTop: 12,
  },
}))

const Description = styled(Typography)((props) => ({
  color: '#4A4A4A',
  fontFamily: 'Noto Sans JP',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '32px',
  letterSpacing: '0.05em',
  textAlign: 'center',
  marginTop: 40,
  '& span': {
    borderBottom: '1px solid #4A4A4A',
    fontWeight: 600,
  },
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    marginTop: 36,
  },
}))

const SendBySns = styled(Typography)((props) => ({
  color: '#4A4A4A',
  fontFamily: 'Noto Sans JP',
  fontSize: '18px',
  lineHeight: '27px',
  fontWeight: 700,
  letterSpacing: '0.03rem',
  marginTop: 58,
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    marginTop: 56,
  },
}))

const ButtonWrap = styled(Stack)((props) => ({
  maxWidth: 406,
  width: '90%',
  marginTop: 43,
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    marginTop: 31,
  },
}))

const OutlineButton = styled(GradientOutlinedButton)({
  backgroundColor: '#FFF',
  border: `1px solid transparent`,
  borderRadius: '10px',
  height: '45px',
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'border-box, text',
  boxShadow: '2px 1000px 2px #fff inset',
  '&:focus': {
    outline: 0,
  },
  '& h6': {
    fontFamily: 'Outfit',
    fontSize: '15px',
    fontWeight: 700,
    background:
      'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
})

const SocialList = styled(Stack)((props) => ({
  width: '80%',
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    width: '72%',
    justifyContent: 'space-between',
  },
}))

const SocialLink = styled(Box)({
  width: 40,
  '& img': {
    borderRadius: 10,
    width: 40,
  },
})

const Notation = styled(Box)({
  '& p': {
    color: '#4A4A4A',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '20px',
    letterSpacing: '0.05rem',
    textDecorationLine: 'underline',
  },
})

const NotationPC = styled(Typography)((props) => ({
  display: 'block',
  textAlign: 'center',
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    display: 'none',
  },
  marginBottom: 70,
}))

const NotationMobile = styled(Typography)((props) => ({
  display: 'none',
  textAlign: 'left',
  marginBottom: 50,
  [props.theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
    display: 'block',
    width: 327,
  },
}))

function expireDate(timestamp) {
  const time = new Date(timestamp)
  // バックエンドでは決算日時からきっかり15日分を有効日数として保持している
  // ユーザーへの表示としては 14日後で hh:mm を切り捨てる
  time.setDate(time.getDate() - 1)
  const yyyy = time.getFullYear()
  const mm = time.getMonth() + 1 //getMonth() returns 0-11, not 1-12.
  const dd = time.getDate()
  // const h = time.getHours();
  // const m = time.getMinutes();
  return `${yyyy}/${mm}/${dd}`
}

export const Thank = ({ expire }) => {
  const search = useLocation().search
  const giftToken = new URLSearchParams(search).get('token')
  // クーポン決済の際にはprops経由で失効日が渡されてくる
  // 通常の決済ではリダイレクトされて完了ページにくるので、URLから失効日を取得
  if (!expire) {
    expire = new URLSearchParams(search).get('expire')
  }
  if (expire === null) {
    return <Navigate to="/product/choose" />
  }
  const [hostname, setHostname] = useState('')
  const { id: collaboratorId } = useCollaboratorProfile()

  // set gift URL
  // `/giftshare/*` path target is /public/reciever-top.html
  // for separating html meta tags
  // see firebase.json rewrite rules
  let giftLink =
    environment === 'development'
      ? `http://${hostname}/gift?token=${giftToken}`
      : `https://${hostname}/giftshare?token=${giftToken}`
  if (collaboratorId !== 'nocollab') {
    giftLink = `${giftLink}&collab=${collaboratorId}`
  }

  const [copied, setCopied] = useClipboard(giftLink)

  const encodedGiftLink = encodeURIComponent(giftLink)
  const SNS_ICONS = [
    {
      src: '/assets/twitter.svg',
      width: '19px',
      appUrl: `https://twitter.com/share?url=${encodedGiftLink}`,
      analyticsFlag: 'twitter',
    },
    {
      src: '/assets/messenger.svg',
      width: '23px',
      appUrl: isMobile ? `fb-messenger://share?link=${encodedGiftLink}` : 'https://m.me',
      analyticsFlag: 'messenger',
    },
    {
      src: '/assets/line.svg',
      width: '32px',
      appUrl: `https://line.me/R/share?text=${encodedGiftLink}`,
      analyticsFlag: 'LINE',
    },
  ]

  useEffect(() => {
    const { host } = window.location
    setHostname(host)
  }, [])

  return (
    <>
      <MenuAppBar giftBoxButton={false} />
      <Wrap alignItems="center">
        {/* Top Icon */}
        <BackCircle>
          <Box src="/assets/gift-box.png" component="img" />
        </BackCircle>
        {/* Messages */}
        <Header>ギフトリンクを贈りましょう</Header>

        <TextStyle>YOUR GIFT IS READY!</TextStyle>

        <Description>
          お支払いは選ばれたギフトに応じて
          <br />
          <span>後から決済</span>になります。
        </Description>

        <Expires>{`受取期限：${expireDate(expire)}`}</Expires>

        <ButtonWrap gap={2} mt={5}>
          <GradientButton
            buttonType="primary"
            fontSize={15}
            fullWidth
            onClick={() => {
              setCopied()
              dataLayerPush({
                event: 'link copied',
              })
            }}
          >
            <Box component="img" src="/assets/link.svg" width={28} mr="10px" />
            {copied ? 'コピーしました' : 'ギフトリンクをコピーする'}
          </GradientButton>

          <GiftPreview
            giftToken={giftToken}
            button={
              <OutlineButton fullWidth>
                <Typography component="h6">ギフトプレビューを見る</Typography>
              </OutlineButton>
            }
          />
        </ButtonWrap>
        {/* Link To SNS */}
        <SendBySns>LINE・SNS などで贈る</SendBySns>
        <SocialList
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
          mt={3}
          mb={4}
        >
          {SNS_ICONS.map((icon, index) => (
            <SocialLink
              width="50px"
              key={index}
              onClick={() => {
                setCopied()
                window.open(icon.appUrl, '_blank')
                dataLayerPush({
                  event: 'sns opened',
                  snsType: icon.analyticsFlag,
                })
              }}
            >
              <img src={icon.src} />
            </SocialLink>
          ))}
        </SocialList>
        {/* Some Notation */}
        <Notation>
          <NotationPC>
            頂戴したメールアドレスにもギフトリンクを送付しております。
            <br />
            届いてない場合には迷惑メールに入ってる可能性がありますので、お手数ですがご確認ください。
          </NotationPC>
          <NotationMobile>
            頂戴したメールアドレスにもギフトリンクを送付しております。
            届いてない場合には迷惑メールに入ってる可能性がありますので、お手数ですがご確認ください。
          </NotationMobile>
        </Notation>
      </Wrap>
      <Footer />
    </>
  )
}
