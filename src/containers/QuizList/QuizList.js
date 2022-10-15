import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.css'

function QuizList() {

    function renderQuizes() {
        return [1, 2, 3].map((quiz, index) => {
            return (
                <li
                    key={index}
                >
                    <NavLink
                        to={'/quiz/' + quiz}
                    >
                        Test {quiz}
                    </NavLink>
                </li>
            )
        })
    }

    return (
        <div className={classes.quizList}>
            <div>
                <h1>Test list</h1>

                <ul>
                    { renderQuizes() }
                </ul>
            </div>
        </div>
    )
}

export default QuizList