import React, { ReactElement } from 'react'

import { Box, Stack, Typography, Divider } from '@mui/material'

import { styled } from '@mui/system'

const StoryItemWrap = styled(Stack)((props) => ({
  width: '100%',
  backgroundColor: '#FFF',
  borderRadius: '7px',
  height: 427,
  padding: '28px 20px 23px',
  [props.theme.breakpoints.down('md')]: {
    maxWidth: 400,
    height: 450,
  },
}))

const ItemDivider = styled(Divider)({
  border: 0,
  borderTop: '1px dashed #4A4A4A',
})

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
  image: string
  user: string
  description: string
  review: ReactElement
}

export const StoryHikidemonoItem = ({ image, user, description, review }: StoryProps) => {
  return (
    <StoryItemWrap>
      <Stack
        direction="row"
        justifyContent="start"
        alignItems="center"
        px={{ md: '10px', xs: 0 }}
        gap={'15px'}
        mt={{ md: '17px', xs: '8px' }}
      >
        <UserImg sx={{ backgroundImage: `url(${image})` }} />
        <Typography
          fontSize="16px"
          color="black"
          lineHeight="24px"
          letterSpacing="0.08em"
        >
          {user}
        </Typography>
      </Stack>
      <Stack
        sx={{ height: 'fit-content', marginTop: '29px', marginBottom: '25px' }}
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
        mt={'25px'}
        sx={{ height: { md: 230, xs: 'fit-content' } }}
        justifyContent="center"
      >
        <Review>{review}</Review>
      </Stack>
    </StoryItemWrap>
  )
}
