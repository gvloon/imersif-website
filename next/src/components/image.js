import { React, makeStyles, config, classNames } from 'common'

const useStyles = makeStyles(theme => ({
    image: {
        backgroundSize: 'cover',
        backgroundPosition: 'center'
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
    const backgroundImage = image ? 'url(' + config.publicApiUrl + image.url + ')' : null
    return (
        <div className={rootClasses} style={{ backgroundImage }}>
            { children }
        </div>
    )
}

export default Image