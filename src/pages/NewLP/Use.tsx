import React from 'react'

import { Box, Stack } from '@mui/material'

import { UseLaptop, UseMobile } from 'organisms'

import { CommonTitle } from './components/CommonTitle'
import { TitleWrap } from './components/TitleWrap'
import { GradientButton } from './components/GradientButton'

import { styled } from '@mui/system'

export type UseProps = {
  isMdSize: boolean
}

const UseWrap = styled(Box)((props) => ({
  marginTop: '100px',
  [props.theme.breakpoints.down(900)]: {
    marginTop: '59px',
  },
}))

export const Use = ({ isMdSize }: UseProps) => {
  return (
    <UseWrap id="use">
      {/* for SEO optimization, set <h2> tag */}
      <TitleWrap>
        <CommonTitle title="HOW TO USE" subtitle="ZEFTの使い方" />
      </TitleWrap>

      <UseMobile />
      <UseLaptop />

      {!isMdSize && (
        <Stack alignItems="center" pt="224px">
          <GradientButton />
        </Stack>
      )}
    </UseWrap>
  )
}
