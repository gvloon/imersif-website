import { React, PropTypes, makeStyles, categorize, _, classNames } from 'common'
import { Markdown } from 'components'

const useStyles = makeStyles(index => ({
    letter: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        marginTop: '2rem'
    },
    term: {
        fontWeight: '500',
        marginTop: '0.5rem'
    },
    explanation: {
    }
}))

const Glossary = ({ items, className }) => {
    const classes = useStyles()
    const rootClasses = classNames({
        [className]: !!className,
        [classes.glossary]: !!classes.glossary
    })
    let categories = categorize(items, item => item.term.toLowerCase()[0])
    categories = _.sortBy(categories, [item => item.key])
    return (
        <div className={rootClasses}>
            {
                categories.map(({ key, items }) => <GlossaryCategory key={key} letter={key} items={items} />)
            }
        </div>
    )
}

const GlossaryCategory = ({ letter, items, className }) => {
    const classes = useStyles()
    return (
        <>
            <div className={classes.letter}>{letter}</div>
            {
                items.map((item, index) => <GlossaryItem key={index} item={item} />)
            }
        </>
    )
}

const GlossaryItem = ({ item }) => {
    const classes = useStyles()
    return (
        <>
            <div className={classes.term}><a id={`${item.slug}`}>{item.term}</a></div>
            <Markdown source={item.explanation} />
        </>
    )
}

Glossary.propTypes = {
    items: PropTypes.array
}

export default Glossary
