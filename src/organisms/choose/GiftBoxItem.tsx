import React from 'react'

import { SelectedGiftItem, EnabledGiftItem, DisabledGiftItem } from 'molecules'

type Props = {
  img?: string
  title?: string
  brand?: string
  onClick?: () => void
  select?: boolean
}

export const GiftBoxItem: React.FC<Props> = ({ img, title, brand, select, onClick }) => {
  return (
    <>
      {img && (
        <SelectedGiftItem img={img} title={title} brand={brand} onClick={onClick} />
      )}
      {!img && select && <EnabledGiftItem onClick={onClick} />}
      {!img && !select && <DisabledGiftItem />}
    </>
  )
}
