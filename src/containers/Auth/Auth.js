import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function Auth() {
  const navigate = useNavigate()

  const defaultValues = {
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Enter email correctly',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Password',
      errorMessage: 'Wrong password. Use 6 or more characters.',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  }
  const [formControls, setFormControls] = useState(defaultValues)
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSignIn, setIsSignIn] = useState(null)
  const [isSignUp, setIsSignUp] = useState(true)

  async function signInHandler() {
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTcRCyGSIJx7I18fThAqCZg8gF0aWwmsA', authData)
      console.log("LogIn data:", response.data)
      navigate('/')
    } catch(e) {
      console.log(e)
      if (e.response.status === 400) {
        setIsSignUp(false)
      }
    }
  }
  
  async function signUpHandler() {
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTcRCyGSIJx7I18fThAqCZg8gF0aWwmsA', authData)
      console.log("SignUp data:", response.data)
    } catch(e) {
      console.log(e)
    }
  }

  function submitHandler(event) {
    event.preventDefault()
  }

  function validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = !!validateEmail(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.trim().length >= validation.minLength && isValid
    }

    return isValid
  }

  function onChangeHandler(event, controlName) {
    const newFormControls = { ...formControls }
    const newControl = { ...formControls[controlName] }

    newControl.value = event.target.value
    newControl.touched = true
    newControl.valid = validateControl(newControl.value, newControl.validation)

    newFormControls[controlName] = newControl

    setFormControls(newFormControls)
    setIsFormValid(() => {
      let isFormValid = true

      Object.keys(newFormControls).forEach((name) => {
        isFormValid = newFormControls[name].valid && isFormValid
      })

      return isFormValid
    })
  }

  function renderInputs() {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={event => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  return (
    <div className={classes.auth}>
      <div >
        <h1>Authorization</h1>

        <form 
          onSubmit={submitHandler}
          className={classes.authForm}
        >
          { renderInputs() }

          <div className={classes.formSubmit}>
            <div className={classes.btnGroup}>
              <Button 
                type="success"
                onClick={signInHandler}
                disabled={!isFormValid}
              >
                Sign in
              </Button>
              <Button
                type="primary"
                onClick={signUpHandler}
                disabled={!isFormValid}
              >
                Sign up
              </Button>
            </div>
            { !isSignUp
              ? <div className={classes.error}>
                  You are not&nbsp;
                  <span className={classes.primary}>Sign up</span>
                </div>
              : null
            }
          </div>

        </form>
      </div>
    </div>
  )
}

export default Auth