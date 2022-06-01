import React, { useEffect } from 'react'

import { Description } from 'organisms'
import { Layout } from 'templates/Layout'

import { Product } from 'constants/index'
import { optimize } from 'utilities/Cloudinary'

import { ProductWithHandlerAndStatus } from 'constants/index'

export type GiftDetailProps = {
  item: ProductWithHandlerAndStatus & { onTap?: () => void }
  isReciever?: boolean
}

export const GiftDetail = ({
  item,
  isReciever = false,
}: GiftDetailProps): JSX.Element => {
  // タップした後に、商品詳細の初期位置がそこになるのを防ぐため
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const img_list = item.productImageCloudinary.map((image) => image.secure_url)
  return (
    <Layout>
      <Description
        name={item.title}
        descriptionSections={item.productDescriptionSectionsCollection?.items.map(
          (section) => ({
            header: section.header,
            imageURL: !!section.image ? optimize(section.image[0].secure_url) : '',
            imageCaption: section.imageCaption,
            body: section.body,
          })
        )}
        keyMessage={item.keyMessage}
        summary={item.productIntroduction}
        table={item.tableCollection.items}
        handleClick={item.handleClick}
        images={img_list.map((img) => ({
          original: img,
          thumbnail: img,
        }))}
        brand={makeBrand(item)}
        isReciever={isReciever}
        tags={item.tagsCollection ? item.tagsCollection.items : []}
        selectableStatus={item.selectableStatus}
        productPrice={item.productPrice}
        shippingFeeMin={item.shippingFee.minFee}
        shippingFeeMax={item.shippingFee.maxFee}
      />
    </Layout>
  )
}

//utility
function makeBrand(item: Product) {
  return {
    name: item.brand.brandName,
    image: item.brand.brandImageCloudinary[0].secure_url,
    descriptions: [...item.brandDescriptionCollection.items],
  }
}
