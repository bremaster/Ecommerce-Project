import React, { ReactElement } from 'react'

import { Box, Stack, Typography, Divider } from '@mui/material'

import { styled } from '@mui/system'

const StoryItemWrap = styled(Stack)((props) => ({
  width: '100%',
  backgroundColor: '#FFF',
  borderRadius: '7px',
  height: 700,
  maxWidth: 400,
  padding: '28px 20px 23px',
  justifyContent: 'space-between',
  [props.theme.breakpoints.down('md')]: {
    height: 'fit-content',
  },
}))

const GradientMark = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '22px',
  letterSpacing: '0.08em',
  textAlign: 'center',
  color: 'white',
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  borderRadius: '30px',
  padding: '0 8px',
})

const ItemDivider = styled(Divider)({
  border: 0,
  borderTop: '1px dashed #4A4A4A',
})

const GiftItem = styled('img')((props) => ({
  width: 100,
  [props.theme.breakpoints.down('md')]: {
    width: 90,
  },
}))

const UserImg = styled(Box)({
  backgroundSize: 'cover',
  borderRadius: '50%',
  width: 65,
  height: 65,
})

const Review = styled(Typography)({
  fontSize: '14px',
  lineHeight: '25.9px',
  letterSpacing: '0.08em',
  color: '#4A4A4A',
})

export type StoryProps = {
  num: number
  user: string
  description: string
  review: ReactElement
}

export const StoryItem = ({ num, user, description, review }: StoryProps) => {
  const sender = num % 2 === 1

  return (
    <StoryItemWrap>
      <Stack alignItems={sender ? 'start' : 'end'} px={{ md: 2, xs: 0 }}>
        <GradientMark>{sender ? '贈った方' : '貰った方'}</GradientMark>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={{ md: '25px', xs: 0 }}
        mt="17px"
      >
        <UserImg sx={{ backgroundImage: `url(/landing/story/user-${num}-1.png)` }} />
        <img src="/landing/story/Arrow 8.png" />
        <UserImg sx={{ backgroundImage: `url(/landing/story/user-${num}-2.png)` }} />
      </Stack>
      <Typography fontSize="16px" lineHeight="24px" letterSpacing="0.08em" mt="14px">
        {user}
      </Typography>
      <Stack
        sx={{ height: 'fit-content', marginTop: '21px', marginBottom: '20px' }}
        alignItems="center"
        direction="row"
      >
        <Typography
          fontSize="16px"
          lineHeight="24px"
          letterSpacing={0.08}
          color="#4A4A4A"
        >
          {description}
        </Typography>
      </Stack>
      <ItemDivider />
      <Stack
        my={2.5}
        sx={{ height: { md: 230, xs: 'fit-content' } }}
        justifyContent="center"
      >
        <Review>{review}</Review>
      </Stack>
      <ItemDivider />
      <Typography
        fontSize="14px"
        lineHeight="25.9px"
        fontWeight={700}
        letterSpacing={0.08}
        color="#4A4A4A"
        mt={2.5}
      >
        {sender ? '贈ったギフト' : '受け取ったギフト'}
      </Typography>
      <Stack direction="row" justifyContent="space-between" mt="14px">
        <GiftItem src={`/landing/story/giftitem-${num}-1.png`} />
        <GiftItem src={`/landing/story/giftitem-${num}-2.png`} />
        <GiftItem src={`/landing/story/giftitem-${num}-3.png`} />
      </Stack>
    </StoryItemWrap>
  )
}
