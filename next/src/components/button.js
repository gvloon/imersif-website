import { React, makeStyles } from 'common'
import { Button as _Button } from '@material-ui/core'
import Link from 'next/link'

const Button = ({ children, href, as, className }) => {
    return (
        <Link href={href} as={as} passHref>
            <_Button className={className} component="a">{children}</_Button>
        </Link>
    )
}

export default Button
