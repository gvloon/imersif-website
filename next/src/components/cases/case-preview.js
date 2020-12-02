import { React, makeStyles, href, classNames } from 'common'
import { Link, Image } from 'components'
import CasePlatform from './case-platform'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

const useStyles = makeStyles(theme => ({
    case: {
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer'
    },
    thumbnail: {
        width: '30%',
        height: 0,
        paddingTop: Math.floor(30 * 9/16) +  '%'
    },
    placeholder: {
        width: '30%',
        height: 0,
        paddingTop: Math.floor(30 * 9/16) +  '%',
        backgroundColor: 'black'
    },
    right: {
        width: '70%',
        marginTop: '-0.2rem',
        marginLeft: '1rem',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('xs')]: {
            marginTop: '0rem'
        }
    },
    title: {
        fontWeight: 'bold',
        [theme.breakpoints.up('xs')]: {
            fontSize: '1.25rem'
        }
    },
    infoMobile: {
        fontSize: '0.85rem',
        [theme.breakpoints.up('xs')]: {
            fontSize: '1rem'
        },
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    platformMobile: {
        marginTop: '0.15rem',
        [theme.breakpoints.up('xs')]: {
            marginTop: '0.35rem'
        }
    },
    topicMobile: {
        marginTop: '0.15rem',
        color: '#000000',
        fontWeight: 400,
        [theme.breakpoints.up('xs')]: {
            marginTop: '0.25rem'
        }
    },
    infoDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            marginTop: '0.75rem'
        }
    },
    platformDesktop: {
        fontWeight: 400
    },
    summary: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            marginTop: '0.75rem'
        }
    }
}))

const CasePreview = ({ className, useCase }) => {
    const classes = useStyles()

    const { slug, thumbnail, title, topic, summary } = useCase
    const link = href('/case/[slug]', slug)

    const rootClasses = classNames({
        [className]: !!className,
        [classes.case]: !!classes.case
    })

    return (
        <Link href={link}>
            <div className={rootClasses}>
                {
                    thumbnail
                        ? <Image className={classes.thumbnail} src={thumbnail} />
                        : <div className={classes.placeholder} />
                }
                <div className={classes.right}>
                    <div className={classes.title}>
                        {
                            title &&
                            <ResponsiveEllipsis
                                text={title || ''}
                                maxLine={1}
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                            />
                        }
                    </div>
                    { getDesktopInfo(useCase, classes) }
                    { getMobileInfo(useCase, classes) }
                    <div className={classes.summary}>
                        {
                            summary &&
                            <ResponsiveEllipsis
                                text={summary || ''}
                                maxLine={2}
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                            />
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
}

const getDesktopInfo = (useCase, classes) => {
    const { platforms, topic } = useCase
    return (
        <div className={classes.infoDesktop}>
            {
                platforms.length &&
                <span className={classes.platformDesktop}>{ platforms.join(',') }</span>
            }
            {
                platforms && platforms.length && topic &&
                " - "
            }
            {
                topic
            }
        </div>
    )
}

const getMobileInfo = (useCase, classes) => {
    const { platforms, topic } = useCase

    return (
        <div className={classes.infoMobile}>
            {
                platforms && platforms.length &&
                <div className={classes.platformMobile}>{ platforms.join(',') }</div>
            }
            {
                topic &&
                <div className={classes.topicMobile}>{ topic }</div>
            }
        </div>
    )
}

export default CasePreview
