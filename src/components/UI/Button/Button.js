import classes from './Button.module.css'

function Button(props) {
    const cls = [
        classes.button,
        classes[props.type]
    ]

    return (
        <button
            onClick={props.onClick}
            className={cls.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button