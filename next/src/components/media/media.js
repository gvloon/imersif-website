import {React, withStyles, classNames, delay} from 'common'
import {AnimatePresence, motion} from 'framer-motion'
import Video from './video'
import PlayButton from './play-button'

const styles = theme => ({
    root: {
        position: 'relative'
    },
    media: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
    },
    overlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
    },
    button: {
        position: 'absolute',
        margin: 'auto',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        textAlign: 'center'
    },
    pointer: {
        cursor: 'pointer'
    }
})

const animations = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5
        }
    }
}

class Media extends React.Component {
    constructor(props) {
        super(props)

        this.playPromise = null
        this.hovering = false
    }

    render = () => {
        const {image, video, className, classes} = this.props
        if (!image && !video) {
            return null
        }

        const rootClasses = classNames({
            [className]: !!className,
            [classes.root]: true,
            [classes.pointer]: !!video
        })

        return (
            <div className={rootClasses} onClick={this.onClick} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                {this.renderMedia()}
                {this.renderChildren()}
            </div>
        )
    }

    renderMedia = () => {
        const {video} = this.props

        if (video) {
            return (
                <AnimatePresence key="presence">
                    { this.renderVideo() }
                    { this.renderOverlay() }
                </AnimatePresence>
            )
        } else {
            return this.renderImage()
        }
    }

    renderOverlay = () => {
        const {image, playing, classes} = this.props
        if (playing)
            return null

        return (
            <motion.div
                key="overlay"
                variants={animations}
                className={classes.overlay}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {
                    image &&
                    <img key="image" alt="" className={classes.media} src={image.url}/>
                }
                <PlayButton className={classes.button} />
            </motion.div>
        )
    }

    renderVideo = () => {
        const {video, playing, classes} = this.props
        return (
            <Video
                key="video"
                className={classes.media}
                src={video.url}
                playing={playing}
                onVideoFinished={this.onVideoFinished}
            />
        )
    }

    renderImage = () => {
        const {image, classes} = this.props

        return <img key="image" alt="" className={classes.media} src={image.url}/>
    }

    renderChildren = () => {
        const {children, classes} = this.props
        if (!children) {
            return null
        }
        return (
            <div className={classes.overlay}>
                {children}
            </div>
        )
    }

    onMouseOver = async evt => {
        console.log('onMouseOver: ' + evt.target)
        if (this.hovering)
            return

        this.hovering = true

        await delay(500)

        const {onActivated, index} = this.props
        if (this.hovering && onActivated)
            onActivated(index)
    }

    onMouseOut = evt => {
        console.log('onMouseOut: ' + evt.target)
        this.hovering = false
    }

    onClick = () => {
        const {index, onActivated} = this.props
        if (onActivated) {
            onActivated(index)
        }
    }

    onVideoFinished = async () => {
        const {index, onActivated, onDeactivated} = this.props
        if (onDeactivated) {
            onDeactivated(index)
        }
        await delay(2000)
        if (this.hovering && onActivated) {
            onActivated(index)
        }
    }
}

export default withStyles(styles)(Media)
