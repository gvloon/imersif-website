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
        height: '100%'
    },
    overlay: {
        position: 'absolute',
        display: 'flex',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    },
    pointer: {
        cursor: 'pointer'
    }
})

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
        const {image, video} = this.props

        if (image && video) {
            return (
                <AnimatePresence>
                    { this.renderVideo() }
                    { this.renderOverlay() }
                    { this.renderPlayButton() }
                </AnimatePresence>
            )
       } else if (image) {
            return this.renderImage()
        } else {
            return (
                <AnimatePresence>
                    { this.renderVideo() }
                    { this.renderPlayButton() }
                </AnimatePresence>
            )
        }
    }

    renderOverlay = () => {
        const {image, playing, classes} = this.props
        if (playing)
            return null

        return (
            <motion.img
                key="overlay"
                alt=""
                className={classes.media}
                src={image.url}
            />
        )
    }

    renderVideo = () => {
        const {video, index, playing, data, classes} = this.props
        return (
            <Video
                key="video"
                className={classes.media}
                src={video.url}
                data={data}
                playing={playing}
                onVideoFinished={this.onVideoFinished}
            />
        )
    }

    renderImage = () => {
        const {image, classes} = this.props

        return <img key="image" alt="" className={classes.media} src={image.url}/>
    }

    renderPlayButton = () => {
        const {playing} = this.props
        if (playing)
            return null

        return <PlayButton key="button" />
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

    onMouseOver = async () => {
        this.hovering = true

        await delay(500)

        const {onActivated, index} = this.props
        if (this.hovering && onActivated)
            onActivated(index)
    }

    onMouseOut = () => {
        this.hovering = false
    }

    onClick = () => {
        const {index, onActivated} = this.props
        if (onActivated) {
            onActivated(index)
        }
    }

    onVideoFinished = () => {
        const {index, onDeactivated} = this.props
        if (!this.hovering) {
            onDeactivated(index)
        }
    }
}

export default withStyles(styles)(Media)
