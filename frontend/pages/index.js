import React from 'react'
import {api} from 'common'
import {Layout, Menu} from 'components'

import classNames from "classnames"

import Footer from "components/Footer/Footer.js"
import GridContainer from "components/Grid/GridContainer.js"
import GridItem from "components/Grid/GridItem.js"
import Parallax from "components/Parallax/Parallax.js"

import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js"
import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles(styles)

export default ({page}) => {
    const classes = useStyles()
    return (
        <Layout title={page.title}>
            <Menu color={'transparent'} />
            <Parallax filter responsive image="home.jpg">
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>XR Patterns</h1>
                            <h4>
                                Description
                            </h4>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <h1 className={classes.title}>XR Patterns</h1>
                    Explanation
                </div>
            </div>
            <Footer />
        </Layout>
    )
}

export const getStaticProps = async () => {
    const {data: props} = await api({
        page: {
            __aliasFor: 'pageByType',
            __args: { type: 'Home' },
            title: true,
            content: true
        }
    })
    return {props, unstable_revalidate: 1}
}

