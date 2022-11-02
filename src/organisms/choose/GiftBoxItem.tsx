import React from 'react'

import { SelectedGiftItem, EnabledGiftItem, DisabledGiftItem } from 'molecules'

type Props = {
  img?: string
  title?: string
  brand?: string
  onClickCancelButton?: () => void
  onClickWrapperBox?: () => void
  select?: boolean
}

export const GiftBoxItem: React.FC<Props> = ({
  img,
  title,
  brand,
  select,
  onClickCancelButton,
  onClickWrapperBox,
}) => {
  return (
    <>
      {img && (
        <SelectedGiftItem
          img={img}
          title={title}
          brand={brand}
          onClickCancelButton={onClickCancelButton}
          onClickWrapperBox={onClickWrapperBox}
        />
      )}
      {!img && select && <EnabledGiftItem onClick={onClickWrapperBox} />}
      {!img && !select && <DisabledGiftItem />}
    </>
  )
}
