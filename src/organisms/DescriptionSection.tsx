import React from 'react'

import { Box, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
/* import Image from 'material-ui-image'; */

import { COLOR } from 'theme'

type Props = {
  header?: string
  imageURL?: string
  imageCaption?: string
  body?: string
}

const useStyles = makeStyles({
  header: {
    padding: '1rem 0 0.5rem 0',
  },
  imageBox: {
    width: '100%',
    margin: '1rem 0 0.5rem 0',
    '& > img': {
      width: '100%',
    },
  },
  caption: {
    padding: '0.4rem 0 0.25rem 0',
  },
  body: {
    whiteSpace: 'pre-line',
    padding: '1rem 0 0.5rem 0',
  },
  bar: {
    margin: '2.5rem 0 0.75rem 0',
    width: '40px',
    height: '4px',
    backgroundColor: COLOR.primaryNavy,
  },
})

export const DescriptionSection: React.FC<Props> = ({
  header,
  imageURL,
  imageCaption,
  body,
}) => {
  const classes = useStyles()
  return (
    <Box>
      {!!header && <div className={classes.bar}></div>}
      {!!header && (
        <Typography variant="h4" className={classes.header}>
          {header}
        </Typography>
      )}
      {!!imageURL && (
        <Box className={classes.imageBox}>
          <img src={imageURL || ''} />
        </Box>
      )}
      {!!imageCaption && (
        <Typography variant="caption" className={classes.caption}>
          {imageCaption}
        </Typography>
      )}
      {!!body && (
        <Typography variant="body1" className={classes.body}>
          {body}
        </Typography>
      )}
    </Box>
  )
}
