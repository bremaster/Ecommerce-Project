import React, { useState } from 'react'
import { Product as ProductType } from 'constants/index'

import { PreviewVideoAnimation, PreviewLetterModal, PreviewShowProduct } from 'organisms'

type Props = {
  itemsInCart: Array<ProductType>
  sendRecieverInfo: string
  senderSenderInfo: string
  giftMessage: string
}

export const PreviewGift: React.FC<Props> = ({
  sendRecieverInfo,
  senderSenderInfo,
  giftMessage,
  itemsInCart,
}) => {
  const [screenNumber, setScreenNumber] = useState(1)

  return (
    <>
      {screenNumber === 1 && (
        <PreviewVideoAnimation
          senderSenderInfo={senderSenderInfo}
          sendRecieverInfo={sendRecieverInfo}
          setScreenNumber={setScreenNumber}
        />
      )}
      {screenNumber === 2 && (
        <PreviewLetterModal
          goToNext={() => setScreenNumber(3)}
          giftMessage={giftMessage}
          senderSenderInfo={senderSenderInfo}
        />
      )}

      {screenNumber === 3 && (
        <PreviewShowProduct senderName={senderSenderInfo} items={itemsInCart} />
      )}
    </>
  )
}
