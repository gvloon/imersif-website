import React from 'react'
import Link from 'next/link'

export default ({href, data, children}) => {
    const props = {href}
    if (data) {
        props.as = href
        for (let name in data) {
            if (data.hasOwnProperty(name)) {
                props.as = props.as.replace('[' + name + ']', data[name])
            }
        }
    }
    return (
        <Link {...props}>
            <a>{children}</a>
        </Link>
    )
}
