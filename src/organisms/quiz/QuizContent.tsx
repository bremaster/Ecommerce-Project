import React from 'react'

import { Box, Grid, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { animated } from 'react-spring'

import { AnswerButton } from 'atoms/AnswerButton'
import { AnswerImage } from 'atoms/AnswerImage'
import { AnswerCircleGroup } from 'organisms/AnswerCircleGroup'
import { AnswerWithHandler } from 'constants/index'

// animation hook is available only in `animated` component
// https://www.react-spring.io/docs/hooks/basics
const AnimatedBox = animated(Box)

const useStyles = makeStyles({
  imageText: {
    textAlign: 'center',
    fontSize: '0.9rem',
  },
  tipSection: {
    marginTop: '4rem',
    '& > span': {
      fontSize: '13.5px',
      fontWeight: '700',
      borderBottom: 'solid 1px',
    },
  },
})

export type QuizContentProps = {
  quizType: string | null
  content: string
  answers?: AnswerWithHandler[] | undefined
  showQuiz: boolean
  tip: string | null
}

//organism
// NOTICE: Quizの文言と、Ansersは分けた方が良いかも
const QuizContent = ({
  quizType = 'box selection',
  content = '今回贈る相手との関係は？',
  answers = [],
  showQuiz = true,
  tip = '',
}: QuizContentProps) => {
  const classes = useStyles()
  // WARN: もし useChain でクイズ文のあとに実行しても、２回目以降はクイズ文のアニメーションが走らない

  return (
    <React.Fragment>
      <Box mb="5vh">
        <h5>
          <b>{content}</b>
        </h5>
      </Box>
      <Box>
        {/** need m-0 to avoid negative margin */}
        {quizType === 'image selection' && (
          <Grid container spacing={2} direction="row" justifyContent="center">
            {answers.map((answer, index) => (
              <Grid item xs={6} key={index}>
                <AnimatedBox py={0}>
                  <Box my={1}>
                    <AnswerImage
                      handleClick={answer.handleClick}
                      image={answer.imageUrl as string}
                    />
                  </Box>
                  <Typography className={classes.imageText}>{answer.title}</Typography>
                </AnimatedBox>
              </Grid>
            ))}
          </Grid>
        )}
        {quizType === 'box selection' ||
          (quizType === null &&
            answers.map((answer, index) => (
              <AnimatedBox key={index} py={0}>
                <Box my={1}>
                  <AnswerButton handleClick={answer.handleClick}>
                    {answer.title}
                  </AnswerButton>
                </Box>
              </AnimatedBox>
            )))}
        {quizType === 'level selection' && (
          <Box py={10}>
            <AnswerCircleGroup showQuiz={showQuiz} answers={answers}></AnswerCircleGroup>
          </Box>
        )}
      </Box>
      {!!tip && (
        <Typography className={classes.tipSection}>
          <span>{tip}</span>
        </Typography>
      )}
    </React.Fragment>
  )
}

export default QuizContent
