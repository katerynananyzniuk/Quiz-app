import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.css'
import axios from '../../axios/axios-quiz'
import {useState, useEffect} from 'react'
import Loader from '../../components/UI/Loader/Loader'
import Button from '../../components/UI/Button/Button'

function QuizList() {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDelete, setIsDelete] = useState(false)

  const cls = [
    classes.deleteTest,
    'fa',
    'fa-times'
  ]
  async function fetchData() {
    const response = await axios.get('/quizzes.json')
    
    if (response.data) {
      const quizzes = []
      Object.keys(response.data).forEach((key, index) => {
        const quiz = response.data[key]
        quizzes.push({
          id: key,
          name: quiz.testName || `Test ${index + 1}`
        })
      })

      setQuizzes(quizzes)
      setLoading(false)
    }
    else { setLoading(false) }
  }

  async function deleteData(quizId) {
    const response = await axios.get('/quizzes.json')
    const quizzesBE = {...response.data}
    
    for (let quiz in quizzesBE) {
      if (quiz === quizId) {
        delete quizzesBE[quiz]
      }
    }
    await axios.put('/quizzes.json', quizzesBE)

    const newQuizzes = quizzes.concat().filter(item => item.id !== quizId)
    setQuizzes(newQuizzes)
  }

  useEffect(() => {
    try {
      fetchData()
    } catch(e) {
      console.log(e)
    }
  }, [])

  function renderQuizzes() {
    return quizzes.map(quiz => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink
            to={'/quiz/' + quiz.id}
          >
            {quiz.name}
          </NavLink>
          {
            isDelete
            ? <i 
                title="delete test"
                onClick={() => deleteData(quiz.id)}
                className={cls.join(' ')}
              ></i>
            : null
          }
        </li>
      )
    })
  }

  return (
    <div className={classes.quizList}>
      <div>
        <h1>Test list</h1>

        { 
          loading
          ? <Loader /> 
          : quizzes.length
            ? <div>
                <ul>
                  { renderQuizzes() }
                </ul>
                <button
                  className={classes.deleteBtn}
                  onClick={() => setIsDelete(!isDelete)}
                >
                  {
                    isDelete
                    ? 'Save tests'
                    : 'Delete tests'
                  }
                </button>
              </div>
            : <div className={classes.noQuizzes}>No quizzes. Please create a new one</div>
        }
      </div>
    </div>
  )
}

export default QuizList