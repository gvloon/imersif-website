import { React, PropTypes } from 'common'
import Head from 'next/head'

const Layout = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || ''}</title>
            </Head>
            {children}
        </>
    )
}

Layout.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
}

export default Layout
