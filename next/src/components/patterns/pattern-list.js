import { React, makeStyles, PropTypes, config } from 'common'
import ProConList from './pro-con-list'

const marginPattern = 2

const useStyles = makeStyles(theme => ({
    patterns: {
        marginTop: '-' + marginPattern + 'rem',
        marginBottom: '-' + marginPattern + 'rem'
    },
    pattern: {
        marginTop: marginPattern + 'rem',
        marginBottom: marginPattern + 'rem',
        display: 'flex',
        flexDirection: 'column'
    },
    top: {
        display: 'flex',
        flexDirection: 'row'
    },
    image: {
        width: '25%',
        paddingTop: '20%',
        backgroundSize: 'cover'
    },
    prosAndCons: {
        marginLeft: '1rem',
        flex: 1
    },
    title: {
        fontWeight: 'bold',
        paddingTop: '0.5rem'
    }
}))

const PatternList = ({ patterns, className, ...rest }) => {
    if (!patterns) {
        return null
    }
    const classes = useStyles()
    return (
        <div className={classes.patterns}>
            {
                patterns.map((pattern, index) => (
                    <div key={index} className={classes.pattern}>
                        <div className={classes.top}>
                            <div className={classes.image} style={{ backgroundImage: 'url("' + config.publicApiUrl + pattern.media.url + '")' }} />
                            <ProConList className={classes.prosAndCons} prosAndCons={pattern.pros_and_cons} />
                        </div>
                        <div className={classes.title}>{pattern.title}</div>
                    </div>
                ))
            }
        </div>
    )
}

PatternList.propTypes = {
    patterns: PropTypes.list
}

export default PatternList
