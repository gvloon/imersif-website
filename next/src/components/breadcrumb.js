import { React, makeStyles } from 'common'
import { Link } from 'components'

const useStyles = makeStyles(theme => ({
    breadcrumbMobile: {
        display: 'block',
        '&::before': {
            display: 'inline-block',
            content: '"<"',
            marginRight: '0.3rem',
            color: theme.palette.primary.main,
        },
        '& a': {
            color: theme.palette.primary.main,
            textDecoration: 'underline'
        },
        [theme.breakpoints.up('xs')]: {
            display: 'none'
        }
    },
    breadcrumbDesktop: {
        display: 'none',
        flexWrap: 'wrap',
        listStyle: 'none',
        margin: 0,
        marginBottom: '0.5rem',
        padding: 0,
        [theme.breakpoints.up('xs')]: {
            display: 'flex'
        }
    },
    itemDesktop: {
        fontSize: '0.95rem',
        '& a': {
            color: theme.palette.primary.main,
            textDecoration: 'underline'
        },
        '&::before': {
            display: 'inline-block',
            content: '"/"',
            marginLeft: '0.3rem',
            marginRight: '0.3rem'
        },
        '&:first-child': {
            '&::before': {
                display: 'none'
            }
        }
    }
}))

const Breadcrumb = ({ links = [] }) => {
    const classes = useStyles()
    links.unshift({
        name: 'Home',
        href: '/'
    })
    return (
        <nav aria-label="breadcrumb">
            <BreadcrumbMobile links={links} classes={classes} />
            <BreadcrumbDesktop links={links} classes={classes }/>
        </nav>
    )
}

const BreadcrumbMobile = ({ links, classes }) => {
    if (links.length === 1) {
        return null
    }
    const link = links[links.length-2]
    return (
        <div className={classes.breadcrumbMobile}>
            <Link href={link.href} as={link.as}>
                <a>{link.name}</a>
            </Link>
        </div>
    )
}

const BreadcrumbDesktop = ({ links, classes }) => {
    return (
        <ol className={classes.breadcrumbDesktop}>
            {
                links.map((link, index) => (
                    <ItemDesktop key={index} name={link.name} href={link.href} as={link.as} current={index === links.length - 1} classes={classes} />
                ))
            }
        </ol>
    )
}

const ItemDesktop = ({ name, href, as, current, classes }) => {
    if (current) {
        return <li className={classes.itemDesktop}>{name}</li>
    }
    return (
        <li className={classes.itemDesktop}>
            <Link href={href} as={as}>
                <a>{name}</a>
            </Link>
        </li>
    )
}


export default Breadcrumb
