import React, { useState, useEffect } from 'react'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { Switch, Route, useRouteMatch, useHistory, Redirect } from 'react-router-dom'
import { Box, Stack, Typography } from '@mui/material'
import { CatalogueItem, GiftDetail } from 'organisms'
import { COLOR } from 'theme'
import { ProductWithHandlerAndStatus } from 'constants/index'
import { Head } from 'utilities/Head'
import { useCollaboratorProfile } from 'container/CollaboratorContainer'
import lottie from 'lottie-web'

import laptopAnmation from 'assets/laptop-animation.json'
import mobileAnmation from 'assets/mobile-animation.json'

const BREAK_POINT_LARGE = 1240
const BREAK_POINT_SMALL = 700

const useStyles = makeStyles((theme) =>
  createStyles({
    senderName: {
      fontWeight: 700,
    },
    cardTitle: {
      textAlign: 'start',
      '& p': {
        fontSize: '14px',
        fontWeight: 700,
        lineHeight: '30px',
      },
    },
    messageBox: {
      border: `solid 1px ${COLOR.borderGray}`,
      borderRadius: '4px',
      padding: '24px',
    },
    animationWrapper: {
      height: '100vh',
      overflow: 'hidden',
    },
    animationContent: {
      maxWidth: '551px',
      width: '90%',
      padding: '36px',
      boxShadow: '0px 0px 15px rgba(255, 179, 146, 0.4)',
      backgroundColor: 'rgba(255,255,255, 0.95)',
      borderRadius: '10px',
      marginTop: '5vh',
    },
    title: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '48px',
      letterSpacing: '0.03em',
      textAlign: 'center',
      color: 'rgba(74, 74, 74, 1)',
      [theme.breakpoints.down(BREAK_POINT_SMALL)]: {
        lineHeight: '36px',
        fontSize: '24px',
      },
    },
    subTitle: {
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
      [theme.breakpoints.down(BREAK_POINT_SMALL)]: {
        marginTop: 0,
        fontSize: '10px',
      },
    },
    selectMessage: {
      fontFamily: 'Noto Sans JP',
      fontDize: '18px',
      fontWeight: '700',
      lineHeight: '27px',
      letterSpacing: '0.03em',
      color: 'rgba(254, 139, 123, 1)',
      marginTop: '2.5vh',
      marginBottom: '2vh',
      [theme.breakpoints.down(BREAK_POINT_SMALL)]: {
        marginTop: '20px',
        lineHeight: '20px',
        fontSize: '12px',
      },
    },
    laptopAnimation: {
      [theme.breakpoints.down(BREAK_POINT_LARGE)]: {
        display: 'none',
      },
    },
    mobileAnimation: {
      display: 'none',
      [theme.breakpoints.down(BREAK_POINT_LARGE)]: {
        display: 'block',
      },
    },
    bar_image: {
      position: 'absolute',
      [theme.breakpoints.down(BREAK_POINT_SMALL)]: {
        height: '120px',
      },
    },
    gift_item: {
      cursor: 'pointer',
      height: '20vh',
    },
  })
)

type Props = {
  senderName?: string
  message: string
  products: ProductWithHandlerAndStatus[]
  handleChosen: (num: number) => void
  expires: string | undefined
}

export const ShowProduct: React.FC<Props> = ({
  senderName = '',
  message = '',
  products,
  handleChosen = () => console.log('test'),
  expires,
}) => {
  const history = useHistory()
  const { path } = useRouteMatch()
  const [tappedItemIndex, setTappedItemIndex] = useState<number | undefined>(undefined)

  const handleTapped = (num: number, itemId: string) => {
    setTappedItemIndex(num)
    history.push(`${path}/${itemId}`)
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
    <Switch>
      <Route exact path={path}>
        <Head title="届いたギフト｜ZEFT ゼフト"></Head>
        <RecieverShowGift
          senderName={senderName}
          message={formattedMessage}
          items={products}
          onTapp={handleTapped}
          handleChosen={handleChosen}
          expires={expires}
        />
      </Route>
      <Route exact path={`${path}/:id`}>
        {tappedItemIndex === undefined ? (
          <Redirect to="./" />
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
      </Route>
    </Switch>
  )
}

type ReciverShowGiftProps = Omit<Props, 'products' | 'message'> & {
  items: ProductWithHandlerAndStatus[]
  onTapp: (num: number, itemId: string) => void
  message: JSX.Element[] | null
}

const RecieverShowGift: React.FC<ReciverShowGiftProps> = ({
  senderName,
  items,
  onTapp,
}) => {
  const classes = useStyles()
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
    <Box position="relative" className={classes.animationWrapper}>
      <Box id="laptop-animation" className={classes.laptopAnimation}></Box>
      <Box id="mobile-animation" className={classes.mobileAnimation}></Box>
      <Stack alignItems="center" position="absolute" top={0} width="100%" height="100%">
        <Stack
          alignItems="center"
          className={classes.animationContent + ' catalogue__body'}
        >
          <Stack direction="column" alignItems="center">
            <Typography className={classes.title}>
              {senderName === '' ? (
                <>{componentSettings.mainMessageWhenMultiGifts.innerText}</>
              ) : (
                <>
                  <span className={classes.senderName}>{senderName}</span>
                  さんより、ギフトが届きました。
                </>
              )}
            </Typography>
            <Typography className={classes.subTitle}>OPENED THE GIFT</Typography>
            <Typography className={classes.selectMessage}>
              {items.length}つのギフトから一つ選択してください
            </Typography>
          </Stack>
          <Stack width="100%" gap={2}>
            {items.map((item, index) => (
              <Box
                className={classes.gift_item}
                key={index}
                onClick={() => onTapp(index, item.sys.id)}
              >
                <img className={classes.bar_image} src="/assets/gift-opening/bar.svg" />
                <CatalogueItem
                  width="100%"
                  img={item.productImageCloudinary[0].secure_url}
                  title={item.title}
                  brand={item.brand.brandName}
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
