import { React, makeStyles, PropTypes, classNames, _ } from 'common'
import { Markdown } from 'components'
import InteractionSteps from './interaction-steps'

const useStyles = makeStyles(theme => ({
    variant: {
        paddingTop: '0.5rem',
        width: '100%'
    },
    examples: {
        marginTop: '3rem'
    }
}))

const PatternVariant = ({ variant, active, className }) => {
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
            <InteractionSteps interactions={interactions} active={active} />
            <Examples examples={examples} classes={classes} />
            <Additions additions={additions} classes={classes} />
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
