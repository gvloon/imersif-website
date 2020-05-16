import React from 'react'
import Link from 'next/link'

export default ({href, children}) => (
    <Link href={href}>
        <a href={href}>{children}</a>
    </Link>
)
