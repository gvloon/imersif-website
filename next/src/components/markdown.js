import { React, PropTypes, template, makeStyles } from 'common'
import ReactMarkdown from 'react-markdown'
import breaks from 'remark-breaks'
import JsxParser from 'react-jsx-parser'
import Youtube from './media/youtube'
import Vimeo from './media/vimeo'

const useStyles = makeStyles(theme => ({
    paragraph: {
        marginBottom: '1rem'
    }
}))

const MarkDown = ({ source, strings, components }) => {
    const classes = useStyles()

    source = template(source, strings)
    components = {
        React: (props) => <>{props.children}</>,
        Youtube: (props) => <Youtube {...props} />,
        Vimeo: (props) => <Vimeo {...props} />,
        ...components
    }
    const renderers = {
        html: (props) => <JsxParser jsx={props.value} components={components} allowUnknownElements={true} renderInWrapper={false} />,
        paragraph: ({ children }) => <div className={classes.paragraph}>{children}</div>
    }
    return <ReactMarkdown plugins={[breaks]} renderers={renderers} source={source} />
}

MarkDown.propTypes = {
    source: PropTypes.string,
    strings: PropTypes.object,
    components: PropTypes.object
}

export default MarkDown
