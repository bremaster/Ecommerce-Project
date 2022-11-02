import React, { Fragment, useEffect, useRef, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Box, Typography, Dialog, Stack, useMediaQuery, Divider } from '@mui/material'

import { Theme } from '@mui/material/styles'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

import {
  GradientButton,
  GradientOutlinedButton,
  VariationCard,
  VariationText,
} from 'atoms'
import { DescriptionSection, ShippingRemark } from 'organisms'
import { COLOR } from 'theme'
import { DescriptionGradientTable } from 'molecules'
import { SelectStatus, BrandType } from 'constants/index'
import { QUERY_GET_BRAND_LIST } from 'container/hooks'
import AdditionalInfoItem from './AdditionalInfoItem'

import { useLazyQuery } from '@apollo/client'

import { styled } from '@mui/system'

const YEN_MARK = '\xA5'

const IMAGE_GALLERY_SLIDE_SIZE_ON_LAPTOP = 460

const Root = styled(Box)({
  color: COLOR.textBlack,
  width: '100%',
  // maxWidth: 500,
  backgroundColor: '#ffffff',
  marginBottom: '3rem',
  padding: '0 8px',
})

const TypoH1 = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '30px',
  lineHeight: '39px',
  letterSpacing: '0.03em',
  color: '#4A4A4A',
  marginTop: '8px',
  [props.theme.breakpoints.down('md')]: {
    fontSize: 22,
    lineHeight: '120%',
  },
}))

const TypoH2 = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 22,
  lineHeight: '44px',
  letterSpacing: '0.03em',
  color: '#4A4A4A',
  [props.theme.breakpoints.down('md')]: {
    fontSize: 18,
    lineHeight: '26px',
  },
}))

const TypoH3 = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '15px',
  lineHeight: '27px',
  letterSpacing: '0.03em',
  color: '#4A4A4A',
  whiteSpace: 'pre-line',
  [props.theme.breakpoints.down('md')]: {
    fontSize: 14,
    lineHeight: '25.2px',
  },
}))

const BrandName = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 14,
  lineHeight: 1,
  letterSpacing: '0.03em',
  [props.theme.breakpoints.down('md')]: {
    fontSize: 12,
    lineHeight: '150%',
    marginTop: '7px',
  },
}))

const ShippingFee = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 12,
  lineHeight: '100%',
  letterSpacing: '0.03em',
  color: '#4A4A4A',
  marginLeft: '6px',
  '& span': {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: 400,
  },
  [props.theme.breakpoints.down('md')]: {
    fontSize: 10,
    marginLeft: 0,
    '& span': {
      fontFamily: 'Outfit',
      fontSize: 13,
      fontWeight: 400,
    },
  },
}))

const Shipping = styled(Typography)((props) => ({
  marginTop: '24px',
  color: '#4A4A4A',
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '13px',
  lineHeight: '18.82px',
  letterSpacing: '0.03em',
  '& > span': {
    fontFamily: 'Noto Sans JP',
    fontStyle: 'normal',
    fontWeight: 400,
    cursor: 'pointer',
    textDecorationLine: 'underline',
    color: '#FE8B7B',
  },
  [props.theme.breakpoints.down('md')]: {
    marginTop: '16px',
    fontSize: '12px',
  },
}))

const Tax = styled(Typography)((props) => ({
  marginBottom: '2px',
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 12,
  lineHeight: '100%',
  letterSpacing: '0.03em',
  [props.theme.breakpoints.down('md')]: {
    fontSize: 10,
  },
}))

const Price = styled(Typography)((props) => ({
  fontFamily: 'Outfit',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 30,
  lineHeight: '100%',
  display: 'flex',
  alignItems: 'flex-end',
  color: '#4A4A4A',
  [props.theme.breakpoints.down('md')]: {
    fontSize: 20,
  },
}))

const Tag = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 12,
  lineHeight: '100%',
  color: '#FE8B7B',
  padding: '7px 13px',
  borderRadius: '10px',
  border: '1px solid #FE8B7B',
})

const ImageGalleryWrap = styled(Box)((props) => ({
  width: '100%',
  [props.theme.breakpoints.up('md')]: {
    width: '90%',
    minWidth: IMAGE_GALLERY_SLIDE_SIZE_ON_LAPTOP + 'px',
  },

  // main image
  '& .image-gallery-content .image-gallery-slide .image-gallery-image': {
    maxHeight: 'none',
    backgroundColor: '#EDF3FC', // for test
    borderRadius: '10px',
    [props.theme.breakpoints.up('md')]: {
      // To prevent a little bit of background from showing.
      objectFit: 'cover',
      height: '100%',
    },
  },
  '& .image-gallery-content .image-gallery-slides': {
    borderRadius: '10px',
  },
  // thumbnail images
  '& .image-gallery-thumbnails-container': {
    textAlign: 'left !important',
    marginLeft: '1px', // スクロールしてから戻ってきた際に、左端の位置がほかの要素と揃うようにしたいので
    marginTop: '7px',
    [props.theme.breakpoints.up('md')]: {
      // To avoid slide image from shrinking when the amount of thumbnails are small
      minWidth: IMAGE_GALLERY_SLIDE_SIZE_ON_LAPTOP + 'px',
    },
  },
  '& .image-gallery-thumbnail': {
    width: '62px',
    height: '62px',
    outline: 'none !important',
    borderRadius: '10px',
    borderWidth: 0,
    marginRight: '8px',
  },
  '& .image-gallery-thumbnail:hover': {
    borderColor: 'transparent',
    borderWidth: 0,
    outline: 'none',
  },
  '& .image-gallery-thumbnail:focus': {
    outline: 'none',
    border: 0,
  },
  '& .image-gallery-thumbnail.active': {
    border: 0,
  },
  '& .image-gallery-thumbnail img': {
    objectFit: 'cover',
    backgroundColor: '#EDF3FC', // for test
    borderRadius: '10px',
  },
  '& .image-gallery-icon': {
    filter: 'none',
    color: COLOR.gray700,
    zIndex: 3, // avoid overwrapping buttom sheet
  },
  '& .image-gallery-icon svg': {
    strokeWidth: '1.5',
    width: '18px',
  },
}))

const BrandImage = styled('img')((props) => ({
  width: '100%',
  [props.theme.breakpoints.up('md')]: {
    maxWidth: '330px',
  },
  objectFit: 'contain',
}))

export type Props = {
  handleClick: () => void
  table: {
    column1: string
    column2: string
  }[]
  keyMessage: string
  summary: string
  images: {
    original: string
    thumbnail: string
  }[]
  brand: {
    name: string
    image: string
    descriptions: {
      title: string
      body: string
    }[]
  }
  isReciever: boolean
  tags: { name: string }[]
  selectableStatus: SelectStatus
  name?: string
  isReRecommned?: boolean
  descriptionSections?: {
    header?: string
    imageURL?: string
    imageCaption?: string
    body?: string
  }[]
  productPrice?: number
  shippingFee?: {
    minFee: number
    maxFee: number
    hokkaidoFee: number
    okinawaFee: number
    undeliverable: Array<string> | null
  }
  outOfStock?: boolean
  noshiNg?: boolean
  howManyInCart?: number
  variants?: {
    title: string
    patterns: {
      title: string
      imageUrl: string | null
    }[]
  }[]
  isPreview?: boolean
}

export const Description = ({
  handleClick = () => alert('clicked'),
  table = [],
  images = [],
  name = 'アストリンジェントトナーSC',
  keyMessage = '新商品のご紹介',
  summary = '1本で、肌を整えてうるおす植物由来成分が配合されたフェイス用ひきしめ化粧水。 オレンジ系の爽やかな香りで使用感も良く、すべての肌タイプの方におすすめです。',
  brand = {
    name: 'Test branD',
    image:
      'https://images.ctfassets.net/oj23j4uzkkrx/5mMAZLTZUNeKTu74ZosXj6/028e6dd6ed3d923ea9599208ec770a0f/________________2.png',
    descriptions: [
      { title: 'our vision', body: '自然と矯正するモダンなライフタイム' },
      { title: 'mission', body: '新たしい生活様式' },
    ],
  },
  isReRecommned = false,
  isReciever,
  selectableStatus,
  descriptionSections,
  productPrice,
  shippingFee,
  outOfStock = false,
  noshiNg = true,
  howManyInCart,
  variants,
  isPreview = false,
}: Props): JSX.Element => {
  const [width, setWidth] = useState<number | null | undefined>(null)
  const wrapperEl = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const width = wrapperEl?.current?.offsetWidth
    setWidth(width) // without px. just value.
  }, [width])
  const navigate = useNavigate()

  const [showShippingMore, setShowShippingMore] = useState(false)

  const buttonMessage = calculateButtonMessage(
    isReciever,
    selectableStatus,
    !!howManyInCart ? howManyInCart : 0
  )

  const [fetchBrandList, { data }] = useLazyQuery<{
    brandDetailCollection: { items: Array<BrandType> }
  }>(QUERY_GET_BRAND_LIST)

  useEffect(() => {
    fetchBrandList({
      variables: { order: '' },
    })
  }, [])

  // fix iOS focus position
  useEffect(() => {
    if (!!document) {
      const node = document.activeElement as HTMLElement
      if (!!node?.blur) {
        node.blur()
      }
    }
  }, [!!document])

  const isLaptop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'), {
    defaultMatches: false,
  })

  const variationText =
    variants !== undefined
      ? 'もらった方が' + variants.map((v) => v.title).join('・') + 'を選択'
      : ''

  const selectedBrand = data?.brandDetailCollection.items.find(
    (temp) => temp.brandName === brand.name
  )

  const summaryPart = (
    <>
      <Stack direction={{ md: 'column', xs: 'column-reverse' }}>
        <Box>
          <TypoH1>{name}</TypoH1>

          <Stack mt={2.5} gap={'10px'} direction="row">
            <BrandName
              sx={{
                color: '#CFCAC4',
              }}
            >
              by
            </BrandName>
            <BrandName
              sx={{
                borderBottom: '1px solid #4A4A4A',
                '& a': {
                  color: '#4A4A4A !important',
                  textDecoration: 'none !important',
                },
              }}
            >
              {isPreview || isReciever ? (
                brand.name
              ) : (
                <Link
                  to={`/product/brand/${selectedBrand?.sys.id}`}
                  style={{ letterSpacing: '0.03em' }}
                >
                  {brand.name}
                </Link>
              )}
            </BrandName>
          </Stack>
        </Box>
      </Stack>

      {!isReciever && (
        <Fragment>
          <Stack justifyContent="space-between" mt={'50px'} gap={2}>
            <Stack
              direction={{ md: 'row', xs: 'column' }}
              gap={{ md: '4px', xs: '10px' }}
              alignItems={{ md: 'flex-end', xs: 'start' }}
            >
              <Stack
                direction="row"
                gap="4px"
                width={{ md: 'auto', xs: '100%' }}
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Stack direction="row" gap="4px" alignItems="flex-end">
                  <Tax>税込</Tax>
                  <Price>{priceText(productPrice)}</Price>
                </Stack>
                <Box display={{ md: 'none', xs: 'block' }}>
                  {noshiNg === true && <Tag>のし不可</Tag>}
                </Box>
              </Stack>
              {!!shippingFee && (
                <ShippingFee>
                  {shippingFee.minFee === shippingFee.maxFee ? (
                    <>
                      (送料別 <span>{priceText(shippingFee.maxFee)}</span>)
                    </>
                  ) : (
                    <>
                      (送料別{' '}
                      <span>
                        {priceText(shippingFee.minFee)} ~ {priceText(shippingFee.maxFee)}
                      </span>
                      )
                    </>
                  )}
                </ShippingFee>
              )}
            </Stack>
          </Stack>
        </Fragment>
      )}

      {/* select item button and noshi */}
      {isLaptop && (
        <Stack direction="row" alignItems="center" gap={3} mt={2}>
          <Box sx={{ width: 250 }}>
            {outOfStock === false ? (
              <GradientButton onClick={handleClick}>{buttonMessage}</GradientButton>
            ) : (
              <GradientButton onClick={() => navigate(-1)}>SOLD OUT</GradientButton>
            )}
          </Box>
          {noshiNg && !isReciever && <Tag>のし不可</Tag>}
        </Stack>
      )}

      {!isReciever && !!shippingFee && (
        <>
          <Shipping onClick={() => setShowShippingMore(true)}>
            ※北海道・沖縄・離島・一部地域の送料に関しては
            <span>こちら</span>
          </Shipping>
          <Dialog
            open={showShippingMore}
            onClose={() => setShowShippingMore(false)}
            sx={{
              '& .MuiPaper-root': {
                borderRadius: '10px',
                margin: '24px',
              },
            }}
          >
            <Box p="36px">
              <ShippingRemark
                items={[
                  {
                    itemName: name,
                    hokkaidoFee: shippingFee.hokkaidoFee,
                    okinawaFee: shippingFee.okinawaFee,
                    undeliverableSites:
                      shippingFee.undeliverable === null ? [] : shippingFee.undeliverable,
                  },
                ]}
              />
              <Box mt="2rem">
                <GradientOutlinedButton onClick={() => setShowShippingMore(false)}>
                  閉じる
                </GradientOutlinedButton>
              </Box>
            </Box>
          </Dialog>
        </>
      )}
    </>
  )

  return (
    <Root>
      {/* image gallery and summary */}
      <Box display={{ md: 'flex' }} maxWidth="900px" margin="auto">
        <ImageGalleryWrap ref={wrapperEl}>
          <ImageGallery
            items={images.map((img) => ({
              original: img.original,
              thumbnail: img.original,
              originalWidth: isLaptop
                ? IMAGE_GALLERY_SLIDE_SIZE_ON_LAPTOP
                : (width as number),
              originalHeight: isLaptop
                ? IMAGE_GALLERY_SLIDE_SIZE_ON_LAPTOP
                : (width as number),
              thumbnailWidth: 58,
              thumbnailHeight: 58,
            }))}
            infinite={true}
            showNav={false}
            showFullscreenButton={false}
            useBrowserFullscreen={false}
            showPlayButton={false}
          />
        </ImageGalleryWrap>
        <Box mt={{ md: '50px', xs: '24px' }} px={{ md: '50px' }} width={{ md: '80%' }}>
          {summaryPart}
        </Box>
      </Box>

      {/* show variations if exist */}
      {variants !== undefined && variants.length > 0 && (
        <Box mt="60px" maxWidth="800px" mx="auto">
          <TypoH2>{variationText}</TypoH2>
          <TypoH3 mt="16px">もらった方が下記から選んで、受け取ることが出来ます。</TypoH3>
          <Divider sx={{ mt: '30px' }} />
        </Box>
      )}
      {variants?.map((variant) => (
        <Box key={variant.title} mt="30px" maxWidth="800px" mx="auto">
          <TypoH2>{variant.title}</TypoH2>
          <Stack
            width="100%"
            direction="row"
            p="3px"
            mt="20px"
            sx={{
              overflowX: 'scroll',
              overflow: '-moz-scrollbars-none',
              '&::-webkit-scrollbar': {
                width: '0 !important',
              },
            }}
          >
            {variant.patterns.map((pattern) => (
              <Box key={pattern.title} sx={{ flexShrink: '0', mr: '10px' }}>
                {pattern.imageUrl === null ? (
                  <VariationText>{pattern.title}</VariationText>
                ) : (
                  <VariationCard
                    text={pattern.title}
                    image={pattern.imageUrl}
                    width="120px"
                  />
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      ))}

      {/* brief summary */}
      <Box sx={{ maxWidth: '800px', margin: 'auto' }}>
        <Divider sx={{ mt: '30px' }} />
        <Box mt="50px">
          <TypoH2>{keyMessage}</TypoH2>
        </Box>
        <Box mt={{ md: '30px', xs: '16px' }}>
          <TypoH3>{summary}</TypoH3>
        </Box>
      </Box>

      {/* additional info */}
      <Box mt="80px">
        {isLaptop ? (
          <Box sx={{ display: 'grid', placeItems: 'center' }}>
            <DescriptionGradientTable table={table} />
          </Box>
        ) : (
          table.map(({ column1, column2 }) => (
            <AdditionalInfoItem
              column1={column1}
              column2={column2}
              key={column1}
              defaultExpanded={false}
            />
          ))
        )}
      </Box>

      {/* brand */}
      <Stack
        mt={{ xs: '50px', md: '70px' }}
        mx="auto"
        direction={{ xs: 'column', md: 'row' }}
        sx={{ maxWidth: '800px' }}
        gap="57px"
      >
        <BrandImage src={brand.image} />
        <Box>
          <Box mt="1rem">
            <TypoH2>{brand.name}</TypoH2>
          </Box>
          {brand.descriptions.map((description, index) => (
            <Box mt="24px" key={index}>
              <TypoH3>{description.body}</TypoH3>
            </Box>
          ))}
        </Box>
      </Stack>

      {/* description sections */}
      {!!descriptionSections && descriptionSections.length !== 0 && (
        <Box mt={{ xs: '1rem', md: '2rem' }} mx="auto" sx={{ maxWidth: '800px' }}>
          {descriptionSections.map((section, i) => (
            <Box mt={{ xs: '50px', md: '70px' }} key={i}>
              <DescriptionSection {...section} />
            </Box>
          ))}
        </Box>
      )}

      {isReRecommned && (
        <Box>
          <GradientButton>この商品タイプで再レコメンド</GradientButton>
        </Box>
      )}

      {/* bottom margin */}
      <Box height="100px" />

      {/* add to cart button */}
      {isLaptop === false && (
        <Box
          sx={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            backgroundColor: 'white',
            borderTop: '1px solid #DDDDDD',
            zIndex: 3,
            p: '16px 5%',
          }}
        >
          {outOfStock === false ? (
            <GradientButton onClick={handleClick}>{buttonMessage}</GradientButton>
          ) : (
            <GradientButton onClick={() => navigate(-1)}>SOLD OUT</GradientButton>
          )}
        </Box>
      )}
    </Root>
  )
}

function calculateButtonMessage(
  isReciever: boolean,
  selectableStatus: SelectStatus,
  inCart: number
) {
  if (isReciever) {
    return 'このギフトを受け取る'
  }

  switch (selectableStatus) {
    case 'SELECTABLE':
      return `${inCart + 1}つ目のギフトを選ぶ`
    case 'SELECTED':
      return '商品を選択から外す'
    case 'UNSELECTABLE':
      return '戻る'
    default:
      break
  }

  return ''
}

// Ex. convert 1980 to "YEN_MARK 1,980"
function priceText(price: number | undefined): string {
  if (price === undefined) {
    return ''
  }
  return `${YEN_MARK}${price?.toLocaleString('en-US')}`
}
