import classes from './AnswerItem.module.css'

function AnswerItem({ answer, onAnswerClick, state }) {
  const cls = [classes.answerItem]

  if (state) {
    cls.push(classes[state])
  }

  return(
    <li 
      className={cls.join(' ')}
      onClick={() => onAnswerClick(answer.id)}
    >
      { answer.text }
    </li>
  )
}

export default AnswerItem