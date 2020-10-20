import { React, makeStyles, PropTypes, classNames, href } from 'common'
import { Button, Link, Image } from 'components'
import ProConList from './pro-con-list'
// import PatternFilterIcons from './pattern-filter-icons'

const marginPattern = 1

const useStyles = makeStyles(theme => ({
    patterns: {
        marginTop: '1rem'
    },
    container: {
        marginTop: '-' + marginPattern + 'rem',
        marginBottom: '-' + marginPattern + 'rem'
    },
    patternMobile: {
        marginTop: marginPattern + 'rem',
        marginBottom: marginPattern + 'rem',
        backgroundColor: theme.palette.secondary.main,
        padding: '0.5rem',
        border: '1px solid #e9e9e9',
        borderRadius: '3px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        [theme.breakpoints.up('xs')]: {
            display: 'none'
        }
    },
    patternDesktop: {
        marginTop: marginPattern + 'rem',
        marginBottom: marginPattern + 'rem',
        backgroundColor: theme.palette.secondary.main,
        border: '1px solid ' + theme.palette.secondary.dark,
        borderRadius: '3px',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '0.5rem',
        display: 'none',
        cursor: 'pointer',
        [theme.breakpoints.up('xs')]: {
            display: 'flex'
        }
    },
    right: {
        paddingLeft: '1rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch'
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    imageContainer: {
        width: '25%',
        position: 'relative',
        paddingTop: '16.6666%',
        height: 0
    },
    image: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        alignItems: 'flex-end'
    },
    prosAndCons: {
        marginTop: '0.5rem',
        flex: 1
    },
    title: {
        marginTop: '0px'
    },
    bottom: {
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'flex-end'
    },
    seeMore: {
        marginLeft: 'auto'
    },
    icons: {
        marginLeft: '5px',
        marginBottom: '5px'
    }
}))

const PatternList = ({ patterns, className }) => {
    if (!patterns) {
        return null
    }
    const classes = useStyles()
    const rootClasses = classNames({
        [className]: !!className,
        [classes.patterns]: true
    })
    return (
        <div className={rootClasses}>
            <div className={classes.container}>
                {
                    patterns.map((pattern, index) => (
                        <React.Fragment key={index}>
                            <Link href={href('/pattern/[slug]', pattern.slug)}>
                                <div className={classes.patternMobile}>
                                    <div className={classes.top}>
                                        <div className={classes.imageContainer}>
                                            <Image className={classes.image} image={pattern.image} />
                                        </div>
                                        <div className={classes.right}>
                                            <h3 className={classes.title}>{pattern.title}</h3>
                                        </div>
                                    </div>
                                    <ProConList className={classes.prosAndCons} prosAndCons={pattern.pros_and_cons} />
                                    <div className={classes.bottom}>
                                        {/* <PatternFilterIcons className={classes.icons} filters={pattern.filters} /> */}
                                        <Button component="span" className={classes.seeMore}>See more</Button>
                                    </div>
                                </div>
                            </Link>
                            <Link href={href('/pattern/[slug]', pattern.slug)}>
                                <div className={classes.patternDesktop}>
                                    <div className={classes.imageContainer}>
                                        <Image className={classes.image} image={pattern.image}>
                                            {/* <PatternFilterIcons className={classes.icons} filters={pattern.filters} /> */}
                                        </Image>
                                    </div>
                                    <div className={classes.right}>
                                        <h4>{pattern.title}</h4>
                                        <ProConList className={classes.prosAndCons} prosAndCons={pattern.pros_and_cons} />
                                        <div className={classes.bottom}>
                                            <Button component="span" className={classes.seeMore}>See more</Button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}

PatternList.propTypes = {
    patterns: PropTypes.array
}

export default PatternList
