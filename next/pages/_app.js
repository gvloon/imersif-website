import React from 'react'
import Router from 'next/router'
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {withStyles, LoaderContext, ga} from 'common'
import {Loader} from 'components'
import {motion, AnimatePresence} from 'framer-motion'

import '../assets/scss/index.scss'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#002f6c'
        },
        secondary: {
            light: '#fcfcfc',
            main: '#fafafa',
            dark: '#f3f3f3'
        }
    },
    breakpoints: {
        values: {
            xs: 480,
            sm: 736,
            md: 980,
            lg: 1280,
            xl: 1690
        }
    }
})

const styles = theme => ({
    page: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%'
    }
})

const pages = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.3
        }
    },
    exit: {
        opacity: 0,
        transition: {
            delay: 0.15,
            duration: 0.3
        }
    }
}

const loader = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 2
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3
        }
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.loaderContext = {
            setLoading: this.setLoading
        }
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        Router.events.on('routeChangeStart', this.onRouteChangeStart)
        Router.events.on('routeChangeComplete', this.onRouteChangeComplete)
        Router.events.on('routeChangeError', this.onRouteChangeError)
    }

    componentWillUnmount() {
        Router.events.off('routeChangeStart', this.onRouteChangeStart)
        Router.events.off('routeChangeComplete', this.onRouteChangeComplete)
        Router.events.off('routeChangeError', this.onRouteChangeError)
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                {this.renderPage()}
                {this.renderLoader()}
            </ThemeProvider>
        )
    }

    renderPage = () => {
        const {Component, pageProps, router, classes} = this.props
        return (
            <AnimatePresence initial={false}>
                <motion.div
                    key={router.route}
                    className={classes.page}
                    variants={pages}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <LoaderContext.Provider value={this.loaderContext}>
                        <Component {...pageProps} />
                    </LoaderContext.Provider>
                </motion.div>
            </AnimatePresence>
        )
    }

    renderLoader = () => {
        const {loading} = this.state
        return (
            <AnimatePresence>
                {
                    loading &&
                    <motion.div
                        variants={loader}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <Loader/>
                    </motion.div>
                }
            </AnimatePresence>
        )
    }

    setLoading = loading => {
        this.setState({loading})
    }

    onRouteChangeStart = () => {
        this.setState({loading: true})
    }

    onRouteChangeComplete = url => {
        this.setState({loading: false})
        ga.pageview(url)
    }

    onRouteChangeError = () => {
        this.setState({loading: false})
    }
}

export default withStyles(styles)(App)
