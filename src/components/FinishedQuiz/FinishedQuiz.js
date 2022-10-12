import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'

function FinishedQuiz(props) {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }

        return total
    }, 0)

    return (
        <div className={classes.finishedQuiz}>
            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]

                    return (
                        <li key={index}>
                            <strong>{ index + 1 }</strong>.&nbsp;
                            {quizItem.question}&nbsp;
                            <i className={cls.join(' ')}></i>
                        </li>
                    )
                }) }
            </ul>

            <p>Correct answers: {successCount} from {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type="primary">Repeat</Button>
                <Button type="success">Go back to tests</Button>
            </div>
        </div>
    )
}

export default FinishedQuiz