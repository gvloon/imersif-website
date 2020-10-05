import { React, makeStyles, classNames } from 'common'
import config from 'config'

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: '-3px',
        paddingRight: '-3px'
    },
    icon: {
        height: '20px',
        marginLeft: '3px',
        marginRight: '3px',
        opacity: '80%'
    }
}))

const PatternFilterIcons = ({ filters, className }) => {
    if (!filters) {
        return null
    }
    const classes = useStyles()
    const rootClasses = classNames({
        [classes.root]: !!classes.root,
        [className]: !!className
    })
    return (
        <span className={rootClasses}>
            {
                filters.map((filter, index) => <img key={index} className={classes.icon} src={config.mediaUrl + filter.icon} />)
            }
        </span>
    )
}

export default PatternFilterIcons
