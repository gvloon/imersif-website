import { React, PropTypes, PageContext, makeStyles } from 'common'
import Head from 'next/head'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flex: 1,
        backgroundColor: '#eee'
    }
}))

const Layout = ({ children }) => {
    const pageContext = React.useContext(PageContext)
    const classes = useStyles()

    return (
        <>
            <Head>
                <title>{pageContext.title || ''}</title>
            </Head>
            <div className={classes.container}>
                {children}
            </div>
        </>
    )
}

Layout.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
}

export default Layout
