import { React, withStyles, classNames, delay } from 'common'
import config from 'config'

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
    }
})

class Media extends React.Component
{
    constructor(props) {
        super(props)

        this.playPromise = null
        this.state = {
            videoReady: true,
            videoPlaying: false
        }
    }

    render = () => {
        const { media, className, classes } = this.props
        if (!media) {
            return null
        }

        const rootClasses = classNames({
            [className]: !!className,
            [classes.root]: true
        })

        return (
            <div className={rootClasses} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                { this.renderMedia() }
                { this.renderChildren() }
            </div>
        )
    }

    renderMedia = () => {
        const { media, classes } = this.props

        if (media.mime.startsWith('video')) {
            return (
                <video
                    ref={this.onRef}
                    muted={true}
                    className={classes.media}
                    src={config.mediaUrl + media.url}
                    onLoadedMetadata={this.onVideoLoaded}
                    onEnded={this.onVideoFinished}
                />
            )
        } else {
            return <img alt="" className={classes.media} src={config.mediaUrl + media.url} />
        }
    }

    renderChildren = () => {
        const { children, classes } = this.props
        if (!children) {
            return null
        }
        return (
            <div className={classes.overlay}>
                { children }
            </div>
        )
    }

    onRef = ref => {
        this.video = ref
        if (this.video != null && this.video.readyState > 0) {
            this.onVideoLoaded()
        }
    }

    onMouseOver = () => {
        const { onMouseOver, data } = this.props
        if (onMouseOver)
            onMouseOver(data)
    }

    onMouseOut = () => {
        const { onMouseOut, data} = this.props
        if (onMouseOut)
            onMouseOut(data)
    }

    onVideoLoaded = () => {
        const { onVideoLoaded, data } = this.props
        if (onVideoLoaded)
            onVideoLoaded(data)
    }

    onVideoFinished = async () => {
        const { playing, onVideoFinished, data } = this.props
        await delay(1000)
        if (this.video) {
            this.video.currentTime = 0
            if (playing) {
                this.playVideo()
            }
            if (onVideoFinished)
                onVideoFinished(data)
        }
    }

    componentDidUpdate = prevProps => {
        if (this.video) {
            const { playing } = this.props
            if (playing !== prevProps.playing) {
                if (playing) {
                    this.playVideo()
                } else {
                    this.pauseVideo()
                }
            }
        }
    }

    playVideo = () => {
        if (!this.video)
            return

        this.playPromise = this.video.play()
    }

    pauseVideo = async () => {
        if (!this.video)
            return

        await this.playPromise
        this.video.currentTime = 0
        this.video.pause()
    }
}

export default withStyles(styles)(Media)
