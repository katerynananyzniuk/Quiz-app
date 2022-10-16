import React from 'react'
import classes from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'

function AnswersList({ answers, onAnswerClick, rightAnswer, state }) { 
  return(
    <ul className={classes.answersList}>
      { answers.map( answer => {
        return (
          <AnswerItem 
            key={answer.id}
            answer={answer}
            onAnswerClick={onAnswerClick}
            rightAnswer={rightAnswer}
            state={state ? state[answer.id] : null}
          />
        )
      }) }
    </ul>
  )
}

export default AnswersList