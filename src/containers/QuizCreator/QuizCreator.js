import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import { Fragment, useState } from 'react'
import {createControl, validate, validateForm} from '../../form/formFramework'

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
      label: 'Add a question :',
      errorMessage: 'The question shouldn\'t be empty'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

function QuizCreator() {
  const [quiz, setQuiz] = useState([])
  const [formControls, setFormControls] = useState(() => createFormControls())
  const [rightAnswerId, setRightAnswerIId] = useState(1)
  const [isFormValid, setIsFormValid] = useState(false)

  function submitHandler(event) {
    event.preventDefault()
  }

  function addQuestionHandler(event) {
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
    setFormControls(createFormControls())
    setRightAnswerIId(1)
    setIsFormValid(false)
  }
  
  function createQuizHandler() {
    console.log('fuiz:', quiz);
    // todo: server
  }
  
  function onChangeHandler(event, controlName) {
    const newFormControls = { ...formControls }
    const newControl = { ...formControls[controlName] }

    newControl.touched = true
    newControl.value = event.target.value
    newControl.valid = validate(newControl.value, newControl.validation)

    newFormControls[controlName] = newControl

    setFormControls(newFormControls)
    setIsFormValid(() => {
      return validateForm(newFormControls)
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
        <h1>Create a quiz</h1>

        <form onSubmit={submitHandler}>

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
            Create a quiz
          </Button>
        </form>
      </div>
    </div>
  )
}

export default QuizCreator