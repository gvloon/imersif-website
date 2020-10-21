import { React, withStyles, _ } from 'common'
import { Media } from 'components/media'

const styles = theme => ({
    pair: {
        display: 'flex',
        marginLeft: '-1rem',
        marginRight: '-1rem',
        flexDirection: 'column',
        [theme.breakpoints.up('xs')]: {
            flexDirection: 'row'
        }
    },
    steps: {
        marginTop: '0.5rem'
    },
    step: {
        width: '100%',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        marginBottom: '1rem',
        [theme.breakpoints.up('xs')]: {
            width: '50%'
        }
    },
    media: {
        width: '100%',
        paddingTop: '66%',
        backgroundColor: '#FEEED7'
    },
    annotations: {
        marginTop: '0.6rem',
        paddingTop: '-0.35rem',
        paddingBottom: '-0.35rem'
    },
    annotation: {
        marginTop: '0.35rem',
        marginBottom: '0.35rem',
        display: 'flex',
        flexDirection: 'row'
    },
    annotationIndex: {
        fontWeight: 500,
        paddingRight: '0.2rem',
        lineHeight: '1.35rem'
    },
    annotationText: {
        flex: 1,
        lineHeight: '1.35rem'
    }
})


class InteractionSteps extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videos: [],
            index: 0,
            hovering: false
        }
    }

    render = () => {
        const { interactions, active, classes } = this.props
        if (!interactions || !interactions.length)
            return null

        let mediaIndex = -1
        const activeIndex = this.activeIndex()
        return (
            <>
                <h3>How this pattern works</h3>
                <div className={classes.steps}>
                    {
                        _.chunk(interactions, 2).map((chunk, index) => (
                            <div key={index} className={classes.pair}>
                                {
                                    chunk.map((interaction, index) => {
                                        mediaIndex++
                                        return (
                                            <div key={index} className={classes.step}>
                                                <Media
                                                    data={mediaIndex}
                                                    className={classes.media}
                                                    media={interaction.image}
                                                    playing={active && mediaIndex === activeIndex}
                                                    onVideoLoaded={this.onVideoLoaded}
                                                    onVideoFinished={this.onVideoFinished}
                                                />
                                                <Annotations annotations={interaction.annotations} classes={classes}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }

    onVideoLoaded = data => {
        this.setState(state => {
            const videos = [...state.videos, data]
            videos.sort()
            return { videos }
        })
    }

    onMouseOver = data => {
        const index = _.findIndex(this.state.videos, current => current === data)
        if (index > -1) {
            this.setState({
                index,
                hovering: true
            })
        }
    }

    onMouseOut = () => {
        if (this.state.hovering) {
            this.setState({
                hovering: false
            })
        }
    }

    onVideoFinished = () => {
        this.setState(state => {
            const { videos, index, hovering} = state
            if (hovering) {
                return null
            }
            return {
                index: index < videos.length - 1  ? index + 1 : 0
            }
        })
    }

    activeIndex = () => {
        const { index, videos } = this.state
        return index < videos.length ? videos[index] : -1
    }
}

const Annotations = ({ annotations, classes }) => {
    return (
        <div className={classes.annotations}>
            {
                annotations.map((annotation, index) => (
                    <div className={classes.annotation} key={index}>
                        <div className={classes.annotationIndex}>{annotation.index + '. '}</div>
                        <div className={classes.annotationText}>{annotation.text}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default withStyles(styles)(InteractionSteps)
