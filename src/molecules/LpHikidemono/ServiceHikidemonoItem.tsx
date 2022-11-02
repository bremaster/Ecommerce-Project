import React from 'react'

import { Box, Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

export type ServiceHikidemonoItemProps = {
  data: {
    image: string
    title: Array<string>
    subTitle: Array<string>
  }
}

const ServiceHikidemonoItemWrap = styled(Stack)((props) => ({
  maxWidth: '376px',
  height: '370px',
  width: '100%',
  backgroundColor: 'white',
  borderRadius: '10px',
  '& h3': {
    color: '#4A4A4A',
    fontFamily: 'Noto Sans JP',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '44px',
    letterSpacing: '0.08em',
    textAlign: 'center',
  },
  '& p': {
    color: '#4A4A4A',
    fontFamily: 'Noto Sans JP',
    fontWeight: 400,
    letterSpacing: '0.05em',
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '25.2px',
  },
  [props.theme.breakpoints.down('md')]: {
    maxWidth: '325px',
    height: '317px',
    width: '90%',
    '& h3': {
      fontSize: '16px',
      lineHeight: '32px',
    },
  },
}))

const BorderBottom = styled(Box)({
  height: 4,
  backgroundColor: '#FE8B7B',
  borderRadius: '2px',
})

export const ServiceHikidemonoItem = ({ data }: ServiceHikidemonoItemProps) => {
  return (
    <ServiceHikidemonoItemWrap
      justifyContent="center"
      alignItems="center"
      gap={{ md: '26px', xs: '23px' }}
    >
      <Stack justifyContent="center" alignItems="center">
        <Box component="img" src={data.image} />
      </Stack>
      <Stack gap={{ md: '36px', xs: '24px' }}>
        <Stack>
          <Typography component="h3">{data.title[0]}</Typography>
          <Stack direction="row" justifyContent="center">
            <Typography component="h3">{data.title[1]}</Typography>
            <Stack>
              <Typography component="h3">{data.title[2]}</Typography>
              <BorderBottom />
            </Stack>
          </Stack>
        </Stack>
        <Stack height={65} justifyContent="center">
          {data.subTitle.map((item, i) => (
            <Typography component="p" key={i}>
              {item}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </ServiceHikidemonoItemWrap>
  )
}
