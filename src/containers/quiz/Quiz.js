import { useEffect, useState } from 'react'
import classes from './Quiz.module.css'
import ActivQuiz from '../../components/ActivQuiz/ActivQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import { useParams } from 'react-router-dom'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

function Quiz() {
  const {quizId} = useParams()
  console.log('Quiz id:', quizId)

  const [quiz, setQuiz] = useState([])
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [answerState, setAnswerState] = useState(null) // { [id] : 'success' 'error' }
  const [isFinished, setIsFinished] = useState(false)
  const [results, setResults] = useState({}) // { [id] : 'success' 'error' }
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    const response = await axios.get(`/quizzes/${quizId}.json`)
    console.log('response:', response)

    const quiz = response.data

    setQuiz(quiz)
    setLoading(false)
  }

  useEffect(() => {
    try {
      fetchData()
    } catch(e) {
      console.log(e)
    }
  },[])

  const onAnswerClickHandler = (answerId) => {
    const question = quiz[activeQuestion]

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
        
      setAnswerState({[answerId]: 'success'})
      setResults(results)

    } else {
      results[question.id] = 'error'
      setAnswerState({[answerId]: 'error'})
      setResults(results)
    }
    const timeout = window.setTimeout(() => {
      if (isQuizFinished()) {
        setIsFinished(true)
      } else {
        setActiveQuestion( activeQuestion + 1 )
        setAnswerState(null)
      }
      window.clearTimeout(timeout)
    }, 1000)
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

  useEffect(() => {

  }, [])

  return (
    <div className={classes.quiz}>
      <div className={classes.quizWrapper}>
        <h1>Answer to all questions:</h1>

        {
          loading
            ? <Loader />
            : isFinished 
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