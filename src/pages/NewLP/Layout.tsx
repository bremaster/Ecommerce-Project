import React from 'react'

import { useMediaQuery } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

import { LpHeader } from './LpHeader'
import { LpFooter } from './components/LpFooter'
import { HeroCover } from './HeroCover'
import { Service } from './Service'
import { Use } from './Use'
import { Carousel } from './Carousel'
import { Event } from './Event'

import { StickyCTAButton } from './components/StickyCTAButton'

/*
 * custom hooks
 */
const useStyles = makeStyles({
  layout: {
    position: 'relative',
  },
})

const useSize = () => {
  const isLgSize = useMediaQuery('(max-width: 1200px)', { noSsr: true })
  const isMdSize = useMediaQuery('(max-width: 1024px)', { noSsr: true })
  const isSmSize = useMediaQuery('(max-width: 767px)', { noSsr: true })
  const isXsSize = useMediaQuery('(max-width: 350px)', { noSsr: true })
  return { isLgSize, isMdSize, isSmSize, isXsSize }
}

export type LpCommonProps = {
  isMobileSize: boolean
  isXMobileSize?: boolean
}

export const Layout: React.FC = () => {
  const classes = useStyles()
  const { isLgSize, isMdSize } = useSize()

  return (
    <div className={classes.layout}>
      <LpHeader isMobileSize={isMdSize} />
      <HeroCover />
      <Service isMobileSize={isMdSize} />
      <Use isMobileSize={isLgSize} />

      <Carousel />
      <Event />
      <LpFooter />
      {isMdSize && <StickyCTAButton isShown={true} />}
    </div>
  )
}
