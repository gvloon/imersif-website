import React from "react"
import {Layout, Markdown, Menu} from "components"
import {template, Config} from 'common'
import Parallax from "components/Parallax/Parallax"
import GridContainer from "components/Grid/GridContainer"
import GridItem from "components/Grid/GridItem"
import classNames from "classnames"
import Footer from "components/Footer/Footer"

import {makeStyles} from "@material-ui/core/styles"
import styles from 'assets/jss/parallax-page.js'
const useStyles = makeStyles(styles)

export default ({page, components, strings}) => {
    const classes = useStyles()
    return (
        <Layout title={template(page.title, strings)}>
            <Menu color="transparent" />
            <Parallax filter responsive image={page.parallax_image ? Config.apiUrl + page.parallax_image[0].url : null}>
                <div className={classes.image}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <Markdown source={page.parallax_content} components={components} strings={strings} />
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12}>
                            <Markdown source={page.content} components={components} strings={strings} />
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
            <Footer/>
        </Layout>
    )
}