import React, { useEffect } from 'react'

import { Box, Stack, Typography } from '@mui/material'
import { CatalogueItem } from 'organisms'
import { Product as ProductType } from 'constants/index'
import { useCollaboratorProfile } from 'container/CollaboratorContainer'
import lottie from 'lottie-web'

import laptopAnmation from 'assets/laptop-animation.json'
import mobileAnmation from 'assets/mobile-animation.json'

import { styled } from '@mui/system'

const BREAK_POINT_LARGE = 1240
const BREAK_POINT_SMALL = 700

const AnimationContent = styled(Stack)({
  maxWidth: '551px',
  width: '90%',
  padding: '36px',
  boxShadow: '0px 0px 15px rgba(255, 179, 146, 0.4)',
  backgroundColor: 'rgba(255,255,255, 0.95)',
  borderRadius: '10px',
  marginTop: '5vh',
  position: 'relative',
})

const Title = styled(Typography)((props) => ({
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

const SubTitle = styled(Typography)((props) => ({
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

const SelectMessage = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontDize: '18px',
  fontWeight: '700',
  lineHeight: '27px',
  letterSpacing: '0.03em',
  color: 'rgba(254, 139, 123, 1)',
  marginTop: '2.5vh',
  marginBottom: '2vh',
  [props.theme.breakpoints.down(BREAK_POINT_SMALL)]: {
    marginTop: '20px',
    lineHeight: '20px',
    fontSize: '12px',
  },
}))

const LaptopAnimation = styled(Box)((props) => ({
  [props.theme.breakpoints.down(BREAK_POINT_LARGE)]: {
    display: 'none',
  },
}))

const MobileAnimation = styled(Box)((props) => ({
  display: 'none',
  [props.theme.breakpoints.down(BREAK_POINT_LARGE)]: {
    display: 'block',
  },
}))

const BarImage = styled('img')((props) => ({
  position: 'absolute',
  height: '150px',
  [props.theme.breakpoints.down(BREAK_POINT_SMALL)]: {
    height: '120px',
  },
}))

type PreviewShowProductProps = {
  items: Array<ProductType>
  senderName: string
}

export const PreviewShowProduct: React.FC<PreviewShowProductProps> = ({
  senderName,
  items,
}) => {
  const { pageSettings } = useCollaboratorProfile()

  const { componentSettings } = pageSettings.recieverShowCard

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
                <>ギフトを開封しました</>
              )}
            </Title>
            <SubTitle>OPENED THE GIFT</SubTitle>
            <SelectMessage>
              {items.length > 1 && `${items.length}つのギフトから1つ選択してください`}
            </SelectMessage>
          </Stack>
          <Stack width="100%" gap={2}>
            {items.map((item, index) => (
              <Box sx={{ cursor: 'pointer', height: '20vh' }} key={index}>
                <BarImage src="/assets/gift-opening/bar.png" />
                <CatalogueItem
                  width="100%"
                  img={item.productImageCloudinary[0].secure_url}
                  title={item.title}
                  brand={item.brand.brandName}
                />
              </Box>
            ))}
          </Stack>
        </AnimationContent>
      </Stack>
    </Box>
  )
}
