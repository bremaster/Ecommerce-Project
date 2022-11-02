import React, { useEffect } from 'react'

import { Box } from '@mui/material'

import { Description, MenuAppBar, Footer } from 'organisms'
import { Layout } from 'templates/Layout'
import { optimize } from 'utilities/Cloudinary'
import { makeBrand } from 'utilities/makeBrand'
import { Head } from 'utilities/Head'
import { ProductWithHandlerAndStatus } from 'constants/index'

export type GiftDetailProps = {
  item: ProductWithHandlerAndStatus & { onTap?: () => void }
  isReciever?: boolean
  howManyInCart?: number
  isPreview?: boolean
}

export const GiftDetail = ({
  item,
  isReciever = false,
  howManyInCart,
  isPreview,
}: GiftDetailProps): JSX.Element => {
  // タップした後に、商品詳細の初期位置がそこになるのを防ぐため
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const img_list = item.productImageCloudinary.map((image) => image.secure_url)

  const metaTag = makeMetaTag(item)

  const variants = item.variantsCollection.items.map((variant) => ({
    title: variant.title,
    patterns: variant.patternsCollection.items.map((pattern) => ({
      title: pattern.title,
      imageUrl: !!pattern.imageCloudinary ? pattern.imageCloudinary[0].secure_url : null,
    })),
  }))

  return (
    <>
      <Head title={metaTag.title} description={metaTag.description} />

      {!isReciever && (
        <MenuAppBar
          navigateToLp={isReciever ? false : true}
          giftBoxButton={true && !isReciever}
          isPreview={isPreview}
        />
      )}
      <Box mt={{ xs: '10px', md: '2rem' }} />
      <Layout maxWidth="lg">
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
          shippingFee={item.shippingFee}
          outOfStock={item.stockOk === false}
          noshiNg={item.noshi === false}
          howManyInCart={howManyInCart}
          variants={variants}
          isPreview={isPreview}
        />
      </Layout>
      {!isReciever && (
        <Box
          // Add padding to avoid overrapped by button
          pb={{ xs: '80px', md: '0px' }}
          sx={{
            background: '#F6F6F6',
          }}
        >
          <Footer />
        </Box>
      )}
    </>
  )
}

function makeMetaTag(
  item: Pick<ProductWithHandlerAndStatus, 'brand' | 'title' | 'productIntroduction'>
): {
  title: string
  description: string
} {
  const title = `${item.brand.brandName} - ${item.title} ｜ZEFT ゼフト`
  const description = `${item.brand.brandName}の${item.title}をギフト・プレゼントで贈るならZEFT（ゼフト）！ ${item.productIntroduction}`
  return { title, description }
}
