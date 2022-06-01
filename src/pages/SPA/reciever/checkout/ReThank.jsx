import React from 'react'
// TODO .d.tsファイルが存在しないため、tsx化するとtype errorを起こす。
// ハンドリング方法要検討
import { Box, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { SquareButton } from '../../../../atoms/SquareButton'
import { Layout } from '../../../../templates/Layout'

import { COLOR } from 'theme'

const useStyles = makeStyles(() => ({
  backCircle: {
    borderRadius: '50%',
    background: COLOR.gray400,
    display: 'grid',
    placeItems: 'center',
  },
  header: {
    color: COLOR.gray800,
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '0.1rem',
    lineHeight: '25px',
  },
  body1: {
    color: COLOR.gray700,
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontWeight: 'normal',
    lineHeight: '25px',
    letterSpacing: '0.05rem',
  },
  notation: {
    color: COLOR.gray800,
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontWeight: 'normal',
    lineHeight: '20px',
    letterSpacing: '0.05rem',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
}))

export const ReThank = ({
  header = '配送手続きが完了しました！',
  body = 'ギフトの到着まで少々おまちください',
  notation = 'ZEFTでは現代のギフト体験を再定義するため梱包時における過剰な包装等を控えています。',
}) => {
  const classes = useStyles()

  return (
    <Layout>
      {/* Top Icon */}
      <Box
        className={classes.backCircle}
        width="150px"
        height="150px"
        mt="40px"
        mb="50px"
      >
        <img width="90px" src="/assets/zeft-truck.png" />
      </Box>
      {/* Messages */}
      <Typography className={classes.header}>{header}</Typography>
      <Typography className={classes.body1}>{body}</Typography>
      <Box width="100%" mt={4} mb={4}>
        <SquareButton buttonType="primary" href="/" fullWidth>
          ZEFTについて知る
        </SquareButton>
      </Box>
      {/* Some Notation */}
      <Typography className={classes.notation}>{notation}</Typography>
    </Layout>
  )
}
