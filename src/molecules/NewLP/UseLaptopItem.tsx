import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

const useUseLaptopItemStyle = makeStyles({
  image: {
    filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.1))',
    '& img': {
      borderRadius: '20px',
      width: '222px',
    },
  },
  step: {
    marginBottom: '-25px',
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
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '30px',
    letterSpacing: '0.03em',
    textAlign: 'center',
    color: '#4A4A4A',
  },
})

type Props = {
  item: {
    image: string
    title: string
  }
  number: number
}

const UseLaptopItem: React.FC<Props> = ({ item, number }) => {
  const classes = useUseLaptopItemStyle()

  return (
    <Stack>
      <Stack className={classes.step} alignItems="start">
        <Typography component="p" align="center">
          STEP
        </Typography>
        <Typography component="h3">0{number}</Typography>
      </Stack>
      <Stack className={classes.image}>
        <Box component="img" src={item.image} />
      </Stack>
      <Typography mt={3} className={classes.title} align="center">
        {item.title}
      </Typography>
    </Stack>
  )
}

export { UseLaptopItem }
