import {React, delay} from 'common'

class Video extends React.Component {
  constructor(props) {
    super(props)

    this.playPromise = null
    this.actionId = 0
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

  onVideoLoaded = () => {
    const {onVideoLoaded, playing} = this.props
    if (onVideoLoaded)
      onVideoLoaded()
    if (playing) {
      this.playVideo()
    }
  }

  onVideoFinished = async () => {
    const {onVideoFinished} = this.props
    await delay(1500)
    if (this.video) {
      if (onVideoFinished)
        onVideoFinished()
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

  playVideo = async () => {
    if (!this.video)
      return

    this.video.currentTime = 0

    const actionId = ++this.actionId
    await delay(1500)
    if (actionId !== this.actionId)
      return

    this.playPromise = this.video.play()
  }

  pauseVideo = async () => {
    if (!this.video)
      return

    this.actionId++
    await this.playPromise
    this.video.pause()
  }
}

export default Video
