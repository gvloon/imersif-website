import { React, debug } from 'common'
import * as Pattern from './patterns'
import * as Media from './media'

const components = {
    'pattern.interaction-block': Pattern.InteractionBlock,
    'pattern.examples': Pattern.Examples,
    'media.youtube': Media.Youtube,
    'media.vimeo': Media.Vimeo
}

const DynamicZone = ({ content, context }) => {
    if (!content || !content.length)
        return null

    return content.map((item, index) => getComponent(item, context, index))
}

const getComponent = (item, context, index) => {
    const type = item.__type
    if (components.hasOwnProperty(type)) {
        const Component = components[type]
        const typeContext = context ? context[type] : undefined
        return <Component key={index}  {...typeContext} {...item} />
    }
    return null
}

export default DynamicZone
