/** @jsx jsx */
import React, { Fragment } from 'react'
import { jsx } from '@emotion/core'
import { useState, useRef, useEffect } from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { SquareButton } from 'atoms'
import { MenuAppBar } from 'organisms'
import { Layout } from 'templates/Layout'

export type Props = {
  gifts: Array<{
    giftName: string
    giftBrand: string
    giftImage: string
    handleClick: () => void
  }>
  prices: Array<{
    col1: string
    col2: string
    isImportant?: boolean
  }>
  handleNoLoginAndBuy?: () => void
  handleLoginAndBuy?: () => void
}

export const GiftConfirm = ({
  gifts = [
    {
      giftName: 'バスボム',
      giftBrand: 'THAN',
      giftImage:
        'https://res.cloudinary.com/zeft/image/upload/q_auto,f_auto,w_auto,c_fill/v1623768795/zeft_landing/ui2_recc2l.png',
      handleClick: () => alert('clicked'),
    },
    {
      giftName: 'バスボム2',
      giftBrand: 'THAN2',
      giftImage:
        'https://res.cloudinary.com/zeft/image/upload/q_auto,f_auto,w_auto,c_fill/v1623768795/zeft_landing/ui2_recc2l.png',
      handleClick: () => alert('clicked'),
    },
  ],
  prices = [
    {
      col1: 'カード',
      col2: '¥500円（税別）',
    },
    {
      col1: '合計',
      col2: '¥3,500円（税別）',
      isImportant: true,
    },
  ],
  handleNoLoginAndBuy = () => alert('clicked'),
}: Props) => {
  return (
    <Layout>
      <MenuAppBar backButton={true} />
      <div css={{ width: '100%', marginTop: '2rem' }}>
        <Section head="選択中のギフト">
          <Fragment>
            {gifts.map((gift) => (
              <Card
                key={gift.giftName}
                title={gift.giftName}
                brand={gift.giftBrand}
                handleClick={gift.handleClick}
                img={gift.giftImage}
                css={{ padding: '1rem 1rem' }}
              />
            ))}
          </Fragment>
        </Section>
        <Section head="" css={{ marginTop: '3rem' }}>
          <PriceTable rows={prices} css={{ padding: '0 1rem' }} />
        </Section>
        <Box width="100%" pt="3rem">
          <SquareButton buttonType="primary" fullWidth onClick={handleNoLoginAndBuy}>
            次へ
          </SquareButton>
        </Box>
      </div>
    </Layout>
  )
}

const Card = ({
  title = '猫茶セット',
  brand = 'THAN',
  img = '/assets/goods_photo/img_41_1.jpg',
  handleClick = () => alert('delete clicked!!!'),
  ...rest
}) => {
  const [width, setWidth] = useState<number | null>(null)
  const wrapperEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperEl !== null && wrapperEl.current !== null) {
      const w = wrapperEl.current.offsetWidth
      setWidth(w) // without px. just value.
    }
  }, [width])

  const imageWidth = width !== null ? `${width / 4.5}px` : '0px'

  return (
    <div ref={wrapperEl} {...rest}>
      <Grid container direction="row" justifyContent="space-between">
        <img
          css={{ objectFit: 'cover', borderRadius: '0.3rem' }}
          width={imageWidth}
          height={imageWidth}
          src={img}
        />
        <div css={{ width: '70%', position: 'relative' }}>
          <h2 css={{ fontSize: '13px', margin: '0px' }}>{title}</h2>
          <h2 css={{ fontSize: '12px', color: 'grey', margin: '0px' }}>{brand}</h2>
          <Box position="absolute" right="0">
            <Typography
              css={{
                fontSize: '12px',
                cursor: 'pointer',
                lineHeight: '20px',
                textDecorationLine: 'underline',
              }}
              onClick={handleClick}
            >
              削除する
            </Typography>
          </Box>
        </div>
      </Grid>
    </div>
  )
}

const Section = ({ head = 'ギフト', children = <p>test test test</p>, ...rest }) => {
  return (
    <div {...rest}>
      <h2
        css={{
          fontSize: '1rem',
          fontWeight: 900,
          paddingBottom: '0.3rem',
          borderBottom: '1px solid grey',
        }}
      >
        {head}
      </h2>
      {children}
    </div>
  )
}

const PriceTable = ({
  rows = [
    {
      col1: 'ギフト',
      col2: '¥3,000円（税別）',
    },
    {
      col1: 'カード',
      col2: '¥500円（税別）',
    },
    {
      col1: '合計',
      col2: '¥3,500円（税別）',
      isImportant: true,
    },
  ],
  ...rest
}) => {
  return (
    <div {...rest}>
      {rows.map((row) => (
        <Grid key={row.col1} container direction="row" justifyContent="space-between">
          <p css={{ fontWeight: row.isImportant ? 700 : 400 }}>{row.col1}</p>
          <p css={{ fontWeight: row.isImportant ? 700 : 400 }}>{row.col2}</p>
        </Grid>
      ))}
    </div>
  )
}
