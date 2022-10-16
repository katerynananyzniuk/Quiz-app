import { useState } from 'react'
import classes from './Quiz.module.css'
import ActivQuiz from '../../components/ActivQuiz/ActivQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

function Quiz() {
  const defaultQuiz = [
    {
      question: 'What color is the sky?',
      rightAnswerId: 2,
      id: 1,
      answers: [
        {id: 1, text: 'black'},
        {id: 2, text: 'blue'},
        {id: 3, text: 'red'},
        {id: 4, text: 'green'},
      ]
    },
    {
      question: 'What does a lemon taste like?',
      rightAnswerId: 3,
      id: 2,
      answers: [
        {id: 1, text: 'sweet'},
        {id: 2, text: 'bitter'},
        {id: 3, text: 'sour'},
        {id: 4, text: 'salty'},
      ]
    }
  ]

  const [quiz, setQuiz] = useState(defaultQuiz)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [answerState, setAnswerState] = useState(null) // { [id] : 'success' 'error' }
  const [isFinished, setIsFinished] = useState(false)
  const [results, setResults] = useState({}) // { [id] : 'success' 'error' }

  const onAnswerClickHandler = (answerId) => {
    const question = quiz[activeQuestion]

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
        
      setAnswerState({[answerId]: 'success'})
      setResults(results)

      const timeout = window.setTimeout(() => {
        if (isQuizFinished()) {
          setIsFinished(true)
        } else {
          setActiveQuestion( activeQuestion + 1 )
          setAnswerState(null)
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      setAnswerState({[answerId]: 'error'})
      setResults(results)
    }
  }

  function isQuizFinished() {
    return activeQuestion + 1 === quiz.length
  }

  function onRetryHandler() {
    setActiveQuestion(0)
    setAnswerState(null)
    setIsFinished(false)
    setResults({})
  }

  return (
    <div className={classes.quiz}>
      <div className={classes.quizWrapper}>
        <h1>Answer to all questions:</h1>

        {
          isFinished 
            ? <FinishedQuiz 
                results={results}
                quiz={quiz}
                onRetry={onRetryHandler}
              />
            : <ActivQuiz 
                question={quiz[activeQuestion].question}
                answers={quiz[activeQuestion].answers}
                rightAnswer={quiz[activeQuestion].rightAnswerId}
                onAnswerClick={onAnswerClickHandler}
                quizLength={quiz.length}
                questionNumber={activeQuestion + 1}
                state={answerState}
              />
        }

      </div>
    </div>
  )
}

export default Quiz