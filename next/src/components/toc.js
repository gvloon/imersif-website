import { React, makeStyles, classNames } from 'common'

const useStyles = makeStyles(theme => ({
    toc: {
        borderLeft: '4px solid #eeeeee',
        paddingLeft: '1rem'
    },
    label: {
    },
    items: {
        marginTop: '1rem'
    },
    itemContainer: {
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    itemLink: {
        color: theme.palette.primary.main,
        fontSize: '1.5rem',
        fontWeight: '400'
    }
}))

const Toc = ({ children, title, className }) => {
    const classes = useStyles()
    const rootClasses = classNames({
        [className]: !!className,
        [classes.toc]: !!classes.toc
    })

    return (
        <div className={rootClasses}>
            <div className={classes.label}>{title}</div>
            <div className={classes.items}>
                { children }
            </div>
        </div>
    )
}

Toc.Item = ({ children, href }) => {
    const classes = useStyles()
    return (
        <div className={classes.itemContainer}>
            <a className={classes.itemLink} href={href}>{children}</a>
        </div>
    )
}

export default Toc
