import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [1, 2, 3]

function Drawer(props) {
    const cls = [
        classes.drawer
    ]

    if (!props.isOpen) {
        cls.push(classes.close)
    }

    return (
        <>
            <nav className={cls.join(' ')}>
                <ul>
                    { links.map((link, index) => {
                        return (
                            <li key={index}>
                                <a>Link {link}</a>
                            </li>
                        )
                    }) }
                </ul>
            </nav>
            { props.isOpen ? <Backdrop onClick={props.onClose} /> : null }       
        </>
    )
}

export default Drawer