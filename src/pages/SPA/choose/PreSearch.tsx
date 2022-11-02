import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { FormStateWithSetter } from 'constants/searchForm'
import { PreSearchScene } from 'pages/SPA/choose/PreSearchScene'
import { PreSearchPrice } from 'pages/SPA/choose/PreSearchPrice'
import { PreSearchCategory } from 'pages/SPA/choose/PreSearchCategory'

// onboarding page
export const PreSearch = ({
  form,
  skipScene,
}: {
  form?: FormStateWithSetter
  skipScene: boolean
}) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const maxStep = skipScene ? 2 : 3

  return (
    <Routes>
      <Route path={`scene/:sceneid`} element={<PreSearchScene />} />
      <Route
        path={`price/:sceneid`}
        element={
          <PreSearchPrice form={form} maxStep={maxStep} step={skipScene ? 1 : 2} />
        }
      />
      <Route
        path={`category/:sceneid`}
        element={
          <PreSearchCategory form={form} maxStep={maxStep} step={skipScene ? 2 : 3} />
        }
      />
    </Routes>
  )
}
