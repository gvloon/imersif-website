import { React, makeStyles, PropTypes, config, classNames } from 'common'
import { Button, Link, Image } from 'components'
import ProConList from './pro-con-list'

const marginPattern = 1

const useStyles = makeStyles(theme => ({
    patterns: {
        marginTop: '1rem'
    },
    container: {
        marginTop: '-' + marginPattern + 'rem',
        marginBottom: '-' + marginPattern + 'rem'
    },
    pattern: {
        marginTop: marginPattern + 'rem',
        marginBottom: marginPattern + 'rem',
        padding: '0.5rem',
        border: '1px solid #eeeeee',
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.075)',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('xs')]: {
            display: 'none'
        },
    },
    patternLarge: {
        marginTop: marginPattern + 'rem',
        marginBottom: marginPattern + 'rem',
        border: '1px solid #eeeeee',
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.075)',
        borderRadius: '5px',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '0.5rem',
        display: 'none',
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
    image: {
        width: '25%',
        paddingTop: '20%'
    },
    prosAndCons: {
        marginTop: '0.5rem',
        flex: 1
    },
    title: {
        fontWeight: 'bold'
    },
    seeMore: {
        marginLeft: 'auto'
    }
}))

const PatternList = ({ patterns, filters, className, ...rest }) => {
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
                            <div className={classes.pattern}>
                                <div className={classes.top}>
                                    <Link href="/pattern/[slug]" as={`/pattern/${pattern.slug}`}>
                                        <Image className={classes.image} image={pattern.image} />
                                    </Link>
                                    <div className={classes.right}>
                                        <div className={classes.title}>{pattern.title}</div>
                                    </div>
                                </div>
                                <ProConList className={classes.prosAndCons} prosAndCons={pattern.pros_and_cons} />
                                <Button className={classes.seeMore} href="/pattern/[slug]" as={`/pattern/${pattern.slug}`}>See more</Button>
                            </div>
                            <div className={classes.patternLarge}>
                                <Link href="/pattern/[slug]" as={`/pattern/${pattern.slug}`} passHref>
                                    <Image className={classes.image} image={pattern.image} />
                                </Link>
                                <div className={classes.right}>
                                    <div className={classes.title}>{pattern.title}</div>
                                    <ProConList className={classes.prosAndCons} prosAndCons={pattern.pros_and_cons} />
                                    <Button className={classes.seeMore} href="/pattern/[slug]" as={`/pattern/${pattern.slug}`}>See more</Button>
                                </div>
                            </div>
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
