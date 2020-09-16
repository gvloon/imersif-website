import { React, withStyles } from 'common'
import { Button as _Button } from '@material-ui/core'
import Link from 'next/link'

const StyledButton = withStyles((theme) => ({
    root: {
        borderRadius: 3,
        color: 'white',
        '&:hover': {
            color: 'white'
        },
        '&:active': {
            color: 'white'
        },
        '&:focus': {
            color: 'white'
        },
    }
}))(_Button)

const Button = ({ children, href, className }) => {
    const button = <StyledButton variant="contained" color="primary" className={className} component="a" disableElevation>{children}</StyledButton>
    if (!href)
        return button

    return (
        <Link href={href} passHref>
            { button }
        </Link>
    )
}

export default Button
