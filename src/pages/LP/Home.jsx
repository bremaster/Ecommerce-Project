import React, { useRef } from 'react'
import { Grid, Box, Container, Typography, CssBaseline } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { MenuAppBar } from '../../organisms/MenuAppBar'
import { SquareButton } from '../../atoms/SquareButton'
import { Image } from 'cloudinary-react'
import { COLOR } from 'theme'
import { useElementInView } from '../../utilities/CommonHooks'
import { optimize } from '../../utilities/Cloudinary'

import { LpTicker } from './componets/LpTicker'
import { LpFooter } from './componets/LpFooter'

import { styled } from '@mui/system'

const StyledImage = styled(Image)({
  width: '50%',
  objectFit: 'cover',
  borderRadius: '0.5rem',
  cursor: 'pointer',
})

const TopContainer = styled(Box)((props) => ({
  marginLeft: '24px',
  marginRight: '24px',
  [props.theme.breakpoints.down('md')]: {
    margin: '0px',
  },
}))

const Top = styled(Box)((props) => ({
  maxWidth: '1456px',
  marginRight: 'auto',
  marginLeft: 'auto',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  position: 'relative', // for tagLine overlay
  [props.theme.breakpoints.down('md')]: {
    marginLeft: '0px',
    display: 'block',
    width: '100%',
  },
}))

const TopRightSectionCover = styled(Image)({
  maxWidth: '960px',
  maxHeight: '500px',
  width: '100%',
  objectFit: 'cover',
  cursor: 'pointer',
  backgroundImage: `url(https://res.cloudinary.com/zeft/image/upload/q_auto,f_auto,w_auto,c_fill/v1623768795/zeft_landing/top_fw9nyp.png)`,
  backgroundSize: 'auto auto',
  backgroundRepeat: 'no-repeat',
})

const TopLeftSectionTitle = styled(Box)((props) => ({
  // border: `1px solid  ${COLOR.quizoutlineGray}`,
  boxShadow: '0 0 0 0 #da0505',
  fontSize: '20px',
  lineHeight: 1.2,
  position: 'absolute',
  '& b': {
    fontWeight: 900,
    lineHeight: 1.5,
    // color: COLOR.textBlack,  // use default black to avoid low contrast
  },
  [props.theme.breakpoints.down('md')]: {
    lineHeight: 1.43,
    fontSize: '14px',
    backgroundColor: COLOR.backgroundWhite,
    bottom: '2rem', // for tagLine overlay
    right: '0', // for tagLine overlay
    width: '240px', // for tagLine overlay
    zIndex: '2', // for tagLine overlay
    padding: '0.3rem 0.5rem',
    marginRight: 0,
  },
}))

const TopLeftSectionButton = styled(Box)((props) => ({
  '& a': {
    width: '18rem',
  },
  marginRight: '24px',
  marginTop: '180px', // for tagLine overlay
  [props.theme.breakpoints.down('md')]: {
    marginTop: '0px', // for tagLine overlay
    display: 'none',
  },
}))

const TopButtomSectionButton = styled(Box)((props) => ({
  textAlign: 'center',
  [props.theme.breakpoints.up('md')]: {
    marginTop: '80px', // for tagLine overlay
    display: 'none',
  },
}))

const ItemImgListSection = styled(Box)({
  backgroundColor: COLOR.tickerGray,
  textAlign: 'center',
})

const UsecaseCard = styled(Box)({
  '& h6': {
    padding: '1rem',
  },
  '& p': {
    textAlign: 'left',
    lineHeight: '1.5rem',
  },
})

const DeleteLinkColor = styled(SquareButton)({
  /* visited link */
  '&:visited': {
    color: COLOR.textWhite,
  },
  /* mouse over link */
  '&:hover': {
    color: COLOR.textWhite,
  },
  /* selected link */
  '&:active': {
    color: COLOR.textWhite,
  },
})

const visibleStyles = {
  visible: {
    transition: '1s',
    opacity: 1,
  },
  invisible: {
    transition: '1s',
    opacity: 0,
  },
}

/**
 * Logoの位置をアプリ本体と合わせるため
 */
const HeadPadding = () => {
  return (
    <>
      <CssBaseline />
      <Box pt={2}></Box>
    </>
  )
}

export function Home() {
  const fadeInTargetsList = {
    itemImgListSection: false,
    howToUse: false,
    usecaseCard1: false,
    usecaseCard2: false,
    usecaseCard3: false,
    buttonCta: false,
  }

  const targetRef = useRef([])

  const navigate = useNavigate()

  Object.entries(fadeInTargetsList).map((_, key) => {
    targetRef.current[key] = React.createRef()
  })

  fadeInTargetsList['itemImgListSection'] = useElementInView(targetRef.current[0])
  fadeInTargetsList['howToUse'] = useElementInView(targetRef.current[1])
  fadeInTargetsList['usecaseCard1'] = useElementInView(targetRef.current[2])
  fadeInTargetsList['usecaseCard2'] = useElementInView(targetRef.current[3])
  fadeInTargetsList['usecaseCard3'] = useElementInView(targetRef.current[4])
  fadeInTargetsList['buttonCta'] = useElementInView(targetRef.current[5])

  return (
    <React.Fragment>
      <HeadPadding />
      <MenuAppBar />
      {/* Cover */}
      <Box pb={5} mt={2}>
        <TopContainer>
          <Top alignItems="center">
            <Box sx={{ zIndex: 2001 }}>
              <TopLeftSectionTitle>
                <Typography variant="body2">
                  <p>ギフト診断でぴったりのギフトが見つかる</p>
                </Typography>
                <Typography variant="h6">
                  <b>
                    探す・選ぶ・贈れる<br></br>ここで完結するギフトサービス
                  </b>
                </Typography>
              </TopLeftSectionTitle>
              <TopLeftSectionButton py={3}>
                <DeleteLinkColor
                  fullWidth
                  // href="/product/top"
                  onClick={() => navigate('/product/top')}
                  buttonType="primary"
                >
                  まずはギフト診断
                </DeleteLinkColor>
              </TopLeftSectionButton>
            </Box>
            <Box zIndex="modal">
              <TopRightSectionCover
                cloudName="quiz_icon_j3tqfr"
                publicId={optimize(
                  'https://res.cloudinary.com/zeft/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1628820889/zeft_landing/element5-digital-HnyPuEgW0O8-unsplash_1_qeftnz.png'
                )}
              />
            </Box>
          </Top>
        </TopContainer>
      </Box>

      <Container>
        {/* CTA */}
        <TopButtomSectionButton py={3}>
          <Box width="100%">
            <DeleteLinkColor
              fullWidth
              // href="/product/top"
              onClick={() => navigate('/product/top')}
              buttonType="primary"
            >
              まずはギフト診断
            </DeleteLinkColor>
          </Box>
        </TopButtomSectionButton>
      </Container>

      {/* how to use section */}
      <Container sx={{ textAlign: 'center' }}>
        <Grid container>
          <Grid xs={12} sm={12}>
            <Box
              ref={targetRef.current[1]}
              className={
                fadeInTargetsList['howToUse']
                  ? visibleStyles.visible
                  : visibleStyles.invisible
              }
              py={5}
            >
              <Typography variant="h5">
                <b>
                  ZEFTの<br></br>
                  <u>特別な３の機能</u>
                </b>
              </Typography>
              {/* <Typography>３つのメリット</Typography> */}
            </Box>
          </Grid>
          {/* card 1 */}
          <Grid xs={12} sm={4}>
            <Box
              ref={targetRef.current[2]}
              className={
                fadeInTargetsList['usecaseCard1']
                  ? visibleStyles.visible
                  : visibleStyles.invisible
              }
            >
              <UsecaseCard py={5} px={2}>
                <StyledImage
                  cloudName="thank_xe9nva"
                  publicId={optimize(
                    'https://res.cloudinary.com/zeft/image/upload/v1623768794/zeft_landing/ui1_udz8gc.png'
                  )}
                />
                <Typography variant="h6">
                  <b>ギフト診断で探す</b>
                </Typography>
                <Typography variant="body2">
                  贈るきっかけやお相手についてのアンケートに回答してください。回答内容から最適な商品をピックアップします。
                </Typography>
              </UsecaseCard>
            </Box>
          </Grid>
          {/* card 2 */}
          <Grid xs={12} sm={4}>
            <Box
              ref={targetRef.current[3]}
              className={
                fadeInTargetsList['usecaseCard2']
                  ? visibleStyles.visible
                  : visibleStyles.invisible
              }
            >
              <UsecaseCard py={5} px={2}>
                <StyledImage
                  cloudName="thank_xe9nva"
                  publicId={optimize(
                    'https://res.cloudinary.com/zeft/image/upload/v1628821671/zeft_landing/iPhone_12_Pro_6_5_dvxsyp.png'
                  )}
                />
                <Typography variant="h6">
                  <b>1つから3つまで選べる</b>
                </Typography>
                <Typography variant="body2">
                  アンケートをもとにギフトを表示します。1つ選ぶことも可能ですが3つまで選び、貰い手に1つ選んでもらうことも可能です。
                </Typography>
              </UsecaseCard>
            </Box>
          </Grid>
          {/* card 3 */}
          <Grid xs={12} sm={4}>
            <Box
              ref={targetRef.current[4]}
              className={
                fadeInTargetsList['usecaseCard3']
                  ? visibleStyles.visible
                  : visibleStyles.invisible
              }
            >
              <UsecaseCard py={5} px={2} ref={targetRef.current[4]}>
                <StyledImage
                  cloudName="thank_xe9nva"
                  publicId={optimize(
                    'https://res.cloudinary.com/zeft/image/upload/v1623768795/zeft_landing/ui3_jrlr6c.png'
                  )}
                />
                <Typography variant="h6">
                  <b>オンラインで贈れる</b>
                </Typography>
                <Typography variant="body2">
                  購入したらURLが発行されるので、SNSやメールなどで贈ることが出来ます。またQRコードを印刷したギフトカードも作成可能です。もちろん住所を指定し、届けることも出来ます。
                </Typography>
              </UsecaseCard>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Ticker */}
      <Box py={5}>
        <Box
          className={
            fadeInTargetsList['itemImgListSection']
              ? visibleStyles.visible
              : visibleStyles.invisible
          }
        >
          <ItemImgListSection ref={targetRef.current[0]} pt="50px" pb="60px">
            <Typography variant="h5">
              <Box pb="50px">
                <b>
                  バイヤーが厳選した今話題のストーリー性豊かな最新ブランドをお届けします！
                </b>
              </Box>
            </Typography>
            <LpTicker />
          </ItemImgListSection>
        </Box>
      </Box>

      <Container sx={{ textAlign: 'center' }}>
        {/* buttom CTA */}
        <Box
          py={5}
          ref={targetRef.current[5]}
          className={
            fadeInTargetsList['buttonCta']
              ? visibleStyles.visible
              : visibleStyles.invisible
          }
        >
          <Typography variant="h5">
            <b>最適なギフトをもっと簡単に</b>
          </Typography>
          <Typography variant="body2">
            リンク、ギフトカード、カタログギフト、あなたのシーンにあったギフト体験の作成が簡単にできます。
          </Typography>
          <Box py={3}>
            <DeleteLinkColor
              // href="/product/top"
              onClick={() => navigate('/product/top')}
              buttonType="primary"
            >
              まずはギフト診断
            </DeleteLinkColor>
          </Box>
        </Box>
      </Container>
      <LpFooter />
    </React.Fragment>
  )
}
