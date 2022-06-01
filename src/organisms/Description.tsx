import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { SquareButton } from '../atoms/SquareButton'
import { BackButton } from '../atoms/BackButton'
import { Accordion, AccordionSummary, AccordionDetails } from 'molecules'
import { DescriptionSection } from 'organisms'
import { COLOR } from 'theme'
import { TagList } from '../molecules/TagList'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { SelectStatus } from 'constants/index'
import AdditionalInfoItem from './AdditionalInfoItem'

const YEN_MARK = '\xA5'

const useStyles = makeStyles(() => ({
  root: {
    color: COLOR.textBlack,
    width: '100%',
    // maxWidth: 500,
    backgroundColor: '#ffffff',
    marginBottom: '3rem',
  },
  brand: {
    display: 'flex',
    justifyContent: 'center',
    '& h3': {
      borderBottom: `2px solid ${COLOR.primaryNavy}`,
      padding: '0 16px 5px 16px',
    },
    margin: '1.3rem 0 2.5rem 0',
  },
  brandHeader: {
    fontWeight: 700,
    marginTop: '2rem',
  },
  brandDetail: {
    fontSize: '0.9rem',
    letterSpacing: '0.05em',
  },
  img: {
    objectFit: 'contain',
  },
  expandBeyondParentDiv: {
    // layout component has 16px padding for each side (sm screen size)
    width: 'calc(100% + 32px)',
    marginLeft: '-16px',
    marginTop: '-16px',
  },
  typoH1: {
    fontSize: '24px',
    fontWeight: 700,
  },
  typoH2: {
    fontSize: '18px',
    fontWeight: 700,
  },
  typoH3: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '25px',
    whiteSpace: 'pre-line',
  },
  brandName: {
    color: COLOR.brandNameGray,
    marginTop: '2.0rem',
    marginBottom: '0.8rem',
  },
  accordionContant: {
    whiteSpace: 'pre-line',
  },
  brandImage: {
    width: '100%',
    objectFit: 'contain',
    marginTop: '2rem',
  },
  // overwrite image gallery css
  imageGallery: {
    // main image
    '& .image-gallery-content .image-gallery-slide .image-gallery-image': {
      maxHeight: 'none',
      backgroundColor: '#EDF3FC', // for test
    },
    // thumbnail images
    '& .image-gallery-thumbnails-container': {
      textAlign: 'initial',
      marginLeft: '1px', // スクロールしてから戻ってきた際に、左端の位置がほかの要素と揃うようにしたいので
      marginTop: '7px',
    },
    '& .image-gallery-thumbnail': {
      width: '85px',
      height: '85px',
      outline: 'none !important',
    },
    '& .image-gallery-thumbnail:hover': {
      borderColor: 'transparent',
      borderWidth: '3px',
      outline: 'none',
    },
    '& .image-gallery-thumbnail:focus': {
      borderColor: 'transparent',
      outline: 'none',
      borderWidth: '1px',
    },
    '& .image-gallery-thumbnail.active': {
      borderColor: COLOR.primaryNavy,
      borderWidth: '1px',
    },
    '& .image-gallery-thumbnail img': {
      objectFit: 'cover',
      backgroundColor: '#EDF3FC', // for test
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
  },
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
  shippingFeeMin?: number
  shippingFeeMax?: number
  outOfStock?: boolean
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
  tags = [],
  descriptionSections,
  productPrice,
  shippingFeeMin,
  shippingFeeMax,
  outOfStock = false,
}: Props): JSX.Element => {
  const classes = useStyles()
  const [width, setWidth] = useState<number | null | undefined>(null)
  const wrapperEl = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const width = wrapperEl?.current?.offsetWidth
    setWidth(width) // without px. just value.
  }, [width])
  const history = useHistory()

  const buttonMessage = calculateButtonMessage(isReciever, selectableStatus)

  // fix iOS focus position
  useEffect(() => {
    if (!!document) {
      const node = document.activeElement as HTMLElement
      if (!!node?.blur) {
        node.blur()
      }
    }
  }, [!!document])

  return (
    <div className={classes.root}>
      <div>
        {/* back button position must be the same as next page */}
        <Box position="relative">
          <Box position="absolute" top="16px">
            <BackButton
              position="top"
              handleClick={() => {
                history.goBack()
              }}
            />
          </Box>
        </Box>
        <div
          ref={wrapperEl}
          className={`${classes.expandBeyondParentDiv} ${classes.imageGallery}`}
        >
          <ImageGallery
            items={images.map((img) => ({
              original: img.original,
              thumbnail: img.original,
              originalWidth: width as number,
              originalHeight: width as number,
              thumbnailWidth: 81,
              thumbnailHeight: 81,
            }))}
            infinite={true}
            showNav={true}
            showFullscreenButton={false}
            useBrowserFullscreen={false}
            showPlayButton={false}
          />
          {/* <Carousel */}
          {/*   dragging={true} */}
          {/*   swiping={true} */}
          {/*   renderCenterLeftControls={() => {}} */}
          {/*   renderCenterRightControls={() => {}} */}
          {/* > */}
          {/*   {images.map((image, i) => ( */}
          {/*     <img */}
          {/*       key={i} */}
          {/*       width={width} */}
          {/*       height={width} */}
          {/*       className={classes.img} */}
          {/*       src={image.original} */}
          {/*       alt={`image_${i}`} */}
          {/*     /> */}
          {/*   ))} */}
          {/* </Carousel> */}
        </div>
      </div>
      <Typography className={`${classes.typoH3} ${classes.brandName}`}>
        {brand.name}
      </Typography>
      <Typography className={classes.typoH1}>{name}</Typography>
      {tags && <TagList tags={tags.map((tag) => tag.name)} />}

      {!isReciever && (
        <Fragment>
          <Typography>{`税込み ${YEN_MARK}${productPrice?.toLocaleString(
            'en-US'
          )}`}</Typography>
          <Typography className={`${classes.typoH3}`}>
            {shippingFeeMin === shippingFeeMax
              ? `※ 配送料が別途 ${YEN_MARK}${shippingFeeMax?.toLocaleString(
                  'en-US'
                )} かかります`
              : `※ 配送料が別途 ${YEN_MARK}${shippingFeeMin?.toLocaleString(
                  'en-US'
                )} ~ ${YEN_MARK}${shippingFeeMax?.toLocaleString('en-US')} かかります`}
          </Typography>
        </Fragment>
      )}

      {isReRecommned && (
        <Box mt={4} mb={5}>
          <SquareButton buttonType="primary" fullWidth={true}>
            この商品タイプで再レコメンド &nbsp;
          </SquareButton>
        </Box>
      )}

      {/* 今後は keyMessage, summary ではなく、descriptionSection を利用 */}
      {!!descriptionSections && descriptionSections.length !== 0 ? (
        <Box mt="1rem" mb={3}>
          {descriptionSections.map((section, i) => (
            <Box mb={2} key={i}>
              <DescriptionSection {...section} />
            </Box>
          ))}
        </Box>
      ) : (
        <>
          <Box mt="1rem" mb={2}>
            <Typography className={classes.typoH2}>{keyMessage}</Typography>
          </Box>
          <Box mb={5}>
            <Typography className={classes.typoH3}>{summary}</Typography>
          </Box>
        </>
      )}

      {/* <h3 className={classes.mainPrice}>$335</h3> */}

      <Box mt={4} mb={5}>
        {/* brand info */}
        <Accordion defaultExpanded={true}>
          <AccordionSummary>
            <Typography variant="h6">ブランド</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <img src={brand.image} className={classes.brandImage} />
            <div className={classes.brand}>
              <Typography component="h3" variant="subtitle1">
                {brand.name}
              </Typography>
            </div>
            {brand.descriptions.map((description) => (
              <Fragment key={description.title}>
                {/* <Box mb={2}> */}
                {/*   <Typography className={classes.typoH2}>{description.title}</Typography> */}
                {/* </Box> */}
                <Box mb={5}>
                  <Typography variant="body1">{description.body}</Typography>
                </Box>
              </Fragment>
            ))}
          </AccordionDetails>
        </Accordion>
        {/* additional info */}
        {table.map(({ column1, column2 }, index) => (
          <AdditionalInfoItem column1={column1} column2={column2} key={index} />
        ))}
      </Box>

      {/* <Box mt={4} mb={5}> */}
      {/*   <SquareButton buttonType="primary" fullWidth={true} onClick={handleClick}> */}
      {/*     {buttonMessage} */}
      {/*   </SquareButton> */}
      {/* </Box> */}
      {isReRecommned && (
        <Box>
          <SquareButton buttonType="primary" fullWidth={true}>
            この商品タイプで再レコメンド
          </SquareButton>
        </Box>
      )}
      <Box
        position="sticky"
        bottom="1rem"
        width="100%"
        boxShadow="rgb(0 0 0 / 25%) 0px 25px 50px -12px"
      >
        {outOfStock === false ? (
          <SquareButton buttonType="primary" fullWidth={true} onClick={handleClick}>
            {buttonMessage}
          </SquareButton>
        ) : (
          <SquareButton buttonType="primary" fullWidth={true} onClick={history.goBack}>
            SOLD OUT
          </SquareButton>
        )}
      </Box>
    </div>
  )
}

function calculateButtonMessage(isReciever: boolean, selectableStatus: SelectStatus) {
  if (isReciever) {
    return 'このギフトを受け取る'
  }

  switch (selectableStatus) {
    case 'SELECTABLE':
      return 'この商品を選択する'
    case 'SELECTED':
      return '商品を選択から外す'
    case 'UNSELECTABLE':
      return '戻る'
    default:
      break
  }

  return ''
}
