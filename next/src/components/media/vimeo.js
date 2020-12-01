import { React, PropTypes, makeStyles } from 'common'
const useStyles = makeStyles({
    vimeo: {
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%'
    },
    player: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    caption: {
    }
})

const Vimeo = ({ id, caption, className }) => {
    const classes = useStyles()
    return (
        <div className={className}>
            <div className={classes.vimeo}>
                <iframe
                    src={`https://player.vimeo.com/video/${id}`}
                    className={classes.player}
                    frameBorder='0'
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                    allowFullScreen={true} />
            </div>
            {
                caption &&
                <div className={classes.caption}>{caption}</div>
            }
        </div>
    )
}

Vimeo.propTypes = {
    id: PropTypes.string
}

export default Vimeo
