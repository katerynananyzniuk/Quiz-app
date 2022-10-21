import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import { Fragment, useState, useEffect } from 'react'
import {createControl, validate, validateForm} from '../../form/formFramework'
import axios from '../../axios/axios-quiz'
import { useNavigate } from 'react-router-dom'

function createOptionControl(number) {
  return createControl({
    label: `Option ${number}`,
    errorMessage: 'The option value shouldn\'t be empty',
    id: number
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Question :',
      errorMessage: 'The question shouldn\'t be empty'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

function QuizCreator() {
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState([])
  const [formControls, setFormControls] = useState(() => createFormControls())
  const [rightAnswerId, setRightAnswerIId] = useState(1)
  const [isFormValid, setIsFormValid] = useState(false)
  const [testName, setTestName] = useState('')
  const [test, setTest] = useState({})

  function submitHandler(event) {
    event.preventDefault()
  }

  function addQuestionHandler() {
    const newQuiz = quiz.concat()
    const index = quiz.length + 1

    const {question, option1, option2, option3, option4} = formControls

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }

    newQuiz.push(questionItem)
    
    setQuiz(newQuiz)
    setTest({test: newQuiz, testName: testName})
    setFormControls(createFormControls())
    setRightAnswerIId(1)
    setIsFormValid(false)
  }
  
  async function createQuizHandler() {
    try {
      const response = await axios.post('/quizzes.json', test)
      setQuiz([])
      setFormControls(() => createFormControls())
      setRightAnswerIId(1)
      setIsFormValid(false)
      setTestName('')
      setTest({})
      navigate('/')
    } catch(e) {
      console.log(e)
    }
  }
  
  function onChangeHandler(event, controlName) {
    const controls = { ...formControls }
    const control = { ...formControls[controlName] }

    control.touched = true
    control.value = event.target.value
    control.valid = validate(control.value, control.validation)

    controls[controlName] = control

    setFormControls(controls)
    setIsFormValid(() => {
      return validateForm(controls)
    })
  }

  function selectChangeHandler(event) {
    setRightAnswerIId(() => {
      return +event.target.value
    })
  }

  function renderInputs() {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName]

      return (
        <Fragment key={controlName + index}>
          <Input 
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => onChangeHandler(event, controlName)}
          />
          { index === 0 ? <hr/> : null }
        </Fragment>
      )
    })
  }

  return (
    <div className={classes.quizCreator}>
      <div>
        <h1>Test creation</h1>

        <form onSubmit={submitHandler}>
          
          <div className={classes.testName}>
            <Input
              label="Test name:"
              value={testName}
              onChange={event => setTestName(event.target.value)}
            />
          </div>

          { renderInputs() }

          <Select 
            label="Choose the correct answer"
            value={rightAnswerId}
            onChange={selectChangeHandler}
            options={[
              {text: 1, value: 1},
              {text: 2, value: 2},
              {text: 3, value: 3},
              {text: 4, value: 4}
            ]}
          />

          <div className={classes.formSubmit}>
            <div className={classes.btnGroup}>
              <Button
                type="primary"
                onClick={addQuestionHandler}
                disabled={!isFormValid}
                >
                Add a question
              </Button>

              <Button
                type="success"
                onClick={createQuizHandler}
                disabled={quiz.length === 0}
                >
                Create a test
              </Button>
            </div>

            { quiz.length
              ? <div>
                  {quiz.length}&nbsp;
                  {quiz.length > 1 ? 'questions' : 'question'}&nbsp;
                  <span className={classes.success}>added</span>
                </div>
              : null
            }
          </div>

        </form>
      </div>
    </div>
  )
}

export default QuizCreator