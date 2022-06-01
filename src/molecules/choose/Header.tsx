import React from 'react'
import { Box, Typography, Stack } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

const useHeaderStyle = makeStyles((theme) =>
  createStyles({
    subTitle1: {
      fontFamily: 'Outfit',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '32px',
      lineHeight: '40px',
      textAlign: 'center',
      letterSpacing: '0.05em',
    },
    title1: {
      fontFamily: 'Noto Sans JP',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '0.05em',
    },
    subTitle2: {
      fontFamily: 'Outfit',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '32px',
      lineHeight: '40px',
      textAlign: 'center',
      letterSpacing: '0.05em',
      color: '#FFFFFF',
    },
    title2: {
      fontFamily: 'Noto Sans JP',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '0.05em',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    scene1: {
      background:
        'linear-gradient(102.49deg, #FFECDD -12.51%, #FFE0DB 56.55%, #DED7FF 166.15%)',
      height: '196px',
      width: '100%',
      color: '#4A4A4A',
    },
    scene2: {
      height: '250px',
      width: '100%',
      backgroundImage: 'url(/scene/large/wedding.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: 'center',
      backgroundPositionY: '-250px',
      [theme.breakpoints.down(900)]: {
        backgroundImage: 'url(/scene/small/wedding.jpg)',
        backgroundPositionY: '60%',
        backgroundSize: '120%',
        height: '160px',
      },
    },
    scene3: {
      height: '250px',
      width: '100%',
      backgroundImage: 'url(/scene/large/baby.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundPositionY: '-300px',
      backgroundPositionX: 'center',
      [theme.breakpoints.down(900)]: {
        backgroundImage: 'url(/scene/small/baby.jpg)',
        backgroundPositionY: '60%',
        backgroundSize: '120%',
        height: '160px',
      },
    },
    scene4: {
      height: '250px',
      width: '100%',
      backgroundImage: 'url(/scene/large/boxes.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: 'center',
      backgroundPositionY: '-200px',
      [theme.breakpoints.down(900)]: {
        backgroundImage: 'url(/scene/small/boxes.jpg)',
        backgroundPositionY: '60%',
        backgroundSize: '120%',
        height: '160px',
      },
    },
    scene5: {
      height: '250px',
      width: '100%',
      backgroundImage: 'url(/scene/large/clothes.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundPositionY: '-330px',
      backgroundPositionX: 'center',
      [theme.breakpoints.down(900)]: {
        backgroundImage: 'url(/scene/small/clothes.jpg)',
        backgroundPositionY: '60%',
        backgroundSize: '120%',
        height: '160px',
      },
    },
    bottomlaptop: {
      bottom: -15,
      gap: 10,
      [theme.breakpoints.down(900)]: {
        display: 'none',
      },
    },
    bottomitemlaptop: {
      width: '227px',
      height: '64px',
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '15px 26px',
      gap: '8px',
      '& p': {
        fontFamily: 'Noto Sans JP',
        fontSize: '13px',
        lineHeight: '15.6px',
        fontWeight: 700,
      },
    },
    bottommobile: {
      display: 'none',
      width: '310px',
      margin: '30px auto',
      borderBottom: '1px solid #B0B0B0',
      [theme.breakpoints.down(900)]: {
        display: 'flex',
      },
    },
    bottomItemMobile: {
      backgroundColor: 'white',
      gap: '10px',
      padding: '15px 0',
      borderTop: '1px solid #B0B0B0',
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
    },
  })
)

type Props = {
  scene: string
}

const HeaderMobileBottom = () => {
  const classes = useHeaderStyle()

  return (
    <>
      <Stack direction="row" position="absolute" className={classes.bottomlaptop}>
        <Stack
          direction="row"
          alignItems="center"
          display="none"
          className={classes.bottomitemlaptop}
        >
          <Box component="img" src="/scene/icon/image1.svg" sx={{ height: '30px' }} />
          <Typography>大安、先勝など吉日 を指定して送れます</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" className={classes.bottomitemlaptop}>
          <Box component="img" src="/scene/icon/image2.svg" sx={{ height: '20px' }} />
          <Typography>結婚祝いに合った 「結びきり」ののし</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" className={classes.bottomitemlaptop}>
          <Box component="img" src="/scene/icon/image3.svg" sx={{ height: '25px' }} />
          <Typography>「切れる」や凶数など マナーNGな商品なし</Typography>
        </Stack>
      </Stack>
    </>
  )
}

const HeaderLaptopBottom = () => {
  const classes = useHeaderStyle()

  return (
    <>
      <Stack alignItems="center" className={classes.bottommobile}>
        <Stack
          direction="row"
          alignItems="center"
          display="none"
          className={classes.bottomItemMobile}
        >
          <Stack alignItems="center" justifyContent="center">
            <Box component="img" src="/scene/icon/image2.svg" />
          </Stack>
          <Typography>結婚祝いに合った 「結びきり」ののし</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" className={classes.bottomItemMobile}>
          <Stack alignItems="center" justifyContent="center">
            <Box component="img" src="/scene/icon/image1.svg" />
          </Stack>
          <Typography>大安、先勝など吉日 を指定して送れます</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" className={classes.bottomItemMobile}>
          <Stack alignItems="center" justifyContent="center">
            <Box component="img" src="/scene/icon/image3.svg" />
          </Stack>
          <Typography>「切れる」や凶数など マナーNGな商品なし</Typography>
        </Stack>
      </Stack>
    </>
  )
}

const Header = ({ scene }: Props) => {
  const classes = useHeaderStyle()

  return (
    <>
      {(scene === 'すべてのギフト' || scene === '全てのギフト') && (
        <Box
          className={classes.scene1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography className={classes.subTitle1}>ALL</Typography>
          <Box mt="12px">
            <Typography className={classes.title1}>
              ZEFTで取り揃えているギフト全一覧です。
            </Typography>
          </Box>
        </Box>
      )}

      {scene === '結婚祝い' && (
        <>
          <Box
            className={classes.scene2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <Typography className={classes.subTitle2}>結婚祝い</Typography>
            <Box mt="12px" display={{ md: 'block', xs: 'none' }}>
              <Typography className={classes.title2}>
                ZEFTの結婚祝いならマナー&ルール対応も安心
              </Typography>
            </Box>
            <Box mt="12px" display={{ md: 'none', xs: 'block' }}>
              <Typography className={classes.title2}>
                ZEFTの結婚祝いなら
                <br />
                マナー&ルール対応も安心
              </Typography>
            </Box>
            <HeaderMobileBottom />
          </Box>
          <HeaderLaptopBottom />
        </>
      )}

      {scene === '出産祝い' && (
        <>
          <Box
            className={classes.scene3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <Typography className={classes.subTitle2}>出産祝い</Typography>
            <Box mt="12px" display={{ md: 'block', xs: 'none' }}>
              <Typography className={classes.title2}>
                ZEFTの出産祝いならマナー&ルール対応も安心
              </Typography>
            </Box>
            <Box mt="12px" display={{ md: 'none', xs: 'block' }}>
              <Typography className={classes.title2}>
                ZEFTの出産祝いなら
                <br />
                マナー&ルール対応も安心
              </Typography>
            </Box>
            <HeaderMobileBottom />
          </Box>
          <HeaderLaptopBottom />
        </>
      )}

      {scene === '結婚内祝い' && (
        <>
          <Box
            className={classes.scene4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <Typography className={classes.subTitle2}>結婚内祝い</Typography>
            <Box mt="12px" display={{ md: 'block', xs: 'none' }}>
              <Typography className={classes.title2}>
                ZEFTの結婚内祝いならマナー&ルール対応も安心
              </Typography>
            </Box>
            <Box mt="12px" display={{ md: 'none', xs: 'block' }}>
              <Typography className={classes.title2}>
                ZEFTの結婚内祝いなら
                <br />
                マナー&ルール対応も安心
              </Typography>
            </Box>
            <HeaderMobileBottom />
          </Box>
          <HeaderLaptopBottom />
        </>
      )}

      {scene === '出産内祝い' && (
        <>
          <Box
            className={classes.scene5}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <Typography className={classes.subTitle2}>出産内祝い</Typography>
            <Box mt="12px" display={{ md: 'block', xs: 'none' }}>
              <Typography className={classes.title2}>
                ZEFTの出産内祝いならマナー&ルール対応も安心
              </Typography>
            </Box>
            <Box mt="12px" display={{ md: 'none', xs: 'block' }}>
              <Typography className={classes.title2}>
                ZEFTの出産内祝いなら
                <br />
                マナー&ルール対応も安心
              </Typography>
            </Box>
            <HeaderMobileBottom />
          </Box>
          <HeaderLaptopBottom />
        </>
      )}
    </>
  )
}

export default Header
