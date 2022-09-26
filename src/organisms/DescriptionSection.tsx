import React from 'react'

import { Box, Typography, Stack } from '@mui/material'
/* import Image from 'material-ui-image'; */

import { styled } from '@mui/system'

type Props = {
  header?: string
  imageURL?: string
  imageCaption?: string
  body?: string
}

const Header = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '27px',
  lineHeight: '39.1px',
  letterSpacing: '0.03em',
  color: '#4A4A4A',
  marginBottom: '39px',
  [props.theme.breakpoints.down('md')]: {
    marginBottom: '18px',
    fontSize: 18,
    lineHeight: '26px',
  },
}))

const Body = styled(Typography)((props) => ({
  whiteSpace: 'pre-line',
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 15,
  lineHeight: '27px',
  letterSpacing: '0.03em',
  color: '#4A4A4A',
  [props.theme.breakpoints.down('md')]: {
    fontSize: 14,
    lineHeight: '25.2px',
  },
}))

const ImageBox = styled(Box)((props) => ({
  width: '100%',
  maxWidth: '330px',
  [props.theme.breakpoints.up('md')]: {
    width: '330px',
  },
  '& > img': {
    width: '100%',
    borderRadius: '10px',
  },
}))

export const DescriptionSection: React.FC<Props> = ({
  header,
  imageURL,
  imageCaption,
  body,
}) => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ md: 'end' }}
      gap={{ md: '57px', xs: '19px' }}
    >
      <Box>
        {!!imageURL && (
          <ImageBox>
            <img src={imageURL || ''} />
          </ImageBox>
        )}
        {!!imageCaption && (
          <Typography variant="caption" sx={{ padding: '0.4rem 0 0.25rem 0' }}>
            {imageCaption}
          </Typography>
        )}
      </Box>
      <Box>
        {!!header && <Header>{header}</Header>}
        {!!body && <Body>{body}</Body>}
      </Box>
    </Stack>
  )
}
