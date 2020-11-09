import { React, makeStyles, PropTypes, classNames, _ } from 'common'
import { DynamicZone } from 'components'

const useStyles = makeStyles(theme => ({
    variant: {
        paddingTop: '0.5rem',
        width: '100%'
    }
}))

const PatternVariant = ({ variant, active, className }) => {
    if (!variant) {
        return null
    }
    const classes = useStyles()
    const rootClasses = classNames({
        [className]: !!className,
        [classes.variant]: true
    })
    const context = {
        'pattern.interaction-block': {
            active
        }
    }
    return (
        <div className={rootClasses}>
            <DynamicZone content={variant.content} context={context} />
        </div>
    )
}

PatternVariant.propTypes = {
    variant: PropTypes.object
}

export default PatternVariant
