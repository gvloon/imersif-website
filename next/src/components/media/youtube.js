import { React, PropTypes, getStyle, makeStyles } from 'common'

const useStyles = makeStyles({
    root: {
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
    }
})

const Youtube = props => {
    const { id } = props
    const style = getStyle(props)
    const classes = useStyles()
    return (
        <div className={classes.root} style={style}>
            <iframe
                src={`https://www.youtube.com/embed/${id}`}
                className={classes.player}
                frameBorder="0"
                allowFullScreen>
            </iframe>
        </div>
    )
}

Youtube.propTypes = {
    id: PropTypes.string
}

export default Youtube
