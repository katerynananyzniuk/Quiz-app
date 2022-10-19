import classes from './Loader.module.css'

function Loader(props) {
    return (
      <div className={classes.center}>
        <div className={classes.loader}>
          <div /><div />
        </div>
      </div>
    )
}

export default Loader