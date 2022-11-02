import React from 'react'

import { useSpring, animated, config } from 'react-spring'

import { StartGiftDiagnosisButton } from './StartGiftDiagnosisButton'

import { styled, experimental_sx as sx } from '@mui/system'

/* const AnimatedBox = animated(Box); */

const StickyCTAButtonWrap = styled(animated.div)(
  sx({
    position: 'sticky',
    width: '100%',
    display: 'grid',
    justifyItems: 'center',
    zIndex: 99,
    padding: '10px 0',
    backgroundColor: 'white',
    bottom: 0,
  })
)

export const HikidemonoStickyCTAButton = ({
  isShown,
}: {
  isShown: boolean
}): JSX.Element => {
  const styleProps = useSpring({
    /* from: { bottom: '-1rem' }, */
    /* to: { bottom: '1rem' }, */
    opacity: isShown ? 100 : 0,
    config: config.stiff,
  })

  return (
    <StickyCTAButtonWrap style={styleProps}>
      <StartGiftDiagnosisButton />
    </StickyCTAButtonWrap>
  )
}
