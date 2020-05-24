/*eslint-disable*/
import React from "react"
import {Link} from "components"

import Header from "components/Header/Header.js"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Tooltip from "@material-ui/core/Tooltip"
import Icon from "@material-ui/core/Icon"

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js"
import Button from "components/CustomButtons/Button.js"

import styles from "assets/jss/nextjs-material-kit/components/headerLinksStyle.js"

const useStyles = makeStyles(styles);

export default ({ color = 'primary' }) => (
    <Header
        color={color}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
            height: 400,
            color: "white"
        }}
    />
)

const HeaderLinks = () => {
    const classes = useStyles()
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    navDropdown
                    buttonText="Discover"
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                    }}
                    buttonIcon={Apps}
                    dropdownList={[
                        <Link href="/devices"><a className={classes.dropdownLink}>Devices</a></Link>,
                        <Link href="/tools"><a className={classes.dropdownLink}>Tools</a></Link>,
                        <Link href="/cases"><a className={classes.dropdownLink}>Cases</a></Link>
                    ]}
                />
            </ListItem>
            <ListItem className={classes.listItem}>
                <Link href="/patterns">
                    <Button color="transparent" className={classes.navLink}>Patterns</Button>
                </Link>,
            </ListItem>
        </List>
    )
}
