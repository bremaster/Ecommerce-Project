import React from 'react'
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

const COLOR = {
  // Landing Page
  // lpPink: '#E5C3C7',
  // lpWhite: '#F7F7F8',
  // lpLightGrey: '#EEEEEE',
  // lpOrange: '#F5D6BA',
  // lpPaleBlue: '#C8D7E5',
  // lpBlack: '#212529',

  // Production
  primaryNavy: '#17162D',
  primaryLightenNavy: '#17162dad',
  backgroundWhite: '#F7F7F8',
  backgroundBlue: '#EDF3FC',
  subGold: '#D1A54F',
  subBlue: '#00DBF1',
  brandNameGray: '#949494',
  quizoutlineGray: '#BCBCBC',
  answerGray: '#B9B8B8',
  textBlack: '#36322F',
  borderGray: '#DCDCDC',
  inactiveButtonGray: '#DDDDDD',
  textWhite: '#FFFFFF',
  progressBarGray: '#DADADA',
  tickerGray: '#F1F3F4',
  formGrey: '#EEEEEE',
  alertRed: '#DC3545', // お客様情報入力箇所でも利用されているので共通化したい
  subOrange: '#F1574B',
  subtleGray: '#F1F1F1',

  gray100: '#FFFFFF',
  gray400: '#E2E2E2',
  gray500: '#D0D0D0',
  gray700: '#949494',
  gray750: '#797979',
  gray800: '#333333',
  gray900: '#101010',
}

const muiTheme = createTheme({
  palette: {
    text: {
      primary: COLOR.gray900,
    },
  },
  typography: {
    fontFamily: [
      'Noto Sans JP',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h3: {
      color: COLOR.gray900,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '30px',
      lineHeight: '45px',
    },
    h4: {
      color: COLOR.gray900,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '24px',
      lineHeight: '36px',
    },
    h5: {
      color: COLOR.gray900,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '27px',
    },
    h6: {
      color: COLOR.gray900,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '18px',
      lineHeight: '27px',
    },
    subtitle1: {
      color: COLOR.gray900,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: '24px',
    },
    subtitle2: {
      color: COLOR.gray900,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '21px',
    },
    subtitle3: {
      color: COLOR.gray900,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '12px',
      lineHeight: '18px',
      display: 'block',
    },
    body1: {
      color: COLOR.gray900,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '32px',
      letterSpacing: '0.5px',
    },
    body2: {
      color: COLOR.gray900,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '28px',
    },
    body3: {
      color: COLOR.gray900,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '18px',
      display: 'block',
    },
    body4: {
      color: COLOR.gray900,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '10px',
      lineHeight: '15px',
      display: 'block',
    },
    caption: {
      color: COLOR.gray900,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '18px',
    },
  },
})

/* adding new variats to typography */
declare module '@mui/material/styles' {
  interface TypographyVariants {
    subtitle3: React.CSSProperties
    body3: React.CSSProperties
    body4: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    subtitle3?: React.CSSProperties
    body3?: React.CSSProperties
    body4?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    subtitle3: true
    body3: true
    body4: true
  }
}

// Typographyのデフォルトの文字色など、グローバルにあてたいスタイルを定義
const MuiCustomThemeProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  )
}

export { COLOR, MuiCustomThemeProvider }
