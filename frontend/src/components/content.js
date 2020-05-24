import React from 'react'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'

import { makeStyles } from "@material-ui/core/styles"
import styles from 'assets/jss/nextjs-material-kit/pages/componentsSections/carouselStyle.js'
const useStyles = makeStyles(styles)

export default ({children}) => {
    const classes = useStyles()
    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
                        {children}
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    )
}
