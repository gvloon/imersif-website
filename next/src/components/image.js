import { React, makeStyles, classNames } from 'common'

const useStyles = makeStyles(theme => ({
    image: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex'
    }
}))

const Image = ({ src, className, children }) => {
    if (!src) {
        return null
    }

    const classes = useStyles()
    const rootClasses = classNames({
        [className]: !!className,
        [classes.image]: true
    })
    return (
        <div className={rootClasses} style={{ backgroundImage: 'url(\'' + src + '\')' }}>
            { children }
        </div>
    )
}

export default Image
