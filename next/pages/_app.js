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

import '../assets/scss/index.scss'

Router.events.on('routeChangeStart', url => {
    console.log(`Loading: ${url}`)
    // document.body.classList.add("body-page-transition");
    // ReactDOM.render(
    //   <PageChange path={url} />,
    //   document.getElementById("page-transition")
    // );
})
Router.events.on('routeChangeComplete', () => {
    // ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    // document.body.classList.remove("body-page-transition");
})
Router.events.on('routeChangeError', () => {
    // ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    // document.body.classList.remove("body-page-transition");
})

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#000'
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

export default ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}
