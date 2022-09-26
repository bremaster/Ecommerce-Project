import React, { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Box, Stack, Typography } from '@mui/material'
import lottie from 'lottie-web'

import { CatalogueItem } from 'organisms'
import { GiftDetail } from 'pages/SPA/choose/GiftDetail'
import { Product } from 'constants/index'
import { Head } from 'utilities/Head'
import { useCollaboratorProfile } from 'container/CollaboratorContainer'

import laptopAnmation from 'assets/laptop-animation.json'
import mobileAnmation from 'assets/mobile-animation.json'

import { styled } from '@mui/system'

const BREAK_POINT_LARGE = 1240
const BREAK_POINT_SMALL = 700

export const AnimationContent = styled(Stack)({
  maxWidth: '551px',
  width: '90%',
  padding: '36px',
  boxShadow: '0px 0px 15px rgba(255, 179, 146, 0.4)',
  backgroundColor: 'rgba(255,255,255, 0.95)',
  borderRadius: '10px',
  marginTop: '5vh',
  position: 'relative',
  marginBottom: '40px',
})

export const Title = styled(Typography)((props) => ({
  fontSize: '32px',
  fontWeight: 700,
  lineHeight: '48px',
  letterSpacing: '0.03em',
  textAlign: 'center',
  color: 'rgba(74, 74, 74, 1)',
  [props.theme.breakpoints.down(BREAK_POINT_SMALL)]: {
    lineHeight: '36px',
    fontSize: '24px',
  },
}))

export const SubTitle = styled(Typography)((props) => ({
  fontFamily: 'Outfit',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '18px',
  letterSpacing: '0.05em',
  marginTop: '8px',
  width: 'fit-content',
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [props.theme.breakpoints.down(BREAK_POINT_SMALL)]: {
    marginTop: 0,
    fontSize: '10px',
  },
}))

export const SelectMessage = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontSize: '18px',
  fontWeight: '700',
  lineHeight: '27px',
  letterSpacing: '0.03em',
  color: '#4A4A4A',
  marginTop: '2.5vh',
  [props.theme.breakpoints.down(BREAK_POINT_SMALL)]: {
    marginTop: '20px',
    lineHeight: '20px',
    fontSize: '12px',
  },
}))

export const ExpiresDate = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '32px',
  letterSpacing: '0.05em',
  textAlign: 'center',
  marginTop: '9px',
  marginBottom: '41px',
  color: '#FE8B7B',
  [props.theme.breakpoints.down(BREAK_POINT_SMALL)]: {
    lineHeight: '20px',
    fontSize: '14px',
  },
}))

export const LaptopAnimation = styled(Box)((props) => ({
  [props.theme.breakpoints.down(BREAK_POINT_LARGE)]: {
    display: 'none',
  },
}))

export const MobileAnimation = styled(Box)((props) => ({
  display: 'none',
  [props.theme.breakpoints.down(BREAK_POINT_LARGE)]: {
    display: 'block',
  },
}))

export const BarImage = styled('img')((props) => ({
  position: 'absolute',
  height: '150px',
  [props.theme.breakpoints.down(BREAK_POINT_SMALL)]: {
    height: '120px',
  },
}))

export const GiftItem = styled(Box)({
  cursor: 'pointer',
  height: '20vh',
})

export const GreyMask = styled(Stack)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  backgroundColor: 'rgba(246, 246, 246, 0.85)',
})

export const GreyText = styled(Stack)({
  fontFamily: 'Noto Sans JP',
  fontSize: '15px',
  fontWeight: 700,
  lineHeight: '30px',
  letterSpacing: '0.03em',
  textAlign: 'center',
  color: 'white',
  padding: '9px 25px',
  borderRadius: '30px',
  backgroundColor: '#8C8C8C',
})

type Props = {
  senderName?: string
  message: string
  products: Product[]
  handleChosen: (num: number) => void
  expires: string | undefined
  expiresDate: string
  selected: boolean
  isPreview?: boolean
}

export const ShowProduct: React.FC<Props> = ({
  senderName = '',
  message = '',
  products,
  handleChosen = () => console.log('test'),
  expires,
  expiresDate,
  selected,
  isPreview,
}) => {
  const navigate = useNavigate()
  const [tappedItemIndex, setTappedItemIndex] = useState<number | undefined>(undefined)

  const handleTapped = (num: number, itemId: string) => {
    setTappedItemIndex(num)
    navigate(`/gift/card/${itemId}`)
  }

  /** メッセージの改行を表現 */
  const formattedMessage = message
    ? message.split('\n').map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item}
            <br />
          </React.Fragment>
        )
      })
    : null

  return (
    <Routes>
      <Route
        index
        element={
          <React.Fragment>
            <Head title="届いたギフト｜ZEFT ゼフト"></Head>
            <RecieverShowGift
              senderName={senderName}
              message={formattedMessage}
              items={products}
              onTapp={handleTapped}
              handleChosen={handleChosen}
              expires={expires}
              expiresDate={expiresDate}
              selected={selected}
            />
          </React.Fragment>
        }
      />
      <Route
        path={`:id`}
        element={
          tappedItemIndex === undefined ? (
            <Navigate to="/gift/card" />
          ) : (
            <>
              <Head title="届いたギフト詳細｜ZEFT ゼフト"></Head>
              <GiftDetail
                isReciever
                item={{
                  ...products[tappedItemIndex],
                  handleClick:
                    tappedItemIndex !== undefined
                      ? () => handleChosen(tappedItemIndex)
                      : () => handleChosen(0),
                  selectableStatus: 'SELECTABLE',
                }}
                isPreview={isPreview}
              />
            </>
          )
        }
      />
    </Routes>
  )
}

type ReciverShowGiftProps = Omit<Props, 'products' | 'message'> & {
  items: Product[]
  onTapp: (num: number, itemId: string) => void
  message: JSX.Element[] | null
  expiresDate: string
  selected: boolean
}

const RecieverShowGift: React.FC<ReciverShowGiftProps> = ({
  senderName,
  items,
  onTapp,
  expiresDate,
  selected,
}) => {
  const { pageSettings } = useCollaboratorProfile()

  const { componentSettings } = pageSettings.recieverShowCard

  const expires = new Date(expiresDate)
  const currenDate = new Date()

  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById('laptop-animation') as HTMLElement,
      animationData: laptopAnmation,
    })
    lottie.loadAnimation({
      container: document.getElementById('mobile-animation') as HTMLElement,
      animationData: mobileAnmation,
    })
  }, [])

  function expireDate(timestamp: number) {
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

  return (
    <Box position="relative" sx={{ height: '100vh', overflow: 'hidden' }}>
      <LaptopAnimation id="laptop-animation" />
      <MobileAnimation id="mobile-animation" />
      <Stack
        alignItems="center"
        position="absolute"
        top={0}
        sx={{ overflow: 'auto' }}
        width="100%"
        height="100%"
      >
        <AnimationContent alignItems="center" className="catalogue__body">
          <Stack direction="column" alignItems="center">
            <Title>
              {senderName === '' ? (
                <>{componentSettings.mainMessageWhenMultiGifts.innerText}</>
              ) : (
                <>
                  <span style={{ fontWeight: 700 }}>{senderName}</span>
                  さんより、ギフトを開封しました。
                </>
              )}
            </Title>
            <SubTitle>OPENED THE GIFT</SubTitle>
            <SelectMessage>
              {items.length > 1 && `${items.length}つのギフトから1つ選択してください`}
            </SelectMessage>
            <ExpiresDate>{`受取期限：${expireDate(Number(expires))}`}</ExpiresDate>
          </Stack>
          <Stack width="100%" gap={2}>
            {items.map((item, index) => (
              <GiftItem key={index} onClick={() => onTapp(index, item.sys.id)}>
                <BarImage src="/assets/gift-opening/bar.png" />
                <CatalogueItem
                  width="100%"
                  img={item.productImageCloudinary[0].secure_url}
                  title={item.title}
                  brand={item.brand.brandName}
                />
              </GiftItem>
            ))}
          </Stack>
          {selected && (
            <GreyMask>
              <GreyText>受取手続き完了</GreyText>
            </GreyMask>
          )}
          {!selected && currenDate > expires && (
            <GreyMask>
              <GreyText>期限切れ</GreyText>
            </GreyMask>
          )}
        </AnimationContent>
      </Stack>
    </Box>
  )
}
