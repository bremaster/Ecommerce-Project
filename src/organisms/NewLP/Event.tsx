import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Stack } from '@mui/material'

import { styled } from '@mui/system'

import { EventItem, CommonTitle } from 'molecules'

const EventWrap = styled(Box)((props) => ({
  maxWidth: '1100px',
  width: '100%',
  margin: '0 auto',
  marginBottom: '120px',
  padding: '0 30px',
  [props.theme.breakpoints.down(900)]: {
    padding: '0 25px',
  },
}))

const EventList = styled(Stack)((props) => ({
  width: '100%',
  marginTop: 102,
  flexDirection: 'row',
  gap: '18px',
  [props.theme.breakpoints.down(900)]: {
    gap: '10px',
    fontSize: '13px',
    marginTop: 50,
  },
  [props.theme.breakpoints.down(1100)]: {
    flexDirection: 'column',
  },
}))

const EventGroupRow = styled(Stack)((props) => ({
  gap: '18px',
  [props.theme.breakpoints.down(900)]: {
    gap: '10px',
  },
}))

export type EventProps = {
  howManyInCart: number
}

export const Event = ({ howManyInCart }: EventProps) => {
  const navigate = useNavigate()

  const goTo = (scene: string) => {
    if (howManyInCart === 0) {
      navigate('/product/onboarding/' + scene)
    } else {
      navigate('/product/choose/' + scene)
    }
  }

  return (
    <EventWrap>
      <CommonTitle title="GIFT SCENE" subtitle="ギフトシーンから選ぶ" />
      <EventList>
        <EventGroupRow justifyContent="center" direction="row">
          <EventItem
            image="/landing/life_event_list/item1.png"
            description="誕生日"
            onClick={() => goTo('tanjobi')}
          />
          <EventItem
            image="/landing/life_event_list/item2.png"
            description="お礼"
            onClick={() => goTo('orei')}
          />
        </EventGroupRow>
        <EventGroupRow justifyContent="center" direction="row">
          <EventItem
            image="/landing/life_event_list/item3.png"
            description="出産祝い"
            onClick={() => goTo('syussannIwai')}
          />
          <EventItem
            image="/landing/life_event_list/item4.png"
            description="結婚祝い"
            onClick={() => goTo('kekkonIwai')}
          />
        </EventGroupRow>
        <EventGroupRow justifyContent="center" direction="row">
          <EventItem
            image="/landing/life_event_list/item5.png"
            description="出産内祝い"
            onClick={() => goTo('syussannUchiIwai')}
          />
          <EventItem
            image="/landing/life_event_list/item6.png"
            description="結婚内祝い"
            onClick={() => goTo('kekkonUchiIwai')}
          />
        </EventGroupRow>
      </EventList>
    </EventWrap>
  )
}
