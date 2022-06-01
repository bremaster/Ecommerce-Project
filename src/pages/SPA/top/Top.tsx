import React from 'react'
import { Box, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { useHistory } from 'react-router-dom'
import { COLOR } from 'theme'
import { LogoWhite } from '../../../atoms/Logo-white'
import { ReactComponent as BlueCircleSVG } from '../../../atoms/blue-circle.svg'
import { ReactComponent as GoldCircleSVG } from '../../../atoms/gold-circle.svg'
import { ReactComponent as PinkCircleSVG } from '../../../atoms/pink-circle.svg'
import { ReactComponent as GreenCircleSVG } from '../../../atoms/green-circle.svg'
import { SquareButton } from '../../../atoms/SquareButton'

const useStyles = makeStyles((theme) => ({
  background: {
    width: '100%',
    // height: '100%',  // height:100% doesn't work due to parent empty div made by Router
    height: '100vh',
    backgroundColor: COLOR.primaryNavy,
  },
  gridContainer: {
    padding: '0 1rem',
    maxWidth: 'sm',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 20%)',
    gridTemplateRows: 'repeat(5, 20%)',
    gap: '0px 0px',
  },
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& img': {
      gridRow: '1 / 2',
      gridColumn: '1 / 6',
      justifySelf: 'center',
      alignSelf: 'start',
      marginTop: '2rem',
      zIndex: 3,
    },
  },
  message: {
    color: COLOR.gray100,
    gridRow: '2 / 4',
    gridColumn: '1 / 6',
  },
  body: {
    color: COLOR.gray100,
    marginBottom: '1rem',
    letterSpacing: '0.1em',
    [theme.breakpoints.up('md')]: {
      // 画面サイズ大きくなると改行位置が不自然だったので
      whiteSpace: 'pre',
    },
    lineHeight: 'normal',
  },
  header: {
    fontSize: '24px',
    marginBottom: '1rem',
    letterSpacing: '0.1em',
    color: COLOR.gray100,
  },
  notice: {
    color: COLOR.gray100,
    letterSpacing: '0.1em',
  },
  circlBlue: { gridRow: '1 / 2', gridColumn: '3 / 4' },
  circleGold: { gridRow: '3 / 4', gridColumn: '2 / 3' },
  circlePink: { gridRow: '3 / 4', gridColumn: '4 / 5', alignSelf: 'center' },
  circleGreen: {
    gridRow: '5 / 6',
    gridColumn: '2 / 3',
    alignSelf: 'end',
    justifySelf: 'center',
  },
  cta: {
    alignSelf: 'start',
  },
}))

export const Top: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()

  const handleCTAClicked = () => {
    // too fast. wait 150 msec
    setTimeout(() => {
      history.push('/product/quiz/1')
    }, 150)
  }

  return (
    <Box className={`${classes.background}`}>
      {/* <Layout> */}
      <Box className={classes.root}>
        <Box className={classes.gridContainer}>
          <LogoWhite />
          <BlueCircleSVG className={classes.circlBlue} />
          <GoldCircleSVG className={classes.circleGold} />
          <PinkCircleSVG className={classes.circlePink} />
          <GreenCircleSVG className={classes.circleGreen} />
          <Box className={classes.message}>
            <Typography className={classes.header}>ようこそ、ZEFT へ</Typography>
            <Typography className={classes.body}>
              {
                'アンケートに答えることで、今のあなたにぴったりのギフトを提案します。\nその中から3つまでをギフトリストとして贈れます。'
              }
            </Typography>
            <Typography className={classes.notice}>
              ※ お相手が1つ選び、受け取ります。
            </Typography>
          </Box>
          <SquareButton
            buttonType="white"
            className={classes.cta}
            onClick={handleCTAClicked}
          >
            START
          </SquareButton>
        </Box>
      </Box>
      {/* </Layout> */}
    </Box>
  )
}
