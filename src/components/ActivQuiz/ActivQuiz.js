import classes from './ActivQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

function ActivQuiz({ 
  answers, 
  question, 
  onAnswerClick, 
  quizLength, 
  questionNumber, 
  rightAnswer, 
  state 
}) {
  return (
    <div className={classes.activQuiz}>
      <p className={classes.question}>
        <span>
          <strong>{ questionNumber }.</strong>&nbsp;
          { question }
        </span>

        <small>{ questionNumber } in { quizLength }</small>
      </p>

      <AnswersList
        answers={answers}
        onAnswerClick={onAnswerClick}
        rightAnswer={rightAnswer}
        state={state}
      />
    </div>
  )
}

export default ActivQuiz