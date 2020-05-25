import React from "react"
import GridContainer from "components/Grid/GridContainer"
import GridItem from "components/Grid/GridItem"
import Footer from "components/Footer/Footer"
import {Layout, Markdown, Menu} from "components"
import {template} from 'common'

import {makeStyles} from "@material-ui/core/styles"
import styles from 'assets/jss/basic-page.js'
const useStyles = makeStyles(styles)

export default ({page, components, strings}) => {
    const classes = useStyles()
    return (
        <Layout title={template(page.title, strings)}>
            <Menu />
            <div className={classes.section}>
                <style jsx global>{`
              body {
                  background-color: white;
              }
            `}</style>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} className={classes.marginAuto}>
                            <Markdown source={page.content} components={components} strings={strings} />
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
            <Footer/>
        </Layout>
    )
}