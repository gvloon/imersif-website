import { React, PropTypes, makeStyles, categorize, _ } from 'common'

const useStyles = makeStyles(index => ({
    glossary: {
        marginTop: '-2rem'
    },
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

const Glossary = ({ items }) => {
    const classes = useStyles()
    let categories = categorize(items, item => item.term.toLowerCase()[0])
    categories = _.sortBy(categories, [item => item.key])
    return (
        <div className={classes.glossary}>
            {
                categories.map(({ key, items }) => <GlossaryCategory key={key} letter={key} items={items} />)
            }
        </div>
    )
}

const GlossaryCategory = ({ letter, items }) => {
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
            <div className={classes.term}><a href={`#${item.slug}`}>{item.term}</a></div>
            <div className={classes.explanation}>{item.explanation}</div>
        </>
    )
}

Glossary.propTypes = {
    items: PropTypes.array
}

export default Glossary
