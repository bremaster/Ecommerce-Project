import React, { FC } from 'react'
import { Box, Grid } from '@mui/material'
import { AnswerCircle } from 'atoms/AnswerCircle'
import { useTrail, animated, config } from 'react-spring'
import { AnswerWithHandler } from 'constants/index'

const AnimatedBox = animated(Box)

export type Props = {
  answers: AnswerWithHandler[]
  showQuiz: boolean
}

export const AnswerCircleGroup: FC<Props> = (props) => {
  const { answers, showQuiz } = props
  const trail = useTrail(answers.length, {
    opacity: 1,
    from: {
      opacity: 0,
    },
    config: config.slow,
    reset: true, // asnwers.length が一つ前の質問から変わらないと、trail が初期化されないので
    reverse: !showQuiz,
  })

  return (
    <Grid container direction="row" alignItems="baseline">
      {answers.map((answer: AnswerWithHandler, index: number) => {
        return (
          <Grid item xs={3} key={answer.title}>
            <AnimatedBox style={trail[index]} py={0}>
              <AnswerCircle
                size={index === 0 || index === answers.length - 1 ? 'medium' : 'small'}
                onClick={answer.handleClick}
                description={answer.description}
              ></AnswerCircle>
            </AnimatedBox>
          </Grid>
        )
      })}
    </Grid>
  )
}
