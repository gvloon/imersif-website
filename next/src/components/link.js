import { React, debug } from 'common'
import _Link from 'next/link'

const Link = ({ href, children, ...rest }) => {
    if (typeof href == 'object') {
        return (
            <_Link {...rest} href={href.url} as={href.as}>
                { children }
            </_Link>
        )
    } else {
        return (
            <_Link {...rest} href={href}>
                { children }
            </_Link>
        )
    }
}

export default Link