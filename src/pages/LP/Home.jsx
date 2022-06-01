import React, { useRef } from 'react'
import { Grid, Box, Container, Typography, CssBaseline } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { useHistory } from 'react-router-dom'

import { MenuAppBar } from '../../organisms/MenuAppBar'
import { SquareButton } from '../../atoms/SquareButton'
import { Image } from 'cloudinary-react'
import { COLOR } from 'theme'
import { useElementInView } from '../../utilities/CommonHooks'
import { optimize } from '../../utilities/Cloudinary'

import { LpTicker } from './componets/LpTicker'
import { LpFooter } from './componets/LpFooter'

const useStyles = makeStyles((theme) => ({
  visible: {
    transition: '1s',
    opacity: 1,
  },
  invisible: {
    transition: '1s',
    opacity: 0,
  },
  centerlizer: {
    textAlign: 'center',
  },
  img: {
    width: '50%',
    objectFit: 'cover',
    /* aspectRatio: '1', */
    borderRadius: '0.5rem',
    // border: `1px solid ${COLOR.quizoutlineGray}`,
    cursor: 'pointer',
  },
  topContainer: {
    marginLeft: '24px',
    marginRight: '24px',
    [theme.breakpoints.down('md')]: {
      margin: '0px',
    },
  },
  top: {
    maxWidth: '1456px',
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative', // for tagLine overlay
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
      display: 'block',
      width: '100%',
    },
  },
  topRightSectionCover: {
    maxWidth: '960px',
    maxHeight: '500px',
    width: '100%',
    objectFit: 'cover',
    cursor: 'pointer',
    backgroundImage: `url(https://res.cloudinary.com/zeft/image/upload/q_auto,f_auto,w_auto,c_fill/v1623768795/zeft_landing/top_fw9nyp.png)`,
    backgroundSize: 'auto auto',
    backgroundRepeat: 'no-repeat',
  },
  topLeftSectionTitle: {
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
    [theme.breakpoints.down('md')]: {
      lineHeight: 1.43,
      fontSize: '14px',
      backgroundColor: COLOR.backgroundWhite,
      bottom: '2rem', // for tagLine overlay
      right: '0', // for tagLine overlay
      width: '240px', // for tagLine overlay
      zIndex: '2', // for tagLine overlay
      padding: '0.3rem 0.5rem',
      marginRight: 0,
    }, // for tagLine overlay
  },
  topLeftSectionContainer: {
    zIndex: 2001,
  },
  topLeftSectionButton: {
    '& a': {
      width: '18rem',
    },
    marginRight: '24px',
    marginTop: '180px', // for tagLine overlay
    [theme.breakpoints.down('md')]: {
      marginTop: '0px', // for tagLine overlay
      display: 'none',
    },
  },
  topButtomSectionButton: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      marginTop: '80px', // for tagLine overlay
      display: 'none',
    },
  },
  solutionCard: {
    padding: '24px',
    border: `1px solid  ${COLOR.quizoutlineGray}`,
    backgroundColor: COLOR.backgroundWhite,
    boxShadow: '0 0 0 0 #da0505',
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto auto auto',
    gridTemplateAreas: `"header" "image" "message"`,
    [theme.breakpoints.up('md')]: {
      padding: '80px',
      gridTemplateColumns: '70% 30%',
      gridTemplateRows: 'auto auto',
      gridTemplateAreas: `"header  image" "message image"`,
    },
  },
  solutionCardContainer: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    color: COLOR.textBlack,
  },
  solutionCardHeader: {
    gridArea: 'header',
    [theme.breakpoints.up('md')]: {
      justifySelf: 'left', // グリッド内で左よりに
    },
  },
  solutionCardImage: {
    gridArea: 'image',
  },
  solutionCardMessage: {
    gridArea: 'message',
  },
  itemImgListSection: {
    backgroundColor: COLOR.tickerGray,
    textAlign: 'center',
  },
  usecaseCard: {
    '& h6': {
      padding: '1rem',
    },
    '& p': {
      textAlign: 'left',
      lineHeight: '1.5rem',
    },
  },
  deleteLinkColor: {
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
  },
}))

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
  const classes = useStyles()

  const fadeInTargetsList = {
    itemImgListSection: false,
    howToUse: false,
    usecaseCard1: false,
    usecaseCard2: false,
    usecaseCard3: false,
    buttonCta: false,
  }

  const targetRef = useRef([])

  const history = useHistory()

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
        <Box className={classes.topContainer}>
          <Box className={classes.top} alignItems="center">
            <Box className={classes.topLeftSectionContainer}>
              <Box className={classes.topLeftSectionTitle}>
                <Typography variant="body2">
                  <p>ギフト診断でぴったりのギフトが見つかる</p>
                </Typography>
                <Typography variant="h6">
                  <b>
                    探す・選ぶ・贈れる<br></br>ここで完結するギフトサービス
                  </b>
                </Typography>
              </Box>
              <Box py={3} className={classes.topLeftSectionButton}>
                <SquareButton
                  fullWidth
                  // href="/product/top"
                  onClick={() => history.push('/product/top')}
                  buttonType="primary"
                  className={classes.deleteLinkColor}
                >
                  まずはギフト診断
                </SquareButton>
              </Box>
            </Box>
            <Box zIndex="modal">
              <Image
                cloudName="quiz_icon_j3tqfr"
                publicId={optimize(
                  'https://res.cloudinary.com/zeft/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1628820889/zeft_landing/element5-digital-HnyPuEgW0O8-unsplash_1_qeftnz.png'
                )}
                className={classes.topRightSectionCover}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Container>
        {/* CTA */}
        <Box py={3} className={classes.topButtomSectionButton}>
          <Box width="100%">
            <SquareButton
              fullWidth
              // href="/product/top"
              onClick={() => history.push('/product/top')}
              buttonType="primary"
              className={classes.deleteLinkColor}
            >
              まずはギフト診断
            </SquareButton>
          </Box>
        </Box>
      </Container>

      {/* how to use section */}
      <Container className={classes.centerlizer}>
        <Grid container>
          <Grid xs={12} sm={12}>
            <Box
              ref={targetRef.current[1]}
              className={
                fadeInTargetsList['howToUse'] ? classes.visible : classes.invisible
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
                fadeInTargetsList['usecaseCard1'] ? classes.visible : classes.invisible
              }
            >
              <Box py={5} px={2} className={classes.usecaseCard}>
                <Image
                  cloudName="thank_xe9nva"
                  publicId={optimize(
                    'https://res.cloudinary.com/zeft/image/upload/v1623768794/zeft_landing/ui1_udz8gc.png'
                  )}
                  className={classes.img}
                />
                <Typography variant="h6">
                  <b>ギフト診断で探す</b>
                </Typography>
                <Typography variant="body2">
                  贈るきっかけやお相手についてのアンケートに回答してください。回答内容から最適な商品をピックアップします。
                </Typography>
              </Box>
            </Box>
          </Grid>
          {/* card 2 */}
          <Grid xs={12} sm={4}>
            <Box
              ref={targetRef.current[3]}
              className={
                fadeInTargetsList['usecaseCard2'] ? classes.visible : classes.invisible
              }
            >
              <Box py={5} px={2} className={classes.usecaseCard}>
                <Image
                  cloudName="thank_xe9nva"
                  publicId={optimize(
                    'https://res.cloudinary.com/zeft/image/upload/v1628821671/zeft_landing/iPhone_12_Pro_6_5_dvxsyp.png'
                  )}
                  className={classes.img}
                />
                <Typography variant="h6">
                  <b>1つから3つまで選べる</b>
                </Typography>
                <Typography variant="body2">
                  アンケートをもとにギフトを表示します。1つ選ぶことも可能ですが3つまで選び、貰い手に1つ選んでもらうことも可能です。
                </Typography>
              </Box>
            </Box>
          </Grid>
          {/* card 3 */}
          <Grid xs={12} sm={4}>
            <Box
              ref={targetRef.current[4]}
              className={
                fadeInTargetsList['usecaseCard3'] ? classes.visible : classes.invisible
              }
            >
              <Box
                py={5}
                px={2}
                ref={targetRef.current[4]}
                className={classes.usecaseCard}
              >
                <Image
                  cloudName="thank_xe9nva"
                  publicId={optimize(
                    'https://res.cloudinary.com/zeft/image/upload/v1623768795/zeft_landing/ui3_jrlr6c.png'
                  )}
                  className={classes.img}
                />
                <Typography variant="h6">
                  <b>オンラインで贈れる</b>
                </Typography>
                <Typography variant="body2">
                  購入したらURLが発行されるので、SNSやメールなどで贈ることが出来ます。またQRコードを印刷したギフトカードも作成可能です。もちろん住所を指定し、届けることも出来ます。
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Ticker */}
      <Box py={5}>
        <Box
          className={
            fadeInTargetsList['itemImgListSection'] ? classes.visible : classes.invisible
          }
        >
          <Box
            ref={targetRef.current[0]}
            pt="50px"
            pb="60px"
            className={classes.itemImgListSection}
          >
            <Typography variant="h5">
              <Box pb="50px">
                <b>
                  バイヤーが厳選した今話題のストーリー性豊かな最新ブランドをお届けします！
                </b>
              </Box>
            </Typography>
            <LpTicker />
          </Box>
        </Box>
      </Box>

      <Container className={classes.centerlizer}>
        {/* buttom CTA */}
        <Box
          py={5}
          ref={targetRef.current[5]}
          className={fadeInTargetsList['buttonCta'] ? classes.visible : classes.invisible}
        >
          <Typography variant="h5">
            <b>最適なギフトをもっと簡単に</b>
          </Typography>
          <Typography variant="body2">
            リンク、ギフトカード、カタログギフト、あなたのシーンにあったギフト体験の作成が簡単にできます。
          </Typography>
          <Box py={3}>
            <SquareButton
              // href="/product/top"
              onClick={() => history.push('/product/top')}
              buttonType="primary"
              className={classes.deleteLinkColor}
            >
              まずはギフト診断
            </SquareButton>
          </Box>
        </Box>
      </Container>
      <LpFooter />
    </React.Fragment>
  )
}
