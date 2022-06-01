import React, { FC, Fragment } from 'react'

import { Typography, Box, Divider } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { EngagedRow } from 'molecules'
import { COLOR } from 'theme'

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      width: '100%',
    },
    titleSection: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontWeight: 700,
    },
    priceSection: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontWeight: 700,
      letterSpacing: '0',
    },
    titleSectionRight: {
      fontWeight: 700,
      color: COLOR.subGold,
      cursor: 'pointer',
    },
    border: {
      margin: '8px 0 16px 0',
      border: 0,
      borderTop: `1px solid ${COLOR.brandNameGray}`,
    },
    itemsSection: {
      padding: '0 12px',
      marginBottom: '40px',
      p: {
        letterSpacing: '0.5px',
        margin: '0 0 8px 0',
      },
    },
    divider: {
      borderColor: COLOR.subtleGray,
    },
    senderInfo: {
      fontSize: '14px',
      fontFamily: 'Roboto',
      lineHeight: 1.5,
    },
  })
)

export type Props = {
  sender: {
    name: string
    email: string
    phone: string
  }
  items: {
    image: string
    brand: string
    name: string
  }[]
  price: number
}

export const ConfirmationSection: FC<Props> = (props: Props) => {
  const classes = useStyles()

  const { name, email, phone } = props.sender

  return (
    <div className={classes.wrapper}>
      {/* sender info section */}
      <Box mb={3} px="18px">
        <Box pb={1}>
          <Typography className={classes.titleSection}>購入者情報</Typography>
        </Box>
        {[name, email, phone].map((val) => (
          <Typography className={classes.senderInfo} key={val}>
            {val}
          </Typography>
        ))}
      </Box>

      {/* gift info section */}
      <Box mb={3}>
        <Box pb={1} px="18px">
          <Typography className={classes.titleSection}>ギフトリスト</Typography>
        </Box>
        {props.items.map((item) => (
          <Fragment key={item.name}>
            <Divider className={classes.divider} />
            <Box py={1} px="18px">
              <EngagedRow mainText={item.name} subText={item.brand} image={item.image} />
            </Box>
          </Fragment>
        ))}
      </Box>

      {/* price section */}
      <Box px="18px" display="flex" justifyContent="space-between">
        <Typography className={classes.priceSection}>合計金額（送料込み）</Typography>
        <Typography className={classes.priceSection}>
          {`${props.price.toLocaleString('en-US')} 円（税込）`}
        </Typography>
      </Box>
    </div>
  )
}
