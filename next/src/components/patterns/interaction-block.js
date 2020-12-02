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
        marginTop: '0.5rem',
        marginBottom: '1rem'
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
        paddingTop: '68%',
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


class InteractionBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: -1
        }
    }

    render = () => {
        const { title, intro, steps, active, classes } = this.props
        const { currentIndex } = this.state

        let index = 0
        return (
            <>
                {
                    title &&
                    <h3>{title}</h3>
                }
                {
                    intro &&
                    <p>{intro}</p>
                }
                <div className={classes.steps}>
                    {
                        _.chunk(steps, 2).map((chunk, chunkIndex) => (
                            <div key={chunkIndex} className={classes.pair}>
                                {
                                    chunk.map((step, stepIndex) => {
                                        const image = _.find(step.media, item => item.mime && item.mime.startsWith('image'))
                                        const video = _.find(step.media, item => item.mime && item.mime.startsWith('video'))
                                        const node = (
                                            <div key={stepIndex} className={classes.step}>
                                                <Media
                                                    index={index}
                                                    key={index}
                                                    className={classes.media}
                                                    image={image}
                                                    video={video}
                                                    playing={index === currentIndex}
                                                    onActivated={this.onActivated}
                                                    onDeactivated={this.onDeactivated}
                                                />
                                                <Annotations annotations={step.annotations} classes={classes}/>
                                            </div>
                                        )
                                        index++
                                        return node
                                    })
                                }
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }

    onActivated = index => {
        this.setState({
            currentIndex: index
        })
    }

    onDeactivated = () => {
        this.setState({
            currentIndex: -1
        })
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

export default withStyles(styles)(InteractionBlock)
