import { React, PropTypes, classNames, withStyles, _ } from 'common'
import ReactMarkdown from 'react-markdown'
import breaks from 'remark-breaks'
import JsxParser from 'react-jsx-parser'
import Youtube from './media/youtube'
import Vimeo from './media/vimeo'

const styles = theme => ({
    markdown: {
        overflow: 'auto',
        marginTop: '-1rem',
        marginBottom: '-1rem'
    },
    paragraph: {
        marginTop: '1rem',
        marginBottom: '1rem'
    }
})

class Markdown extends React.PureComponent {
    static propTypes = {
        source: PropTypes.string
    }

    render () {
        let { source, classes, className } = this.props

        if (_.isEmpty(_.trim(source)))
            return null

        const components = {
            React: (props) => <>{props.children}</>,
            Youtube: (props) => <Youtube {...props} />,
            Vimeo: (props) => <Vimeo {...props} />
        }
        const renderers = {
            html: (props) => <JsxParser jsx={props.value} components={components} allowUnknownElements={true} renderInWrapper={false} />,
            paragraph: ({ children }) => <div className={classes.paragraph}>{children}</div>
        }
        const rootClasses = classNames({
            [classes.markdown]: !!classes.markdown,
            [className]: !!className
        })

        return (
            <div className={rootClasses}>
                <ReactMarkdown plugins={[breaks]} renderers={renderers} source={source} />
            </div>
        )
    }
}

export default withStyles(styles)(Markdown)
