import React from 'react'

import { Box, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

import { BulletPoint } from 'atoms'
import { COLOR } from 'theme'

const useStyles = makeStyles({
  leftBottomButton: {
    fontSize: '12px',
    color: COLOR.subOrange,
    borderBottom: `1px solid ${COLOR.subOrange}`,
    lineHeight: '13px',
    cursor: 'pointer',
  },
  textOverflowEllipsis: {
    /* https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_text-overflow */
    whiteSpace: 'nowrap',
    /* width: '100%', */
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '12px',
    lineHeight: 'normal',
  },
  wrapper: {
    width: '100%',
    display: 'grid',
    // if no prefix, skip first column
    gridTemplateColumns: (props: { hasPrefix: boolean }) =>
      props.hasPrefix ? 'auto calc(60px + 1.5rem) 1fr' : 'calc(60px + 1.5rem) 1fr',
    position: 'relative',
  },
  thumbnail: {
    borderRadius: '6px',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    backgroundColor: COLOR.backgroundBlue,
  },
})

export const EngagedRow = (props: {
  mainText: string
  subText: string
  image: string
  rowNumber?: number
  handleClickLeftButtomButton?: () => void
  leftButtomButtonText?: string
}): JSX.Element => {
  const classes = useStyles({ hasPrefix: !!props.rowNumber })

  return (
    <Box className={classes.wrapper}>
      {!!props.rowNumber && (
        <Box alignSelf="center" pr="1.5rem">
          <BulletPoint character={props.rowNumber} />
        </Box>
      )}
      <Box width="60px" height="60px" justifySelf="start">
        <img src={props.image} className={classes.thumbnail} />
      </Box>
      <Box height="60px" overflow="hidden">
        <Typography className={classes.textOverflowEllipsis}>{props.mainText}</Typography>
        <Typography className={classes.textOverflowEllipsis}>{props.subText}</Typography>
      </Box>
      <Box position="absolute" bottom="0" right="0">
        <Typography
          className={classes.leftBottomButton}
          onClick={props.handleClickLeftButtomButton}
        >
          {props.leftButtomButtonText}
        </Typography>
      </Box>
    </Box>
  )
}
