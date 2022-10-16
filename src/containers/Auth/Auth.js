import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {useState} from 'react'

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function Auth() {
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
      errorMessage: 'Enter password correctly',
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

  function loginHandler() {

  }
  
  function signUpHandler() {

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

    setFormControls(() => {
      return newFormControls
    })
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

          <Button 
            type="success"
            onClick={loginHandler}
            disabled={!isFormValid}
          >
            Log in
          </Button>
          <Button
            type="primary"
            onClick={signUpHandler}
            disabled={!isFormValid}
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Auth