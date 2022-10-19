import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.css'
import axios from '../../axios/axios-quiz'
import {useState, useEffect} from 'react'
import Loader from '../../components/UI/Loader/Loader'

function QuizList() {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    const response = await axios.get('/quizzes.json')
    
    if (response.data) {

      const quizzes = []
      Object.keys(response.data).forEach((key, index) => {
        quizzes.push({
          id: key,
          name: `Test #${index + 1}`
        })
      })

      setQuizzes(quizzes)
      setLoading(false)
    }
    else { setLoading(false) }

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
            ? <ul>
                { renderQuizzes() }
              </ul>
            : <div className={classes.noQuizzes}>No quizzes. Please create a new one</div>
        }
      </div>
    </div>
  )
}

export default QuizList