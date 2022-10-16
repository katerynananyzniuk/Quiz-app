import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'

const links = [
  { to:'/', label:'Test list', end: true },
  { to:'/auth', label:'Autorization', end: false },
  { to:'/quiz-creator', label:'Create test', end: true }
]

const activeClassName = classes.active

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
                <NavLink 
                  to={link.to}
                  end={link.end}
                  style={({ isActive }) =>
                    isActive ? {activeClassName} : undefined
                  }
                  onClick={props.onClose}
                >
                  {link.label}
                </NavLink>
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