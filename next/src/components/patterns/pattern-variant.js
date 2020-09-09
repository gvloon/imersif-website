import { React, makeStyles, PropTypes, classNames, _ } from 'common'
import { Image, Markdown } from 'components'

const useStyles = makeStyles(theme => ({
    variant: {
        paddingTop: '0.5rem',
        width: '100%'
    },
    interaction: {

    },
    interactionPair: {
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
    interactionStep: {
        width: '100%',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        marginBottom: '1rem',
        [theme.breakpoints.up('xs')]: {
            width: '50%'
        }
    },
    interactionImage: {
        width: '100%',
        paddingTop: '66%'
    },
    examples: {
        marginTop: '3rem'
    },
    annotations: {
        marginTop: '0.5rem'
    },
    annotationIndex: {
        fontWeight: 500
    }
}))

const PatternVariant = ({ variant, className }) => {
    if (!variant) {
        return null
    }
    const { interactions, examples, additions } = variant
    const classes = useStyles()
    const rootClasses = classNames({
        [className]: !!className,
        [classes.variant]: true
    })
    return (
        <div className={rootClasses}>
            <h3>How this pattern works</h3>
            <InteractionSteps interactions={interactions} classes={classes} />
            <Examples examples={examples} classes={classes} />
            <Additions additions={additions} classes={classes} />
        </div>
    )
}

const InteractionSteps = ({ interactions, classes }) => {
    return (
        <div className={classes.steps}>
            {
                _.chunk(interactions, 2).map((chunk, index) => (
                    <div key={index} className={classes.interactionPair}>
                        {
                            chunk.map((interaction, index) => (
                                <div key={index} className={classes.interactionStep}>
                                    <Image className={classes.interactionImage} image={interaction.image} />
                                    <Annotations annotations={interaction.annotations} classes={classes} />
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

const Annotations = ({ annotations, classes }) => {
    return (
        <div className={classes.annotations}>
            {
                annotations.map((annotation, index) => (
                    <div key={index}><span className={classes.annotationIndex}>{annotation.index + '. '}</span>{annotation.text}</div>
                ))
            }
        </div>
    )
}

const Examples = ({ examples, classes }) => {
    if (!examples || examples.length === 0) {
        return null
    }

    return (
        <div className={classes.examples}>
            <h3>{ examples.length === 1 ? 'Examples' : 'Example' }</h3>
            {
                examples.map((example, index) => <Example key={index} example={example} classes={classes} />)
            }
        </div>
    )
}

const Additions = ({ additions, classes }) => {
    if (!additions || additions.length === 0) {
        return null
    }

    return (
        <>
            <h2>{ additions.length === 1 ? 'Additions' : 'Addition' }</h2>
            {
                additions.map((addition, index) => <Example key={index} example={addition} classes={classes} />)
            }
        </>
    )
}

const Example = ({ example, classes }) => {
    return (
        <div className={classes.example}>
            <h4>{example.title}</h4>
            <Markdown source={example.content} />
        </div>
    )
}

PatternVariant.propTypes = {
    variant: PropTypes.object
}

export default PatternVariant
