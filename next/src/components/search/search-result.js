import { React, makeStyles, classNames, getTypeById } from 'common'
import { Link } from 'components'

const useStyles = makeStyles(theme => ({
    result: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        color: theme.palette.primary.main,
        fontWeight: '400',
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
        marginTop: '0.2rem',
        marginBottom: '0.4rem'
    },
    type: {
        fontWeight: '400',
        fontSize: '0.9rem'
    },
    icon: {
        color: '#ccc'
    },
    highlight: {
        '& em': {
            fontWeight: '500',
            fontStyle: 'normal'
        }
    }
}))

const SearchResult = ({ result, className }) => {
    const classes = useStyles()
    const resultClasses = classNames({
        [classes.result]: !!classes.result,
        [className]: !!className
    })

    return (
        <Link href={result.link}>
            <a className={resultClasses}>
                <div className={classes.type}>{getTypeLabel(result.type)}</div>
                <div className={classes.title}>{result.title}</div>
                <div className={classes.highlight} dangerouslySetInnerHTML={{ __html: result.highlight }} />
            </a>
        </Link>
    )
}

const getTypeLabel = id => {
    const type = getTypeById(id)
    return type ? type.label : id
}

export default SearchResult