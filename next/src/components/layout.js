import { React, PropTypes, PageContext } from 'common'
import Head from 'next/head'

const Layout = ({ children }) => {
    const pageContext = React.useContext(PageContext)
    return (
        <>
            <Head>
                <title>{pageContext.title || ''}</title>
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
