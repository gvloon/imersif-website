import { React, makeStyles, classNames } from 'common'
import config from 'config'

const useStyles = makeStyles(theme => ({
    image: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex'
    }
}))

const Image = ({ image, className, children }) => {
    if (!image) {
        return null
    }

    const classes = useStyles()
    const rootClasses = classNames({
        [className]: !!className,
        [classes.image]: true
    })
    const backgroundImage = image ? 'url(\'' + image.url + '\')' : null
    return (
        <div className={rootClasses} style={{ backgroundImage }}>
            { children }
        </div>
    )
}

export default Image
