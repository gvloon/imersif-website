import {
    container,
    defaultFont,
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    roseColor,
    transition,
    boxShadow,
    drawerWidth,
    blackColor,
    whiteColor,
    grayColor,
    hexToRgb
} from "assets/jss/nextjs-material-kit-pro.js"
import tooltip from "./nextjs-material-kit-pro/tooltipsStyle";
import {mlAuto} from "assets/jss/nextjs-material-kit-pro";

export default theme => ({
    appBar: {
        display: "flex",
        border: "0",
        borderRadius: "3px",
        padding: "0.625rem 0",
        marginBottom: "20px",
        color: grayColor[15],
        width: "100%",
        backgroundColor: whiteColor,
        boxShadow:
            "0 4px 18px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.12), 0 7px 10px -5px rgba(" +
            hexToRgb(blackColor) +
            ", 0.15)",
        transition: "all 150ms ease 0s",
        alignItems: "center",
        flexFlow: "row nowrap",
        justifyContent: "flex-start",
        position: "relative"
    },
    absolute: {
        position: "absolute",
        top: "auto"
    },
    fixed: {
        position: "fixed"
    },
    container: {
        ...container,
        minHeight: "50px",
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        flexWrap: "nowrap"
    },
    title: {
        letterSpacing: "unset",
        "&,& a": {
            ...defaultFont,
            minWidth: "unset",
            lineHeight: "30px",
            fontSize: "18px",
            borderRadius: "3px",
            textTransform: "none",
            whiteSpace: "nowrap",
            color: "inherit",
            "&:hover,&:focus": {
                color: "inherit",
                background: "transparent"
            }
        }
    },
    appResponsive: {
        margin: "20px 10px",
        marginTop: "0px"
    },
    primary: {
        backgroundColor: primaryColor[0],
        color: whiteColor,
        boxShadow:
            "0 4px 20px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.14), 0 7px 12px -5px rgba(" +
            hexToRgb(primaryColor[0]) +
            ", 0.46)"
    },
    info: {
        backgroundColor: infoColor[0],
        color: whiteColor,
        boxShadow:
            "0 4px 20px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.14), 0 7px 12px -5px rgba(" +
            hexToRgb(infoColor[0]) +
            ", 0.46)"
    },
    success: {
        backgroundColor: successColor[0],
        color: whiteColor,
        boxShadow:
            "0 4px 20px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.14), 0 7px 12px -5px rgba(" +
            hexToRgb(successColor[0]) +
            ", 0.46)"
    },
    warning: {
        backgroundColor: warningColor[0],
        color: whiteColor,
        boxShadow:
            "0 4px 20px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.14), 0 7px 12px -5px rgba(" +
            hexToRgb(warningColor[0]) +
            ", 0.46)"
    },
    danger: {
        backgroundColor: dangerColor[0],
        color: whiteColor,
        boxShadow:
            "0 4px 20px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.14), 0 7px 12px -5px rgba(" +
            hexToRgb(dangerColor[0]) +
            ", 0.46)"
    },
    rose: {
        backgroundColor: roseColor[0],
        color: whiteColor,
        boxShadow:
            "0 4px 20px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.14), 0 7px 12px -5px rgba(" +
            hexToRgb(roseColor[0]) +
            ", 0.46)"
    },
    transparent: {
        backgroundColor: "transparent !important",
        boxShadow: "none",
        paddingTop: "25px",
        color: whiteColor
    },
    dark: {
        color: whiteColor,
        backgroundColor: grayColor[9] + " !important",
        boxShadow:
            "0 4px 20px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.14), 0 7px 12px -5px rgba(" +
            hexToRgb(grayColor[9]) +
            ", 0.46)"
    },
    white: {
        border: "0",
        padding: "0.625rem 0",
        marginBottom: "20px",
        color: grayColor[15],
        backgroundColor: whiteColor + " !important",
        boxShadow:
            "0 4px 18px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.12), 0 7px 10px -5px rgba(" +
            hexToRgb(blackColor) +
            ", 0.15)"
    },
    drawerPaper: {
        border: "none",
        bottom: "0",
        transitionProperty: "top, bottom, width",
        transitionDuration: ".2s, .2s, .35s",
        transitionTimingFunction: "linear, linear, ease",
        width: drawerWidth,
        ...boxShadow,
        position: "fixed",
        display: "block",
        top: "0",
        height: "100vh",
        right: "0",
        left: "auto",
        visibility: "visible",
        overflowY: "visible",
        borderTop: "none",
        textAlign: "left",
        paddingRight: "0px",
        paddingLeft: "0",
        ...transition
    },
    hidden: {
        width: "100%"
    },
    collapse: {
        [theme.breakpoints.up("md")]: {
            display: "flex !important",
            MsFlexPreferredSize: "auto",
            flexBasis: "auto"
        },
        WebkitBoxFlex: "1",
        MsFlexPositive: "1",
        flexGrow: "1",
        WebkitBoxAlign: "center",
        MsFlexAlign: "center",
        alignItems: "center"
    },
    closeButtonDrawer: {
        position: "absolute",
        right: "8px",
        top: "9px",
        zIndex: "1"
    },
    list: {
        [theme.breakpoints.up("md")]: {
            WebkitBoxAlign: "center",
            MsFlexAlign: "center",
            alignItems: "center",
            WebkitBoxOrient: "horizontal",
            WebkitBoxDirection: "normal",
            MsFlexDirection: "row",
            flexDirection: "row"
        },
        [theme.breakpoints.down("sm")]: {
            display: "block"
        },
        marginTop: "0px",
        display: "flex",
        paddingLeft: "0",
        marginBottom: "0",
        listStyle: "none",
        padding: "0"
    },
    listItem: {
        float: "left",
        color: "inherit",
        position: "relative",
        display: "block",
        width: "auto",
        margin: "0",
        padding: "0",
        [theme.breakpoints.down("sm")]: {
            "& ul": {
                maxHeight: "300px",
                overflow: "scroll"
            },
            width: "100%",
            "&:not(:last-child)": {
                "&:after": {
                    width: "calc(100% - 30px)",
                    content: '""',
                    display: "block",
                    height: "1px",
                    marginLeft: "15px",
                    backgroundColor: grayColor[14]
                }
            }
        }
    },
    listItemText: {
        padding: "0 !important"
    },
    navLink: {
        color: "inherit",
        position: "relative",
        padding: "0.9375rem",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        "&:hover,&:focus": {
            color: "inherit"
        },
        "& .fab,& .far,& .fal,& .fas,& .material-icons": {
            position: "relative",
            top: "2px",
            marginTop: "-4px",
            marginRight: "4px",
            marginBottom: "0px",
            fontSize: "1.25rem"
        },
        [theme.breakpoints.down("sm")]: {
            width: "calc(100% - 30px)",
            marginLeft: "15px",
            marginBottom: "8px",
            marginTop: "8px",
            textAlign: "left",
            "& > span:first-child": {
                justifyContent: "flex-start"
            }
        },
        "& svg": {
            marginRight: "3px",
            width: "20px",
            height: "20px"
        }
    },
    navLinkJustIcon: {
        "& .fab,& .far,& .fal,& .fas,& .material-icons": {
            marginRight: "0px"
        },
        "& svg": {
            marginRight: "0px"
        }
    },
    navButton: {
        position: "relative",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        [theme.breakpoints.down("sm")]: {
            width: "calc(100% - 30px)",
            marginLeft: "15px",
            marginBottom: "5px",
            marginTop: "5px",
            textAlign: "left",
            "& > span:first-child": {
                justifyContent: "flex-start"
            }
        },
        "& $icons": {
            marginRight: "3px"
        }
    },
    notificationNavLink: {
        [theme.breakpoints.down("md")]: {
            top: "0",
            margin: "5px 15px"
        },
        color: whiteColor,
        padding: "0.9375rem",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex"
    },
    registerNavLink: {
        [theme.breakpoints.down("md")]: {
            top: "0",
            margin: "5px 15px"
        },
        position: "relative",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex"
    },
    navLinkActive: {
        "&, &:hover, &:focus,&:active ": {
            color: "inherit",
            backgroundColor: "rgba(" + hexToRgb(whiteColor) + ", 0.1)"
        }
    },
    icons: {
        width: "20px",
        height: "20px",
        marginRight: "14px"
    },
    dropdownIcons: {
        width: "24px",
        height: "24px",
        marginRight: "14px",
        opacity: "0.5",
        marginTop: "-4px",
        top: "1px",
        verticalAlign: "middle",
        fontSize: "24px",
        position: "relative"
    },
    socialIcons: {
        position: "relative",
        fontSize: "1.25rem",
        maxWidth: "24px"
    },
    dropdownLink: {
        "&,&:hover,&:focus": {
            color: "inherit",
            textDecoration: "none",
            display: "flex",
            padding: "0.75rem 1.25rem 0.75rem 0.75rem"
        }
    },
    ...tooltip,
    marginRight5: {
        marginRight: "5px"
    },
    mlAuto
})