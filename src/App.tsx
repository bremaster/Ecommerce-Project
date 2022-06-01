import React, { Suspense } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
} from 'react-router-dom'

// import { ErrorPage } from './pages/ErrorPage';
// import { Product } from './pages/SPA/Prodcut';
// import { Reciever } from './pages/SPA/Reciever';
// import { Stage } from './utilities/Stage';
// import { ProductCheck } from './utilities/ProductCheck';
//import { Home as OldLpHome } from './pages/LP/Home';
import { LpHome } from './pages/NewLP'
// import { FAQ } from './pages/LP/FAQ';
import './App.css' // global css
import { Head, HeadContextProvider } from 'utilities/Head'
import { CollaboratorIdProvider } from 'container/CollaboratorContainer'
import { MuiCustomThemeProvider } from 'theme'

// it could be your App.tsx file or theme file that is included in your tsconfig.json
import { Theme } from '@mui/material/styles'

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

const environment = process.env.REACT_APP_ENV // development | staging | production

const Product = React.lazy(() =>
  import('./pages/SPA/Prodcut').then(({ Product }) => ({
    default: Product,
  }))
)

const Reciever = React.lazy(() =>
  import('./pages/SPA/Reciever').then(({ Reciever }) => ({
    default: Reciever,
  }))
)

const AfterPay = React.lazy(() =>
  import('./pages/SPA/AfterPay').then(({ AfterPay }) => ({
    default: AfterPay,
  }))
)

const AfterPaySuccess = React.lazy(() =>
  import('./pages/SPA/reciever/checkout/ReThank').then(({ ReThank }) => ({
    default: ReThank,
  }))
)

const FAQ = React.lazy(() =>
  import('./pages/LP/FAQ').then(({ FAQ }) => ({
    default: FAQ,
  }))
)

const Stage = React.lazy(() =>
  import('./utilities/Stage').then(({ Stage }) => ({
    default: Stage,
  }))
)

const ProductCheck = React.lazy(() =>
  import('./utilities/ProductCheck').then(({ ProductCheck }) => ({
    default: ProductCheck,
  }))
)

const ErrorPage = React.lazy(() =>
  import('./pages/ErrorPage').then(({ ErrorPage }) => ({
    default: ErrorPage,
  }))
)

// fallback用
const Loading: React.FC = () => (
  <p style={{ paddingTop: '6rem', textAlign: 'center' }}>Loading...</p>
)

// コンテクストのプロバイダーでラップ
// NOTICE: materialUIのthemeや認証情報など、コンテクストのプロバイダーは今後増えていく
const App = (): JSX.Element => {
  return (
    <HeadContextProvider>
      <MuiCustomThemeProvider>
        <Router>
          <CollaboratorIdProvider>
            <TopLevelRoutes />
          </CollaboratorIdProvider>
        </Router>
      </MuiCustomThemeProvider>
    </HeadContextProvider>
  )
}

const TopLevelRoutes = () => {
  return (
    <>
      <Switch>
        {/* For local and staging test */}
        {environment !== 'production' && (
          <Route exact path="/test">
            <Head></Head>
            <Suspense fallback={<Loading />}>
              <Stage></Stage>
            </Suspense>
          </Route>
        )}
        {/* LP */}
        <Route exact path="/">
          <Head title="ZEFT ゼフト｜ギフトサービス"></Head>
          <LpHome></LpHome>
        </Route>
        {/* <Route exact path="/oldlp"> */}
        {/*   <Head title="ZEFT ゼフト｜ギフトサービス"></Head> */}
        {/*   <OldLpHome></OldLpHome> */}
        {/* </Route> */}
        {/* FAQ */}
        <Route exact path="/faq">
          <Head title="FAQ｜ZEFT ゼフト"></Head>
          <Suspense fallback={<Loading />}>
            <FAQ></FAQ>
          </Suspense>
        </Route>
        {/* Sender App */}
        <Route path="/product">
          <Suspense fallback={<Loading />}>
            <Product></Product>
          </Suspense>
        </Route>
        {/* Reciever App */}
        <Route path="/gift">
          <Head description="The gift for you"></Head>
          <Suspense fallback={<Loading />}>
            <Reciever></Reciever>
          </Suspense>
        </Route>
        {/* Sender After Pay App */}
        <Route path="/afterpay">
          <Head title="ZEFT ゼフト｜ギフトサービス"></Head>
          <Suspense fallback={<Loading />}>
            <AfterPay />
          </Suspense>
        </Route>
        {/* success pages for stripe return url */}
        <Route exact path="/success/afterpay">
          <Head title="完了 ｜ ZEFT ゼフト" />
          <Suspense fallback={<Loading />}>
            <AfterPaySuccess
              header="決済手続きが完了しました！"
              body="お相手へのギフトの配送を開始いたします"
              notation="ご利用ありがとうございました。またのご利用を心よりお待ちしております。"
            />
          </Suspense>
        </Route>
        {/* For buyers to check items */}
        <Route path="/stagecheck">
          <Head></Head>
          <Suspense fallback={<Loading />}>
            <ProductCheck></ProductCheck>
          </Suspense>
        </Route>
        {/* default routes */}
        <Route>
          <Head title="エラー｜ZEFT ゼフト"></Head>
          <Suspense fallback={<Loading />}>
            <ErrorPage></ErrorPage>
          </Suspense>
        </Route>
      </Switch>
    </>
  )
}

export default App
