import React from 'react'

import { useSpring, animated, config } from 'react-spring'

import makeStyles from '@mui/styles/makeStyles'
import { StartGiftDiagnosisButton } from './StartGiftDiagnosisButton'

/* const AnimatedBox = animated(Box); */

const useStyles = makeStyles({
  wrapper: {
    position: 'sticky',
    width: '100%',
    display: 'grid',
    justifyItems: 'center',
    zIndex: 99,
    padding: '10px 0',
    backgroundColor: 'white',
    bottom: 0,
  },
})

export const StickyCTAButton = ({ isShown }: { isShown: boolean }): JSX.Element => {
  const styleProps = useSpring({
    /* from: { bottom: '-1rem' }, */
    /* to: { bottom: '1rem' }, */
    opacity: isShown ? 100 : 0,
    config: config.stiff,
  })
  const classes = useStyles()

  return (
    <animated.div className={classes.wrapper} style={styleProps}>
      <StartGiftDiagnosisButton />
    </animated.div>
  )
}
