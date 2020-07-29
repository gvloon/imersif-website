import { React, PropTypes, template, withStyles } from 'common'
import ReactMarkdown from 'react-markdown'
import breaks from 'remark-breaks'
import JsxParser from 'react-jsx-parser'
import Youtube from './media/youtube'
import Vimeo from './media/vimeo'

const styles = theme => ({
    paragraph: {
        marginTop: '1rem'
    }
})

class Markdown extends React.PureComponent {
    static propTypes = {
        source: PropTypes.string
    }

    constructor(props)
    {
        super()
        console.log('Markdown constructor')
    }

    render () {
        console.log('render markdown')
        let { source, classes } = this.props
        const components = {
            React: (props) => <>{props.children}</>,
            Youtube: (props) => <Youtube {...props} />,
            Vimeo: (props) => <Vimeo {...props} />
        }
        const renderers = {
            html: (props) => <JsxParser jsx={props.value} components={components} allowUnknownElements={true} renderInWrapper={false} />,
            paragraph: ({ children }) => <div className={classes.paragraph}>{children}</div>
        }
        return <ReactMarkdown plugins={[breaks]} renderers={renderers} source={source} />
    }
}

export default withStyles(styles)(Markdown)
