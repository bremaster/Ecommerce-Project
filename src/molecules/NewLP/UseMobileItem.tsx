import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

const useUseMobileItemStyle = makeStyles({
  itemwrap: {
    width: '90%',
    alignItems: 'center',
    maxWidth: '500px',
    margin: '0 auto',
    gap: 16,
  },
  image: {
    filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.1))',
    '& img': {
      borderRadius: '20px',
      width: '100%',
    },
  },
  step: {
    marginBottom: '-20px',
    zIndex: 2,
    '& h3': {
      fontFamily: 'Outfit',
      fontSize: '50px',
      fontWeight: 600,
      lineHeight: '50px',
      background:
        'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '20%',
    },
    '& p': {
      fontFamily: 'Outfit',
      fontSize: '17px',
      fontWeight: 600,
      lineHeight: '17px',
      background:
        'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '0.2em',
    },
  },
  title: {
    fontFamily: 'Noto Sans JP',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '24px',
    letterSpacing: '0.03em',
    color: '#4A4A4A',
    zIndex: 2,
  },
  background: {
    position: 'absolute',
    background:
      'linear-gradient(102.49deg, #FFF3E9 -18.78%, #FFECDD -12.51%, #FFEAE7 56.55%, #EBE6FF 166.15%)',
    height: '126px',
    width: '100%',
    top: '40%',
  },
})

type Props = {
  item: {
    image: string
    title: string
  }
  number: number
}

const UseMobileItem: React.FC<Props> = ({ item, number }) => {
  const classes = useUseMobileItemStyle()

  return (
    <Box position="relative">
      <Stack className={classes.background} />
      <Stack
        direction={number % 2 == 1 ? 'row' : 'row-reverse'}
        className={classes.itemwrap}
      >
        <Stack width="52%">
          <Stack className={classes.step} alignItems="center">
            <Typography component="p">STEP</Typography>
            <Typography component="h3">0{number}</Typography>
          </Stack>
          <Box className={classes.image}>
            <Box component="img" src={item.image} />
          </Box>
        </Stack>
        <Stack width="48%">
          <Typography mt={3} className={classes.title} align="left">
            {item.title}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export { UseMobileItem }
