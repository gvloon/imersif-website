import { React, makeStyles, PropTypes, classNames } from 'common'
import { Image } from 'components'

const useStyles = makeStyles(theme => ({
    image: {
        width: '100%',
        paddingTop: '66%',
        marginBottom: '1rem',
        [theme.breakpoints.up('xs')]: {
            width: '39%',
            paddingTop: '24%',
            float: 'right',
            marginLeft: '1rem'
        }
    },
    label: {
        fontWeight: 'bold',
        display: 'inline-block',
        marginRight: '0.3rem'
    }
}))

const SolutionBlock = ({ solution, image, className }) => {
    if (!solution) {
        return null
    }
    const classes = useStyles()
    const rootClasses = classNames({
        [className]: !!className,
        [classes.solution]: !!classes.solution
    })
    return (
        <div className={rootClasses}>
            <Image className={classes.image} image={image} />
            {
                solution.what &&
                <p className={className.paragraph}><span className={classes.label}>What: </span>{solution.what}</p>
            }
            {
                solution.why &&
                <p className={className.paragraph}><span className={classes.label}>Why: </span>{solution.why}</p>
            }
            {
                solution.how &&
                <p className={className.paragraph}><span className={classes.label}>How: </span>{solution.how}</p>
            }
            {
                solution.when &&
                <p className={className.paragraph}><span className={classes.label}>When: </span>{solution.when}{solution.when}{solution.when}</p>
            }
        </div>
    )
}

SolutionBlock.propTypes = {
    solution: PropTypes.object
}

export default SolutionBlock
