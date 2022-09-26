import { useReducer, useState, useEffect } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'

import { QUERY_GET_SURVEYS } from 'container/hooks'
import { dataLayerPush } from 'utilities/GoogleAnalytics'
import { WAIT_TIME_FADE_OUT, PRICING_QUIZ_ID } from 'constants/index'
import { usePreviousPage } from 'container/hooks/sender/usePreviousPage'
import { Quiz, Answer } from 'constants/index'
import { useCollaboratorProfile } from 'container/CollaboratorContainer'

/**
 * アンケート取得用
 */
export function useSurvey(): {
  page: number
  quizList: Array<Quiz>
  answeredQuizIds: { [key: number]: string }
  loading: boolean
} {
  const navigate = useNavigate()
  const { quizSetting } = useCollaboratorProfile()
  const { pathname } = useLocation()
  const [fetch, { loading, data }] = useLazyQuery<{ quiz: Quiz }>(QUERY_GET_SURVEYS)

  const page = parseInt(pathname.split('/').slice(-1)[0], 10) // get survery number from path. path holds state.
  // ステップフォワード or バックの判別に用いる
  const prevPage = usePreviousPage(page)

  const [quizList, setQuizList] = useState<Array<Quiz>>([])
  const [answeredQuizIds, dispatch] = useReducer(
    (state: { [key: number]: string }, action: { page: number; answerId: string }) => {
      const answerd = { [action.page]: action.answerId }
      return { ...state, ...answerd }
    },
    {}
  )

  // for google tag manager data layer
  const pushAnswerToDataLayer = (answerId: string, answerName: string) => {
    dataLayerPush({
      event: 'onClickAnswerButton',
      quiz: {
        id: data?.quiz.sys.id,
        name: data?.quiz.title,
      },
      answer: {
        id: answerId,
        name: typeof answerName === 'number' ? answerName : answerName,
      },
    })
  }

  const setAnsweredQuizId = (page: number, answer: Pick<Answer, 'nextQuiz' | 'sys'>) => {
    const {
      nextQuiz,
      sys: { id: answerId },
    } = answer

    dispatch({ page, answerId })
    if (nextQuiz === null) {
      navigate(`../loading`)
    } else if (nextQuiz.sys.id === PRICING_QUIZ_ID && quizSetting.shouldSkipPricingQuiz) {
      navigate(`../loading`)
    } else {
      navigate(`./${page + 1}`)
    }
  }

  useEffect(() => {
    if (prevPage <= page || page === 1) {
      const prevQuiz = quizList[page - 2]
      const selectedPageAnswer = prevQuiz
        ? prevQuiz.answersCollection.items?.find((answer) => {
            return answer.sys.id === answeredQuizIds[page - 1]
          })
        : undefined

      const nextQuizId = () => {
        const FIRST_QUIZ_ID = quizSetting.firstQuiz

        return selectedPageAnswer !== undefined
          ? selectedPageAnswer.nextQuiz?.sys.id
          : FIRST_QUIZ_ID
      }

      const isPreview = process.env.REACT_APP_ENV === 'staging' ? true : false
      fetch({ variables: { preview: isPreview, id: nextQuizId() } })

      if (typeof data !== 'undefined') {
        const { items: childAnswers } = data.quiz.answersCollection

        // 反応が早すぎるとクリックされた際のエフェクトがでないので、少し待つようイベントハンドラーにディレイ設定
        const answersWithHandler = childAnswers?.map((answer) => {
          return {
            ...answer,
            handleClick: () =>
              setTimeout(() => {
                pushAnswerToDataLayer(answer.sys.id, answer.title)
                setAnsweredQuizId(page, answer)
              }, WAIT_TIME_FADE_OUT),
          }
        })

        const newQuizList: Array<Quiz> = quizList
        newQuizList[page - 1] = {
          ...data.quiz,
          linkToAnswers: answersWithHandler,
        }
        setQuizList(newQuizList)
      }
    }
  }, [page, data])

  return { page, quizList, answeredQuizIds, loading }
}
