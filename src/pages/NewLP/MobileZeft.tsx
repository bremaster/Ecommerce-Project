import React from 'react'

import { Box, Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

const MobileZeftWrap = styled(Box)({
  padding: '70px 25px 114px',
})

const MobileZeftText = styled(Stack)({
  maxWidth: 325,
  margin: '0 auto',
  '& h1': {
    fontFamily: 'Noto Sans JP',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: '0.08em',
    textAlign: 'left',
    color: '#4A4A4A',
  },
  '& p': {
    fontFamily: 'Noto Sans JP',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '28px',
    letterSpacing: '0.08em',
    textAlign: 'left',
    color: '#4A4A4A',
    '& b': {
      fontWeight: 700,
    },
  },
})

const TextList = styled(Stack)({
  gap: '25px',
  marginTop: '41px',
  '& img': {
    width: 26,
    height: 26,
  },
})

export const MobileZeft = () => {
  return (
    <MobileZeftWrap>
      <MobileZeftText>
        <Stack direction="row" gap={'14px'} alignItems="end">
          <Box component="img" src="/landing/Logo.png" sx={{ width: 101, height: 27 }} />
          <Typography component="h1">なら</Typography>
        </Stack>
        <TextList>
          <Stack direction="row" gap={2.5} alignItems="center">
            <Box component="img" src="/landing/checkbox.png" />
            <Typography component="p">
              3つから<b>お相手が1つ選択</b>
            </Typography>
          </Stack>
          <Stack direction="row" gap={2.5} alignItems="center">
            <Box component="img" src="/landing/checkbox.png" />
            <Typography component="p">
              ギフトリンク作成、<b>無料</b>
            </Typography>
          </Stack>
          <Stack direction="row" gap={2.5} alignItems="center">
            <Box component="img" src="/landing/checkbox.png" />
            <Typography component="p">
              <b>住所を知らなくても</b>大丈夫
            </Typography>
          </Stack>
        </TextList>
      </MobileZeftText>
    </MobileZeftWrap>
  )
}
