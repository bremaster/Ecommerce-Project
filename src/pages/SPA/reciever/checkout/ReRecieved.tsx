import React, { useState } from 'react'

import { VideoAnimation, LetterModal } from 'organisms'

type Props = {
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
  const [screenNumber, setScreenNumber] = useState(1)

  return (
    <>
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
    </>
  )
}
