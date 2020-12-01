import { React, PropTypes, makeStyles } from 'common'

const useStyles = makeStyles({
    youtube: {
        position: 'relative',
        width: '100%',
        height: 0,
        paddingBottom: '56.25%'
    },
    player: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    caption: {
        fontStyle: 'italic',
        fontSize: '0.9rem'
    }
})

const Youtube = props => {
    const { id, caption, className } = props
    const classes = useStyles()
    return (
        <div className={className}>
            <div className={classes.youtube}>
                <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    className={classes.player}
                    frameBorder="0"
                    allowFullScreen>
                </iframe>
            </div>
            {
                caption &&
                <div className={classes.caption}>{caption}</div>
            }
        </div>
    )
}

Youtube.propTypes = {
    id: PropTypes.string,
    caption: PropTypes.string
}

export default Youtube
