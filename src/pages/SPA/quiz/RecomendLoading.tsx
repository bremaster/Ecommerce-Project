import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { COLOR } from 'theme'
import { Layout } from '../../../templates/Layout'

export const RecomendLoading: React.FC = () => {
  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '100vh',
        backgroundColor: COLOR.backgroundWhite,
      }}
    >
      <Layout>
        <div style={{ paddingTop: '30vh', paddingBottom: '1rem' }}>
          <CircularProgress sx={{ color: COLOR.primaryNavy }} />
        </div>
        <Box fontSize="12px">アンケートをもとに最適なギフトを選定しています。</Box>
        <Box fontSize="12px" pt="0.5rem">
          少々お待ちください。
        </Box>
      </Layout>
    </div>
  )
}
