import React from 'react'

import { Box, Stack } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import { LANDING_USE_ITEM_LIST } from 'constants/index'

import { UseLaptopItem } from 'molecules'

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      maxWidth: '1200px',
      margin: '0 auto',
      zIndex: 2,
    },
    arrow: {
      width: 25,
    },
    bottom: {
      width: '100%',
      height: '212px',
      background:
        'linear-gradient(102.49deg, #FFF3E9 -18.78%, #FFECDD -12.51%, #FFEAE7 56.55%, #EBE6FF 166.15%)',
      marginTop: '-145px',
    },
  })
)

export const UseLaptop = () => {
  const classes = useStyles()

  return (
    <Stack mt={12}>
      <Stack className={classes.list} gap={5} direction="row">
        {LANDING_USE_ITEM_LIST.map((item, index) => (
          <Stack gap={5} direction="row" key={index}>
            <Box>
              <UseLaptopItem item={item} number={index + 1} />
            </Box>
            {index + 1 < LANDING_USE_ITEM_LIST.length && (
              <Stack alignItems="center" justifyContent="center">
                <Box
                  component="img"
                  src="/assets/CaretDown.svg"
                  className={classes.arrow}
                />
              </Stack>
            )}
          </Stack>
        ))}
      </Stack>
      <Box className={classes.bottom}></Box>
    </Stack>
  )
}
