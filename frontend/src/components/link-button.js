import { React, PropTypes } from 'common'
import { Button } from '@material-ui/core'
import Link from 'next/link'

const Component = ({ href, as, children }) => (
    <Link href={href} as={as}>
        <a>
            {children}
        </a>
    </Link>
)

Component.propTypes = {
    href: PropTypes.string,
    as: PropTypes.string,
    children: PropTypes.node
}

const LinkButton = ({ children, ...rest }) => {
    return <Button component={Component} {...rest}>{children}</Button>
}

LinkButton.propTypes = {
    children: PropTypes.node
}

export default LinkButton
