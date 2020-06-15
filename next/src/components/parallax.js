import { React, makeStyles } from 'common'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
    parallax: {
        height: '100vh',
        maxHeight: '1600px',
        overflow: 'hidden',
        position: 'relative',
        backgroundPosition: '50%',
        backgroundSize: 'cover',
        margin: '0',
        padding: '0',
        border: '0',
        display: 'flex',
        alignItems: 'center'
    }
})

const Parallax = props => {
    const windowScrollTop = 0
    const [transform, setTransform] = React.useState(
        'translate3d(0,' + windowScrollTop + 'px,0)'
    )
    React.useEffect(() => {
        if (window.innerWidth >= 768) {
            window.addEventListener('scroll', resetTransform)
        }
        return function cleanup () {
            if (window.innerWidth >= 768) {
                window.removeEventListener('scroll', resetTransform)
            }
        }
    })
    const resetTransform = () => {
        const windowScrollTop = window.pageYOffset / 3
        setTransform('translate3d(0,' + windowScrollTop + 'px,0)')
    }
    const { children, style, image } = props
    const classes = useStyles()
    return (
        <div
            className={classes.parallax}
            style={{
                ...style,
                backgroundImage: 'url(' + image + ')',
                transform: transform
            }}
        >
            {children}
        </div>
    )
}

Parallax.propTypes = {
    children: PropTypes.node,
    style: PropTypes.string,
    image: PropTypes.string
}

export default Parallax
