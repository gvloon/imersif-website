import { React, makeStyles } from 'common'
import { DynamicZone } from 'components'

const useStyles = makeStyles(theme => ({
    examples: {
        marginTop: '3rem'
    }
}))


const Examples = ({ intro, examples }) => {
    if (!examples || !examples.length) {
        return null
    }
    const classes = useStyles()
    return (
        <div className={classes.examples}>
            <h3>{ examples.length === 1 ? 'Example' : 'Examples' }</h3>
            {
                intro &&
                <p>{ intro }</p>
            }
            {
                examples.map((example, index) => <Example key={index} example={example} classes={classes} />)
            }
        </div>
    )
}

const Example = ({ example, classes }) => {
    const { title, intro, content } = example
    return (
        <div className={classes.example}>
            {
                title &&
                <h4>{title}</h4>
            }
            {
                intro &&
                <p>{ intro }</p>
            }
            <DynamicZone content={content} />
        </div>
    )
}

export default Examples
