import {React, makeStyles, classNames} from 'common'
import PlayIcon from '@material-ui/icons/PlayArrow'

const useStyles = makeStyles({
    play: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
})

const PlayButton = ({ className }) => {
    const classes = useStyles()
    const rootClasses = classNames({
        [className]: !!className,
        [classes.play]: classes.play
    })

    return (
        <div className={rootClasses}>
            <div className={classes.background}>
                <PlayIcon fontSize="large" />
            </div>
        </div>
    )
}

export default PlayButton
