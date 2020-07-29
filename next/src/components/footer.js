import { React, PropTypes, makeStyles, classNames } from 'common'
import { color, container } from 'jss/index'

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: color.black,
        color: color.white,
        height: '80px',
        display: 'flex',
        alignItems: 'center'
    },
    container: {
        ...container(theme),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('xs')]: {
            flexDirection: 'row'
        }
    },
    links: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.up('xs')]: {
            marginLeft: '2em',
            flex: 1
        }
    },
    link: {
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        fontWeight: '500',
        fontSize: '12px',
        textTransform: 'uppercase',
        borderRadius: '3px',
        textDecoration: 'none',
        position: 'relative',
        display: 'inline-block',
        color: color.white
    },
    copyright: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        [theme.breakpoints.up('xs')]: {
            marginRight: '2em'
        }
    },
    company: {
        textDecoration: 'none',
        backgroundColor: 'transparent',
        color: color.white
    },
    gray: {
        backgroundColor: color.gray[2],
        color: '#3c4858'
    }
}))

const Footer = ({ color }) => {
    const classes = useStyles()
    const footerClass = classNames({
        [classes.footer]: true
    })
    const linkClass = classNames({
        [classes.link]: true
    })
    const companyClass = classNames({
        [classes.company]: true
    })
    return (
        <div className={footerClass}>
            <div className={classes.container}>
                <div className={classes.links}>
                    <a className={linkClass}>
                        Imersif
                    </a>
                    <a className={linkClass}>
                        About us
                    </a>
                    <a className={linkClass}>
                        Blog
                    </a>
                </div>
                <div className={classes.copyright}>
                    &copy; {1900 + new Date().getYear()} , made by&nbsp;<a className={companyClass}>Imersif</a>
                </div>
            </div>
        </div>
    )
}

Footer.propTypes = {
    color: PropTypes.string
}

export default Footer
