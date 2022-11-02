import React from 'react'

import { Box, Stack, Typography } from '@mui/material'

import { styled } from '@mui/system'

export type ServiceItemProps = {
  data: {
    image: string
    title: Array<string>
    subTitle: Array<string>
  }
}

const ServiceItemWrap = styled(Stack)({
  maxWidth: '341px',
  height: '341px',
  width: '100%',
  backgroundColor: 'white',
  borderRadius: '10px',
  '& img': {
    height: 130,
  },
  '& h3': {
    color: '#4A4A4A',
    fontFamily: 'Noto Sans JP',
    fontWeight: 700,
    fontSize: '15px',
    lineHeight: '25px',
    letterSpacing: '0.15em',
    textAlign: 'center',
  },
  '& p': {
    color: '#4A4A4A',
    fontFamily: 'Noto Sans JP',
    fontWeight: 400,
    letterSpacing: '0.05em',
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '21px',
  },
})

const BorderBottom = styled(Box)({
  height: 4,
  backgroundColor: '#FE8B7B',
  borderRadius: '2px',
})

export const ServiceItem = ({ data }: ServiceItemProps) => {
  return (
    <ServiceItemWrap justifyContent="center" alignItems="center" gap={'15.4px'}>
      <Stack justifyContent="center" alignItems="center">
        <Box component="img" src={data.image} />
      </Stack>
      <Stack gap={'18px'}>
        <Stack>
          <Typography component="h3">{data.title[0]}</Typography>
          <Stack direction="row" justifyContent="center">
            <Stack>
              <Typography component="h3">{data.title[1]}</Typography>
              <BorderBottom />
            </Stack>
            <Typography component="h3">{data.title[2]}</Typography>
          </Stack>
        </Stack>
        <Stack>
          {data.subTitle.map((item, i) => (
            <Typography component="p" key={i}>
              {item}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </ServiceItemWrap>
  )
}
