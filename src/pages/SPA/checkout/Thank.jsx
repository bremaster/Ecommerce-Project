import React, { useEffect, useState } from 'react'

import { Typography, Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { useLocation } from 'react-router-dom'
import useClipboard from 'react-use-clipboard'
import { isMobile } from 'react-device-detect'

import { SquareButton } from '../../../atoms/SquareButton'
// TODO .d.tsファイルが存在しないため、tsx化するとtype errorを起こす。
// ハンドリング方法要検討
// -> cloudinary の skd をやめたので、ts化可能に
import { Layout } from '../../../templates/Layout'
import { COLOR } from 'theme'
import { useCollaboratorProfile } from 'container/CollaboratorContainer'

const environment = process.env.REACT_APP_ENV // development | staging | production

const useStyles = makeStyles({
  expires: {
    color: COLOR.subOrange,
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '0.1rem',
  },
  backCircle: {
    borderRadius: '50%',
    background: COLOR.gray400,
    display: 'grid',
    placeItems: 'center',
  },
  header: {
    color: COLOR.gray800,
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '0.1rem',
    lineHeight: '25px',
  },
  body1: {
    color: COLOR.gray700,
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontWeight: 'normal',
    lineHeight: '25px',
    letterSpacing: '0.05rem',
  },
  sendBySns: {
    color: COLOR.gray800,
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '20px',
    letterSpacing: '0.05rem',
  },
  notation: {
    color: COLOR.gray800,
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontWeight: 'normal',
    lineHeight: '20px',
    letterSpacing: '0.05rem',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
})

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
  const classes = useStyles()
  const search = useLocation().search
  const giftToken = new URLSearchParams(search).get('token')
  // クーポン決済の際にはprops経由で失効日が渡されてくる
  // 通常の決済ではリダイレクトされて完了ページにくるので、URLから失効日を取得
  if (!expire) {
    expire = new URLSearchParams(search).get('expire')
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
      src: '/assets/twitter.png',
      width: '19px',
      appUrl: `https://twitter.com/share?url=${encodedGiftLink}`,
    },
    {
      src: '/assets/messenger.png',
      width: '23px',
      appUrl: isMobile ? `fb-messenger://share?link=${encodedGiftLink}` : 'https://m.me',
    },
    {
      src: '/assets/line.png',
      width: '32px',
      appUrl: `https://line.me/R/share?text=${encodedGiftLink}`,
    },
  ]

  useEffect(() => {
    const { host } = window.location
    setHostname(host)
  }, [])

  return (
    <Layout>
      {/* Top Icon */}
      <Box
        className={classes.backCircle}
        width="150px"
        height="150px"
        mt="40px"
        mb="50px"
      >
        <img width="90px" src="/assets/gift-box.png" />
      </Box>
      {/* Messages */}
      <Typography className={classes.header}>ギフトの準備が完了しました</Typography>
      <Typography className={classes.body1}>
        作成したギフトリンクをお相手に贈りましょう
      </Typography>
      <Typography className={classes.expires}>
        {`受取期限：${expireDate(expire)}`}
      </Typography>
      <Box width="100%" mt={4} mb={4}>
        <SquareButton buttonType="primary" fullWidth onClick={setCopied}>
          {!copied ? 'ギフトリンクをコピーする' : 'コピーされました！'}
        </SquareButton>
      </Box>
      {/* Link To SNS */}
      <Typography className={classes.sendBySns}>LINE・SNS などで贈る</Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        width="80%"
        mt={2}
        mb={4}
      >
        {SNS_ICONS.map((icon, index) => (
          <Box
            className={classes.backCircle}
            width="50px"
            height="50px"
            key={index}
            onClick={() => {
              setCopied()
              window.open(icon.appUrl, '_blank')
            }}
          >
            <img src={icon.src} width={icon.width} />
          </Box>
        ))}
      </Box>
      {/* Some Notation */}
      <Typography className={classes.notation}>
        頂戴したメールアドレスにもギフトリンクを送付しております。届いていない場合には迷惑メールに入っている可能性がありますのでお手数ですがご確認ください。
      </Typography>
    </Layout>
  )
}
