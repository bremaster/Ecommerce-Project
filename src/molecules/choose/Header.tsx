import React from 'react'
import { Box, Typography, Stack } from '@mui/material'

import { styled } from '@mui/system'

const SubTitle1 = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '32px',
  lineHeight: '40px',
  textAlign: 'center',
  letterSpacing: '0.05em',
  [props.theme.breakpoints.down('md')]: {
    fontSize: '28px',
    lineHeight: 1,
  },
}))

const Title1 = styled(Typography)((props) => ({
  fontFamily: 'Outfit',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px',
  letterSpacing: '0.05em',
  [props.theme.breakpoints.down('md')]: {
    lineHeight: '18px',
  },
}))

const SubTitle2 = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '32px',
  lineHeight: '40px',
  textAlign: 'center',
  letterSpacing: '0.05em',
  color: '#FFFFFF',
  zIndex: 20,
  textShadow: '#000 1px 0 10px',
  [props.theme.breakpoints.down('md')]: {
    fontSize: '28px',
    lineHeight: 1,
  },
}))

const Title2 = styled(Typography)((props) => ({
  fontFamily: 'Outfit',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '22px',
  letterSpacing: '0.05em',
  color: '#FFFFFF',
  textAlign: 'center',
  textShadow: '#000 1px 0 10px',
  [props.theme.breakpoints.down('md')]: {
    lineHeight: '18px',
  },
}))

const Maskback = styled(Box)({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
})

const BottomItemLaptop = styled(Stack)({
  width: '227px',
  height: '64px',
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '15px 18px',
  gap: '8px',
  '& p': {
    fontFamily: 'Noto Sans JP',
    fontSize: '13px',
    lineHeight: '15.6px',
    fontWeight: 700,
  },
})

const BottomMobile = styled(Stack)((props) => ({
  display: 'none',
  width: '310px',
  margin: '30px auto',
  borderBottom: '1px solid #CFCAC4',
  [props.theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}))

const BottomItemMobile = styled(Stack)({
  backgroundColor: 'white',
  gap: '10px',
  padding: '15px 0',
  borderTop: '1px solid #CFCAC4',
  width: '310px',
  '& p': {
    fontFamily: 'Noto Sans JP',
    fontSize: '12px',
    lineHeight: '14.4px',
    fontWeight: 700,
  },
  '& div': {
    width: '35px',
  },
  '& img': {
    height: '20px',
  },
})

const ImageScence = styled(Stack)((props) => ({
  height: '196px',
  width: '100%',
  [props.theme.breakpoints.down('md')]: {
    height: '120px',
  },
}))

const Scene1 = styled(Stack)((props) => ({
  width: '100%',
  background: 'white',
  color: '#4A4A4A',
  height: '196px',
  [props.theme.breakpoints.down('md')]: {
    height: '120px',
  },
}))

const BackImage2 = styled(Box)((props) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  backgroundImage: 'url(/scene/large/wedding.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundPositionX: 'center',
  backgroundPositionY: '-250px',
  [props.theme.breakpoints.down('md')]: {
    backgroundImage: 'url(/scene/small/wedding.jpg)',
    backgroundPositionY: '20%',
    height: '120px',
  },
}))

const BackImage3 = styled(Box)((props) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  backgroundImage: 'url(/scene/large/baby.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: '-300px',
  backgroundPositionX: 'center',
  [props.theme.breakpoints.down('md')]: {
    backgroundImage: 'url(/scene/small/baby.jpg)',
    backgroundPositionY: '20%',
    backgroundSize: '120%',
    height: '120px',
  },
}))

const BackImage4 = styled(Box)((props) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  backgroundImage: 'url(/scene/large/boxes.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundPositionX: 'center',
  backgroundPositionY: '-200px',
  [props.theme.breakpoints.down('md')]: {
    backgroundImage: 'url(/scene/small/boxes.jpg)',
    backgroundPositionY: '40%',
    backgroundSize: '120%',
    height: '120px',
  },
}))

const BackImage5 = styled(Box)((props) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  backgroundImage: 'url(/scene/large/clothes.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: '-330px',
  backgroundPositionX: 'center',
  [props.theme.breakpoints.down('md')]: {
    backgroundImage: 'url(/scene/small/clothes.jpg)',
    backgroundPositionY: '60%',
    backgroundSize: '120%',
    height: '120px',
  },
}))

const BackImage6 = styled(Box)((props) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  backgroundImage: 'url(/scene/large/thanks.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: 'center',
  backgroundPositionX: 'center',
  [props.theme.breakpoints.down('md')]: {
    backgroundImage: 'url(/scene/small/thanks.jpg)',
    backgroundSize: '120%',
    height: '120px',
  },
}))

const BackImage7 = styled(Box)((props) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  backgroundImage: 'url(/scene/large/birthday.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: 'center',
  backgroundPositionX: 'center',
  [props.theme.breakpoints.down('md')]: {
    backgroundImage: 'url(/scene/small/birthday.jpg)',
    backgroundSize: '120%',
    height: '120px',
  },
}))

type Props = {
  scene: string
}

const HeaderMobileBottom = ({ scene }: Props) => {
  return (
    <>
      <Stack
        direction="row"
        position="absolute"
        sx={{ bottom: -15 }}
        gap={'10px'}
        display={{ md: 'flex', xs: 'none' }}
      >
        {(scene === '結婚祝い' || scene === '結婚内祝い') && (
          <BottomItemLaptop direction="row" alignItems="center">
            <Box component="img" src="/scene/icon/image2.svg" sx={{ width: '50px' }} />
            <Typography>{`${scene}に合った 「結びきり」ののし`}</Typography>
          </BottomItemLaptop>
        )}

        {(scene === '出産祝い' || scene === '出産内祝い') && (
          <BottomItemLaptop direction="row" alignItems="center">
            <Box component="img" src="/scene/icon/image2-2.svg" sx={{ width: '50px' }} />
            <Typography>{`${scene}に合った 「蝶結び」ののし`}</Typography>
          </BottomItemLaptop>
        )}
        <BottomItemLaptop direction="row" alignItems="center">
          <Box component="img" src="/scene/icon/image3.svg" sx={{ height: '35px' }} />
          <Typography>「切れる」や凶数など マナーNGな商品なし</Typography>
        </BottomItemLaptop>
      </Stack>
    </>
  )
}

const HeaderLaptopBottom = ({ scene }: Props) => {
  return (
    <>
      <BottomMobile alignItems="center">
        {(scene === '結婚祝い' || scene === '結婚内祝い') && (
          <BottomItemMobile direction="row" alignItems="center">
            <Stack alignItems="center" justifyContent="center">
              <Box component="img" src="/scene/icon/image2.svg" sx={{ width: '40px' }} />
            </Stack>
            <Typography>{`${scene}に合った 「結びきり」ののし`}</Typography>
          </BottomItemMobile>
        )}

        {(scene === '出産祝い' || scene === '出産内祝い') && (
          <BottomItemMobile direction="row" alignItems="center">
            <Stack alignItems="center" justifyContent="center">
              <Box
                component="img"
                src="/scene/icon/image2-2.svg"
                sx={{ width: '40px' }}
              />
            </Stack>
            <Typography>{`${scene}に合った 「蝶結び」ののし`}</Typography>
          </BottomItemMobile>
        )}
        <BottomItemMobile direction="row" alignItems="center">
          <Stack alignItems="center" justifyContent="center">
            <Box component="img" src="/scene/icon/image3.svg" />
          </Stack>
          <Typography>「切れる」や凶数など マナーNGな商品なし</Typography>
        </BottomItemMobile>
      </BottomMobile>
    </>
  )
}

const Header = ({ scene }: Props) => {
  return (
    <>
      {(scene === 'すべてのギフト' || scene === '全てのギフト') && (
        <Scene1
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <SubTitle1>ギフト一覧</SubTitle1>
          <Box mt={{ md: '12px', xs: '10px' }} sx={{ zIndex: 20 }}>
            <Title1>All Gifts</Title1>
          </Box>
        </Scene1>
      )}

      {scene === '結婚祝い' && (
        <>
          <ImageScence
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <BackImage2>
              <Maskback />
            </BackImage2>
            <SubTitle2>結婚祝い</SubTitle2>
            <Box mt={{ md: '12px', xs: '10px' }} sx={{ zIndex: 20 }}>
              <Title2>Wedding Gifts</Title2>
            </Box>
            <HeaderMobileBottom scene={scene} />
          </ImageScence>
          <HeaderLaptopBottom scene={scene} />
        </>
      )}

      {scene === '出産祝い' && (
        <>
          <ImageScence
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <BackImage3>
              <Maskback />
            </BackImage3>
            <SubTitle2>出産祝い</SubTitle2>
            <Box mt={{ md: '12px', xs: '10px' }} sx={{ zIndex: 20 }}>
              <Title2>Baby Gifts</Title2>
            </Box>
            <HeaderMobileBottom scene={scene} />
          </ImageScence>
          <HeaderLaptopBottom scene={scene} />
        </>
      )}

      {scene === '結婚内祝い' && (
        <>
          <ImageScence
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <BackImage4>
              <Maskback />
            </BackImage4>
            <SubTitle2>結婚内祝い</SubTitle2>
            <Box mt={{ md: '12px', xs: '10px' }} sx={{ zIndex: 20 }}>
              <Title2>Gifts In Return</Title2>
            </Box>
            <HeaderMobileBottom scene={scene} />
          </ImageScence>
          <HeaderLaptopBottom scene={scene} />
        </>
      )}

      {scene === '出産内祝い' && (
        <>
          <ImageScence
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <BackImage5>
              <Maskback />
            </BackImage5>
            <SubTitle2>出産内祝い</SubTitle2>
            <Box mt={{ md: '12px', xs: '10px' }} sx={{ zIndex: 20 }}>
              <Title2>Gifts In Return</Title2>
            </Box>
            <HeaderMobileBottom scene={scene} />
          </ImageScence>
          <HeaderLaptopBottom scene={scene} />
        </>
      )}

      {scene === 'お礼' && (
        <>
          <ImageScence
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <BackImage6>
              <Maskback />
            </BackImage6>
            <SubTitle2>お礼</SubTitle2>
            <Box mt={{ md: '12px', xs: '10px' }} sx={{ zIndex: 20 }}>
              <Title2>Thank You</Title2>
            </Box>
          </ImageScence>
        </>
      )}

      {scene === '誕生日' && (
        <>
          <ImageScence
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <BackImage7>
              <Maskback />
            </BackImage7>
            <SubTitle2>誕生日</SubTitle2>
            <Box mt={{ md: '12px', xs: '10px' }} sx={{ zIndex: 20 }}>
              <Title2>Happy Birthday</Title2>
            </Box>
          </ImageScence>
        </>
      )}
    </>
  )
}

export default Header
