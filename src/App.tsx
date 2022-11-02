import React, { Suspense } from 'react'

import {
  BrowserRouter,
  Route,
  Routes,
  // Redirect,
} from 'react-router-dom'

// import { ErrorPage } from './pages/ErrorPage';
// import { Product } from './pages/SPA/Prodcut';
// import { Reciever } from './pages/SPA/Reciever';
// import { Stage } from './utilities/Stage';
// import { ProductCheck } from './utilities/ProductCheck';
//import { Home as OldLpHome } from './pages/LP/Home';
import { LpHome } from './pages/NewLP'
// import { LpHikidemono } from './pages/LpHikidemono'
// import { FAQ } from './pages/LP/FAQ';
import './App.css' // global css
import { Head, HeadContextProvider } from 'utilities/Head'
import { CollaboratorIdProvider } from 'container/CollaboratorContainer'
import { GraphqlProvider } from 'container/hooks'
import { MuiCustomThemeProvider } from 'theme'
import { usePageViews } from 'utilities/GoogleAnalytics'
import { useSalesChannel } from 'utilities/SalesChannel'

// it could be your App.tsx file or theme file that is included in your tsconfig.json

const environment = process.env.REACT_APP_ENV // development | staging | production

const LpHikidemono = React.lazy(() =>
  import('./pages/LpHikidemono').then(({ LpHikidemono }) => ({
    default: LpHikidemono,
  }))
)

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
  import('./pages/SPA/checkout/PaymentThanks').then(({ PaymentThanks }) => ({
    default: PaymentThanks,
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
  import('./utilities/ComponentLibrary').then(({ ComponentLibrary }) => ({
    default: ComponentLibrary,
  }))
)

const Privacy = React.lazy(() =>
  import('./pages/LP/Privacy').then(({ Privacy }) => ({
    default: Privacy,
  }))
)

const Term = React.lazy(() =>
  import('./pages/LP/Term').then(({ Term }) => ({
    default: Term,
  }))
)

const Tokushou = React.lazy(() =>
  import('./pages/LP/Tokushou').then(({ Tokushou }) => ({
    default: Tokushou,
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
        <BrowserRouter>
          <CollaboratorIdProvider>
            <GraphqlProvider>
              <TopLevelRoutes />
            </GraphqlProvider>
          </CollaboratorIdProvider>
        </BrowserRouter>
      </MuiCustomThemeProvider>
    </HeadContextProvider>
  )
}

const TopLevelRoutes = () => {
  usePageViews()
  useSalesChannel()

  return (
    <>
      <Routes>
        {/* For local and staging test */}
        {environment !== 'production' && (
          <Route
            path="test"
            element={
              <React.Fragment>
                <Head></Head>
                <Suspense fallback={<Loading />}>
                  <Stage></Stage>
                </Suspense>
              </React.Fragment>
            }
          />
        )}
        {/* LP */}
        <Route
          index
          element={
            <React.Fragment>
              <Head title="ZEFT ゼフト｜相手が選べるソーシャルギフトサービス"></Head>
              <LpHome></LpHome>
            </React.Fragment>
          }
        />
        {/* LP Hikidemono  */}
        <Route
          path="lp/hikidemono"
          element={
            <React.Fragment>
              <Head title="ZEFT ゼフト｜相手が選べるソーシャルギフトサービス"></Head>
              <Suspense fallback={<Loading />}>
                <LpHikidemono />
              </Suspense>
            </React.Fragment>
          }
        />
        {/* FAQ */}
        <Route
          path="faq"
          element={
            <React.Fragment>
              <Head title="よくあるご質問｜ZEFT ゼフト"></Head>
              <Suspense fallback={<Loading />}>
                <FAQ></FAQ>
              </Suspense>
            </React.Fragment>
          }
        />
        {/* Sender App */}
        <Route
          path="product/*"
          element={
            <Suspense fallback={<Loading />}>
              <Product></Product>
            </Suspense>
          }
        />
        {/* Reciever App */}
        <Route
          path="gift/*"
          element={
            <React.Fragment>
              <Head description="The gift for you"></Head>
              <Suspense fallback={<Loading />}>
                <Reciever></Reciever>
              </Suspense>
            </React.Fragment>
          }
        />
        {/* Sender After Pay App */}
        <Route
          path="afterpay"
          element={
            <React.Fragment>
              <Head title="ZEFT ゼフト｜ギフトサービス"></Head>
              <Suspense fallback={<Loading />}>
                <AfterPay />
              </Suspense>
            </React.Fragment>
          }
        />
        {/* success pages for stripe return url */}
        <Route
          path="success/afterpay"
          element={
            <React.Fragment>
              <Head title="完了 ｜ ZEFT ゼフト" />
              <Suspense fallback={<Loading />}>
                <AfterPaySuccess />
              </Suspense>
            </React.Fragment>
          }
        />
        {/* For buyers to check items */}
        <Route
          path="stagecheck"
          element={
            <React.Fragment>
              <Head></Head>
              <Suspense fallback={<Loading />}>
                <ProductCheck></ProductCheck>
              </Suspense>
            </React.Fragment>
          }
        />

        {/* For Privacy */}
        <Route
          path="privacy"
          element={
            <React.Fragment>
              <Head title="プライバシーポリシー｜ZEFT ゼフト" />
              <Suspense fallback={<Loading />}>
                <Privacy></Privacy>
              </Suspense>
            </React.Fragment>
          }
        />

        {/* For Term */}
        <Route
          path="term"
          element={
            <React.Fragment>
              <Head title="利用規約｜ZEFT ゼフト" />
              <Suspense fallback={<Loading />}>
                <Term></Term>
              </Suspense>
            </React.Fragment>
          }
        />

        {/* For Tokushou */}
        <Route
          path="tokushou"
          element={
            <React.Fragment>
              <Head title="特定商取引法に基づく表記｜ZEFT ゼフト" />
              <Suspense fallback={<Loading />}>
                <Tokushou></Tokushou>
              </Suspense>
            </React.Fragment>
          }
        />

        {/* default routes */}
        <Route
          path="*"
          element={
            <React.Fragment>
              <Head title="エラー｜ZEFT ゼフト"></Head>
              <Suspense fallback={<Loading />}>
                <ErrorPage></ErrorPage>
              </Suspense>
            </React.Fragment>
          }
        />
      </Routes>
    </>
  )
}

export default App
