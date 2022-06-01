import React, { useState } from 'react'

import makeStyles from '@mui/styles/makeStyles'
import { COLOR } from 'theme'

import { VideoAnimation, LetterModal } from 'organisms'

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: COLOR.primaryNavy,
    width: '100vw',
    height: '100vh',
  },
})

type Props = {
  expires: string | undefined
  handleClick: () => void
  isProductDetailAvailable: boolean
  sendRecieverInfo: string
  senderSenderInfo: string
  giftMessage: string
}

export const Recieved: React.FC<Props> = ({
  sendRecieverInfo,
  senderSenderInfo,
  giftMessage,
  handleClick = () => alert('clicked!'),
}) => {
  const classes = useStyles()

  const [screenNumber, setScreenNumber] = useState(1)
  return (
    <div className={classes.wrapper}>
      {screenNumber === 1 && (
        <VideoAnimation
          senderSenderInfo={senderSenderInfo}
          sendRecieverInfo={sendRecieverInfo}
          setScreenNumber={setScreenNumber}
        />
      )}
      {screenNumber === 2 && (
        <LetterModal
          goToNext={handleClick}
          giftMessage={giftMessage}
          senderSenderInfo={senderSenderInfo}
        />
      )}
    </div>
  )
}
