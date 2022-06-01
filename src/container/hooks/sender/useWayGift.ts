import { useState } from 'react'
import { WayGiftType, WayRecipientType } from 'constants/index'

/**
 * ギフトの贈り方について
 */
export function useWayGift(): {
  waygift: WayGiftType
  sendByURL: () => void
  sendByCard: () => void
  sendByDirect: () => void
  wayrecipient: WayRecipientType
  sendToMe: () => void
  sendToOthers: () => void
} {
  // waygift are URLONLY | REALCARD | DIRECT for now
  const [waygift, setWaygift] = useState<WayGiftType>('URLONLY')
  // wayrecipient are UNKNOWN | SENDER | OTHERS
  const [wayrecipient, setWayrecipient] = useState<WayRecipientType>('UNKNOWN')

  const sendByURL = () => setWaygift('URLONLY')
  const sendByCard = () => setWaygift('REALCARD')
  const sendByDirect = () => setWaygift('DIRECT')

  const sendToMe = () => setWayrecipient('SENDER')
  const sendToOthers = () => setWayrecipient('OTHERS')

  return {
    waygift,
    sendByURL,
    sendByCard,
    sendByDirect,
    wayrecipient,
    sendToMe,
    sendToOthers,
  }
}
