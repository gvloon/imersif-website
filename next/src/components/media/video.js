import {React, delay} from 'common'

class Video extends React.Component {
  constructor(props) {
    super(props)

    this.playPromise = null
  }

  render = () => {
    const {className, src} = this.props

    return (
      <video
        ref={this.onRef}
        muted={true}
        className={className}
        src={src}
        onLoadedMetadata={this.onVideoLoaded}
        onEnded={this.onVideoFinished}
      />
    )
  }

  onRef = ref => {
    this.video = ref
    if (this.video != null && this.video.readyState > 0) {
      this.onVideoLoaded()
    }
  }

  onMouseOver = () => {
    const {onMouseOver, data} = this.props
    if (onMouseOver)
      onMouseOver(data)
  }

  onMouseOut = () => {
    const {onMouseOut, data} = this.props
    if (onMouseOut)
      onMouseOut(data)
  }

  onVideoLoaded = () => {
    const {onVideoLoaded, data} = this.props
    if (onVideoLoaded)
      onVideoLoaded(data)
  }

  onVideoFinished = async () => {
    const {playing, autoplayDelay, onVideoFinished, data} = this.props
    await delay(autoplayDelay)
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
      const {playing} = this.props
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

export default Video
