import { React, makeStyles } from 'common'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    button: {
        width: '100%',
        height: '40px',
        marginTop: '2rem',
        borderRadius: '20px'
    },
    outlined: {
        borderColor: '#ddd'
    },
    label: {
        color: '#666'
    }
}))



const LoadMore = ({ onClick }) => {
    const classes = useStyles()
    const buttonClasses = {
        outlined: classes.outlined,
        label: classes.label
    }
    return (
        <Button onClick={onClick} className={classes.button} classes={buttonClasses} variant="outlined">More results</Button>
    )
}

export default LoadMore
