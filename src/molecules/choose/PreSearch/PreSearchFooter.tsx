import React from 'react'

import { Stack, Button } from '@mui/material'

import { GradientButton } from 'atoms'

import { styled } from '@mui/system'

const PreSearchFooterWrap = styled(Stack)({
  backgroundColor: 'white',
  height: 70,
  width: '100%',
  padding: '0 20px',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  bottom: 0,
})

export const PreSearchFooter = ({
  leftFunction,
  rightFunction,
}: {
  leftFunction: () => void
  rightFunction: () => void
}) => {
  return (
    <PreSearchFooterWrap>
      <Button
        sx={{
          fontFamily: 'Noto Sans JP',
          fontSize: 16,
          fontWeight: 700,
          textAlign: 'center',
          textDecoration: 'underline',
          color: 'black',
        }}
        onClick={leftFunction}
      >
        スキップ
      </Button>
      <GradientButton onClick={rightFunction} width={'108px'}>
        次へ
      </GradientButton>
    </PreSearchFooterWrap>
  )
}
