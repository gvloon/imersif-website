import {React, makeStyles, classNames} from 'common'
import PlayIcon from '@material-ui/icons/PlayArrow'

const useStyles = makeStyles({
    play: {
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
            <PlayIcon fontSize="large" />
        </div>
    )
}



export default PlayButton
