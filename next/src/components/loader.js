import { React, makeStyles, useTheme } from 'common'
import { Loader as _Loader } from 'react-loaders'

const useStyles = makeStyles(theme => ({
    loader: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    },
    gradient: {
        width: '350px',
        height: '350px',
        backgroundImage: 'radial-gradient(circle closest-side,#00000033,#00000000)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    anim: {
        display: 'block'
    }
}))


const Loader = ({ id }) => {
    const classes = useStyles()
    return (
        <div id={id} className={classes.loader}>
            <_Loader className={classes.anim} type="ball-scale-multiple" active  />
        </div>
    )
}

export default Loader