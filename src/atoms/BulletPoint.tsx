import React from 'react'

import { Box } from '@mui/material'
import { COLOR } from 'theme'
import { styled } from '@mui/system'

const Prefix = styled(Box)({
  color: COLOR.textWhite,
  fontSize: '10px',
  lineHeight: '20px',
  backgroundColor: COLOR.primaryNavy,
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  textAlign: 'center',
  paddingLeft: '1px', // 文字が中央に来ないので微調整
})

export const BulletPoint = (props: { character: number | string }): JSX.Element => {
  return (
    <Prefix display="flex" alignItems="center" justifyContent="center">
      {props.character}
    </Prefix>
  )
}
