import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { COLOR } from 'theme'
import { Layout } from '../../../templates/Layout'

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '100vh',
    backgroundColor: COLOR.backgroundWhite,
  },
  py: {
    paddingTop: '30vh',
    paddingBottom: '1rem',
  },
  progressColor: {
    color: COLOR.primaryNavy,
  },
}))

export const RecomendLoading: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Layout>
        <div className={classes.py}>
          <CircularProgress className={classes.progressColor} />
        </div>
        <Box fontSize="12px">アンケートをもとに最適なギフトを選定しています。</Box>
        <Box fontSize="12px" pt="0.5rem">
          少々お待ちください。
        </Box>
      </Layout>
    </div>
  )
}
