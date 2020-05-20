import React from 'react'
import ReactMarkdown from 'react-markdown'
import breaks from 'remark-breaks'
import JsxParser from 'react-jsx-parser'
import {template} from 'common'

export default ({ source, strings, components}) =>  {
    source = template(source, strings)
    const transforms = Object.assign({
        React: (props) => <>{props.children}</>
    }, components)
    const renderers = {
        html: (props) => <JsxParser jsx={props.value} components={transforms} />
    }
    return <ReactMarkdown plugins={[breaks]} renderers={renderers} source={source} />
}
