import { React, makeStyles, classNames } from 'common'

const useStyles = makeStyles(theme => ({
    breadcrumb: {
    }
}))

const Breadcrumb = ({ links }) => {
    const classes = useStyles()
    return (
        <nav aria-label="breadcrumb">
            <ol className={classes.breadcrumb}>
                <Link name="Home" href="/" current={links.length === 0} classes={classes} />
                {
                    links.map((link, index) => (
                        <Link key={index} name={link.name} href={link.href} as={link.as} current={index === links.length - 1} classes={classes} />
                    ))
                }
            </ol>
        </nav>
    )
}

const Link = ({ name, href, as, current, classes }) => {
    if (current) {
        const activeClasses = classNames({
            [classes.item]: !!classes.item,
            [classes.active]: !!classes.active
        })
        return <li className={activeClasses}>{name}</li>
    }
    return (
        <li className={classes.item}>
            <Link href={href} as={as}>
                <a>{name}</a>
            </Link>
        </li>
    )
}

export default Breadcrumb
