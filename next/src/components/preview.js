import { React, makeStyles, PropTypes } from 'common'
import { Link } from 'components'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: 'bold'
    },
    summary: {
        whiteSpace: 'pre-wrap',
        fontSize: '1rem',
        lineHeight: '1.2rem'
    }
}))

const Preview = ({ className, title, summary, href, as }) => {
    const classes = useStyles()
    return (
        <div className={className}>
            <Link href={href} as={as}>
                <a className={classes.title}>{title}</a>
            </Link>
            {
                summary &&
                <ResponsiveEllipsis
                    className={classes.summary}
                    text={summary || ''}
                    maxLine={2}
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                />
            }
        </div>
    )
}

Preview.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    href: PropTypes.string,
    as: PropTypes.string
}

export default Preview
