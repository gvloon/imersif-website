import {React, makeStyles, classNames} from 'common'
import PlayIcon from '@material-ui/icons/PlayArrow'

const useStyles = makeStyles({
    icon: {
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
})

const PlayIcon = ({ className }) => {
    const classes = useStyles()
    const rootClasses = classNames({
        [className]: !!className,
        [classes.icon]: classes.icon
    })

    return (
        <div className={rootClasses}>
            <PlayIcon />
        </div>
    )
}

export default PlayIcon