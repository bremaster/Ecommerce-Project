import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Box, Stack } from '@mui/material'
import { CatalogueItem } from 'organisms'
import { GiftDetail } from 'pages/SPA/choose/GiftDetail'
import { ProductWithHandlerAndStatus } from 'constants/index'
import { Head } from 'utilities/Head'
import { useCollaboratorProfile } from 'container/CollaboratorContainer'
import lottie from 'lottie-web'

import laptopAnmation from 'assets/laptop-animation.json'
import mobileAnmation from 'assets/mobile-animation.json'

import {
  AnimationContent,
  Title,
  SubTitle,
  SelectMessage,
  LaptopAnimation,
  MobileAnimation,
  BarImage,
  GiftItem,
  GreyMask,
  GreyText,
} from 'pages/SPA/reciever/checkout/ReShowProduct'

type Props = {
  senderName?: string
  message: string
  products: ProductWithHandlerAndStatus[]
  handleChosen: (num: number) => void
  expires: string | undefined
  expiresDate: string
  selected: boolean
}

export const PreviewGift: React.FC<Props> = ({
  senderName = '',
  message = '',
  products,
  handleChosen = () => console.log('test'),
  expires,
  expiresDate,
  selected,
}) => {
  const navigate = useNavigate()
  const [tappedItemIndex, setTappedItemIndex] = useState<number | undefined>(undefined)

  const handleTapped = (num: number, itemId: string) => {
    setTappedItemIndex(num)
    navigate(`/gift/preview/${itemId}`)
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
          <React.Fragment>
            {tappedItemIndex === undefined ? (
              <Navigate to="./" />
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
                  }}
                />
              </>
            )}
          </React.Fragment>
        }
      />
    </Routes>
  )
}

type ReciverShowGiftProps = Omit<Props, 'products' | 'message'> & {
  items: ProductWithHandlerAndStatus[]
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

  return (
    <Box position="relative" sx={{ height: '100vh', overflow: 'hidden' }}>
      <LaptopAnimation id="laptop-animation" />
      <MobileAnimation id="mobile-animation" />
      <Stack alignItems="center" position="absolute" top={0} width="100%" height="100%">
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
