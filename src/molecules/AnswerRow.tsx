import React from 'react'

import { Grid, Typography, Divider, Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { AnswerImageCircle } from '../atoms/AnswerImageCircle'
import { CheckCircle, RadioButtonUncheckedOutlined } from '@mui/icons-material'
import { COLOR } from 'theme'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  checkIconContainer: {
    textAlign: 'end',
  },
  answerRowContainer: {
    marginBottom: theme.spacing(1),
    cursor: 'pointer',
  },
  answerRowSelected: {
    color: COLOR.answerGray,
  },
  answerRowText: {
    fontWeight: 700,
    marginLeft: theme.spacing(3),
  },
}))

export type Props = {
  text?: string
  imgUrl?: string
}

export const AnswerRow: React.FC<Props> = ({
  text = '誕生日',
  imgUrl = 'https://picsum.photos/200/200/?random',
}) => {
  const classes = useStyles()

  const [isSelected, setIsSelected] = React.useState<boolean>(false)

  const clickHandler = React.useCallback(() => {
    setIsSelected((prev: boolean) => !prev)
  }, [])

  return (
    <>
      <Box
        onClick={clickHandler}
        className={clsx(
          classes.answerRowContainer,
          !isSelected && classes.answerRowSelected
        )}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <AnswerImageCircle image={imgUrl}></AnswerImageCircle>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2" className={classes.answerRowText}>
              {text}
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.checkIconContainer}>
            {isSelected ? <CheckCircle /> : <RadioButtonUncheckedOutlined />}
          </Grid>
        </Grid>
      </Box>
      <Divider></Divider>
    </>
  )
}
