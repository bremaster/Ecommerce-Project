import React from 'react'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { COLOR } from 'theme'
import { LogoWhite } from '../../../atoms/Logo-white'
import { ReactComponent as BlueCircleSVG } from '../../../atoms/blue-circle.svg'
import { ReactComponent as GoldCircleSVG } from '../../../atoms/gold-circle.svg'
import { ReactComponent as PinkCircleSVG } from '../../../atoms/pink-circle.svg'
import { ReactComponent as GreenCircleSVG } from '../../../atoms/green-circle.svg'
import { SquareButton } from '../../../atoms/SquareButton'

import { styled } from '@mui/system'

const Background = styled(Box)({
  width: '100%',
  // height: '100%',  // height:100% doesn't work due to parent empty div made by Router
  height: '100vh',
  backgroundColor: COLOR.primaryNavy,
})

const GridContainer = styled(Box)({
  padding: '0 1rem',
  maxWidth: 'sm',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 20%)',
  gridTemplateRows: 'repeat(5, 20%)',
  gap: '0px 0px',
})

const Root = styled(Box)({
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
})

const Message = styled(Box)({
  color: COLOR.gray100,
  gridRow: '2 / 4',
  gridColumn: '1 / 6',
})

const Body = styled(Typography)((props) => ({
  color: COLOR.gray100,
  marginBottom: '1rem',
  letterSpacing: '0.1em',
  [props.theme.breakpoints.up('md')]: {
    // 画面サイズ大きくなると改行位置が不自然だったので
    whiteSpace: 'pre',
  },
  lineHeight: 'normal',
}))

const Header = styled(Typography)({
  fontSize: '24px',
  marginBottom: '1rem',
  letterSpacing: '0.1em',
  color: COLOR.gray100,
})

const Notice = styled(Typography)({
  color: COLOR.gray100,
  letterSpacing: '0.1em',
})

const CtaButton = styled(SquareButton)({
  alignSelf: 'start',
})

export const Top: React.FC = () => {
  const navigate = useNavigate()

  const handleCTAClicked = () => {
    // too fast. wait 150 msec
    setTimeout(() => {
      navigate('/product/quiz/1')
    }, 150)
  }

  return (
    <Background>
      {/* <Layout> */}
      <Root>
        <GridContainer>
          <LogoWhite />
          <BlueCircleSVG style={{ gridRow: '1 / 2', gridColumn: '3 / 4' }} />
          <GoldCircleSVG style={{ gridRow: '3 / 4', gridColumn: '2 / 3' }} />
          <PinkCircleSVG
            style={{ gridRow: '3 / 4', gridColumn: '4 / 5', alignSelf: 'center' }}
          />
          <GreenCircleSVG
            style={{
              gridRow: '5 / 6',
              gridColumn: '2 / 3',
              alignSelf: 'end',
              justifySelf: 'center',
            }}
          />
          <Message>
            <Header>ようこそ、ZEFT へ</Header>
            <Body>
              {
                'アンケートに答えることで、今のあなたにぴったりのギフトを提案します。\nその中から3つまでをギフトリストとして贈れます。'
              }
            </Body>
            <Notice>※ お相手が1つ選び、受け取ります。</Notice>
          </Message>
          <CtaButton buttonType="white" onClick={handleCTAClicked}>
            START
          </CtaButton>
        </GridContainer>
      </Root>
      {/* </Layout> */}
    </Background>
  )
}
