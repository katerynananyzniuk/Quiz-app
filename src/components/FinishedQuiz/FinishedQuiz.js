import classes from './FinishedQuiz.module.css'

function FinishedQuiz() {
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                <li>
                    <strong>1.</strong>
                    How are you?
                    <i className={''}></i>
                </li>
            </ul>

            <p>Correct answers: 4 from 10</p>

            <div>
                <button>Repeat</button>
            </div>
        </div>
    )
}

export default FinishedQuiz