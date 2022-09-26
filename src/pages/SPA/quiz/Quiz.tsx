import React, { useState, useEffect, Fragment } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { animated } from 'react-spring'
import { CssBaseline, Container, Box, Grid, Typography, Fade } from '@mui/material'
import { AnswerButton } from 'atoms/AnswerButton'
import { AnswerImage } from 'atoms/AnswerImage'
import { BackButton } from 'atoms/BackButton'
import { AnswerCircleGroup } from 'organisms'
import { WAIT_TIME_FADE_IN, WAIT_TIME_FADE_OUT } from 'container/ProductContainer'
import { usePreventClickMashing } from 'utilities/CommonHooks'
import { AnswerWithHandler } from 'constants/index'

export type QuizProps = {
  quizType: string | null
  content: string
  linkToAnswers?: AnswerWithHandler[] | undefined
  page: number
  tip: string | null
}

export const Quiz = ({
  quizType,
  content,
  linkToAnswers,
  page,
  tip,
}: QuizProps): JSX.Element => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [showQuiz, setShowQuiz] = useState(false)

  const { withClickStopSideEffect } = usePreventClickMashing()

  const handleBackClicked = withClickStopSideEffect(() => {
    navigate(`./${page - 1}`)
  })

  const answersWithHandler = linkToAnswers?.map((answer) => {
    return {
      ...answer,
      handleClick: withClickStopSideEffect(() => {
        setShowQuiz((showQuiz) => !showQuiz)
        answer.handleClick()
      }),
    }
  })

  useEffect(() => {
    setShowQuiz(true)
  }, [pathname])

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Fade
          in={showQuiz}
          timeout={{
            enter: WAIT_TIME_FADE_IN,
            exit: WAIT_TIME_FADE_OUT,
          }}
        >
          <div>
            {/* CAUTION: div ではなく Fragment を↑で利用すると、なぜかフェードアウトが効かなくなるので注意(Mobile) */}
            {/* Box のせい？ */}
            <Box
              sx={{
                padding: '3rem 0 100px 0',
                // HACKED!
                // see https://stackoverflow.com/questions/44645465/when-using-height-100vh-for-the-container-vertical-scrollbar-appears
                // use 100% when refactoring
                minHeight: 'calc(100vh - 50px)',
                position: 'relative',
                '&  > *:last-child': {
                  marginBottom: '30px',
                },
              }}
            >
              <QuizContent
                showQuiz={showQuiz}
                quizType={quizType}
                content={content}
                answers={answersWithHandler}
                tip={tip}
              />
              {page !== 1 && (
                <BackButton position="bottom" handleClick={handleBackClicked} />
              )}
            </Box>
          </div>
        </Fade>
      </Container>
    </Fragment>
  )
}

// animation hook is available only in `animated` component
// https://www.react-spring.io/docs/hooks/basics
const AnimatedBox = animated(Box)

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
                  <Typography>{answer.title}</Typography>
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
        <Typography>
          <span>{tip}</span>
        </Typography>
      )}
    </React.Fragment>
  )
}
