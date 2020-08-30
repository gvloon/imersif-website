/*!

=========================================================
* NextJS Material Kit v1.1.0 based on Material Kit Free - v2.0.2 (Bootstrap 4.0.0 Final Edition) and Material Kit React v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-kit
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-kit/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import Router from 'next/router'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withStyles, LoaderContext } from 'common'
import { Loader } from 'components'
import { motion, AnimatePresence } from 'framer-motion'

import '../assets/scss/index.scss'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1976d2',
            dark: '#1a0dab'
        },
        secondary: {
            main: '#3eb489'
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

class App extends React.Component
{
    constructor(props)
    {
        super(props)
        this.loaderContext = {
            setLoading: this.setLoading
        }
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        Router.events.on('routeChangeStart', this.showLoading)
        Router.events.on('routeChangeComplete',this.hideLoading)
        Router.events.on('routeChangeError', this.hideLoading)
    }

    componentWillUnmount() {
        Router.events.off('routeChangeStart', this.showLoading)
        Router.events.off('routeChangeComplete',this.hideLoading)
        Router.events.off('routeChangeError', this.hideLoading)
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                { this.renderPage() }
                { this.renderLoader() }
            </ThemeProvider>
        )
    }

    renderPage = () => {
        const { Component, pageProps, router, classes } = this.props
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
        const { loading } = this.state
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
                        <Loader />
                    </motion.div>
                }
            </AnimatePresence>
        )
    }

    setLoading = loading => {
        this.setState({ loading })
    }

    showLoading = () => {
        this.setState({ loading: true })
    }

    hideLoading = () => {
        this.setState({ loading: false })
    }
}

export default withStyles(styles)(App)
