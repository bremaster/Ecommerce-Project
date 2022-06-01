import React from 'react'

import { Box, Stack, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { CommonTitle } from './components/CommonTitle'

import { EventItem } from 'organisms'

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      maxWidth: '800px',
      width: '90%',
      margin: '0 auto',
      marginBottom: '350px',
      [theme.breakpoints.down(1000)]: {
        marginTop: '200px',
      },
    },
    title: {
      fontFamily: 'Noto Sans JP',
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: '27px',
      letterSpacing: '0.03em',
      textAlign: 'left',
      color: '#4A4A4A',
      [theme.breakpoints.down(1000)]: {
        fontSize: '13px',
      },
    },
    list: {
      width: '100%',
    },
  })
)

export const Event = () => {
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <CommonTitle title="LIFE EVENT" subtitle="ライフイベント" />

      <Typography className={classes.title}>
        各ライフイベントのギフトマナーを加味した商品選定や最適なのし紙等スムーズにマナーに関する迷いなくギフトを贈れるように設計されています。
      </Typography>

      <Stack gap={3} mt={7.5} className={classes.list}>
        <Stack gap={3} direction={{md:'row', xs:'column'}}>
          <EventItem image="/landing/life_event_list/baby.jpg" description="出産祝い" />
          <EventItem
            image="/landing/life_event_list/clothes.jpg"
            description="出産内祝い"
          />
        </Stack>
        <Stack gap={3} direction={{md:'row', xs:'column'}}>
          <EventItem
            image="/landing/life_event_list/wedding.jpg"
            description="結婚祝い ※準備中"
          />
          <EventItem
            image="/landing/life_event_list/boxes.jpg"
            description="結婚内祝い ※準備中"
          />
        </Stack>
      </Stack>
    </Box>
  )
}
