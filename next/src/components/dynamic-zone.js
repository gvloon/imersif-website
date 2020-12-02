import { React, _ } from 'common'
import * as Pattern from './patterns'
import * as Media from './media'
import * as Common from './common'

const components = {
    'common.rich-text': Common.RichText,
    'pattern.interaction-block': Pattern.InteractionBlock,
    'pattern.examples': Pattern.Examples,
    'media.youtube': Media.Youtube,
    'media.vimeo': Media.Vimeo
}

const DynamicZone = ({ content, context, className }) => {
    if (!_.isArray(content))
        return null

    return content.map((item, index) => getComponent(item, context, index, className))
}

const getComponent = (item, context, index, className) => {
    const type = item.__type
    if (components.hasOwnProperty(type)) {
        const Component = components[type]
        const typeContext = context ? context[type] : undefined
        return <Component key={index} className={className} {...typeContext} {...item} />
    }
    return null
}

export default DynamicZone
