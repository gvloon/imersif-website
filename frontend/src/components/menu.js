import { React, PropTypes, makeStyles } from 'common'
import { Link, Dropdown, SearchInput } from 'components'
import { button, container, contentPadding, color } from 'jss/index'
import { AppBar, Box, IconButton, Drawer, Button } from '@material-ui/core'
import { Apps, Menu as MenuIcon, Search as SearchIcon } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    appBar: {
        display: 'flex',
        border: '0',
        backgroundColor: color.black,
        color: color.white,
        boxShadow:
            '0 4px 18px 0px rgba(' +
            color.hexToRgb(color.black) +
            ', 0.12), 0 7px 10px -5px rgba(' +
            color.hexToRgb(color.black) +
            ', 0.15)',
        transition: 'all 150ms ease 0s',
        alignItems: 'center'
    },
    toolbar: {
        ...container(theme),
        ...contentPadding(theme),
        display: 'flex',
        flex: 1,
        minHeight: '50px',
        alignItems: 'center'
    },
    desktopNav: {
        display: 'none',
        height: '100%',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        }
    },
    mobileNavLong: {
        display: 'none',
        [theme.breakpoints.only('sm')]: {
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        }
    },
    mobileNavShort: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        }
    },
    drawer: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    drawerPaper: {
        backgroundColor: color.gray[5],
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px'
    },
    drawerLink: {
        ...button,
        width: '100%'
    },
    search: {
        flex: 1
    },
    searchMobile: {
        flex: 1,
        backgroundColor: color.black
    },
    navLink: {
        ...button
    },
    brand: {
        ...button,
        marginLeft: '-30px'
    },
    brandMobile: {
        ...button,
        marginLeft: '-30px',
        flex: 1
    },
    menu: {
        marginRight: '-12px'
    },
    root: {
        width: '100%'
    },
    nav: {
        height: '100%',
        marginLeft: '40px'
    },
    dropdownLink: {
        '&,&:hover,&:focus': {
            color: 'inherit',
            textDecoration: 'none',
            display: 'flex',
            padding: '0.75rem 1.25rem 0.75rem 0.75rem'
        }
    },
    dropdownRight: {
        marginRight: '-30px'
    },
    iconRight: {
        marginRight: '-12px'
    },
    navLinkRight: {
        ...button,
        marginRight: '-30px'
    }
}))

const Menu = ({ context }) => {
    const [drawerVisible, setDrawerVisible] = React.useState(false)
    const [searchVisible, setSearchVisible] = React.useState(false)
    const toggleDrawer = () => setDrawerVisible(!drawerVisible)
    const toggleSearch = () => setSearchVisible(!searchVisible)
    const classes = useStyles()

    return (
        <AppBar className={classes.appBar}>
            <div className={classes.toolbar}>
                <div className={classes.desktopNav}>
                    <Link href="/">
                        <Button className={classes.brand}>XR Patterns</Button>
                    </Link>
                    <SearchInput className={classes.search} context={context} optionsEnabled={true} />
                    <Box className={classes.nav} display="flex" flexDirection="row">
                        <Link href="/patterns">
                            <Button className={classes.navLink}>Patterns</Button>
                        </Link>
                        <Dropdown
                            buttonText="Database"
                            buttonProps={{
                                className: classes.navLinkRight
                            }}
                            buttonIcon={Apps}
                            dropdownList={[
                                <Link href="/glossary" key="devices"><a className={classes.dropdownLink}>Glossary</a></Link>,
                                <Link href="/devices" key="devices"><a className={classes.dropdownLink}>Hardware</a></Link>,
                                <Link href="/tools" key="tools"><a className={classes.dropdownLink}>Software</a></Link>,
                                <Link href="/cases" key="cases"><a className={classes.dropdownLink}>Cases</a></Link>
                            ]}
                        />
                    </Box>
                </div>
                <div className={classes.mobileNavLong}>
                    <Link href="/">
                        <Button className={classes.brand}>XR Patterns</Button>
                    </Link>
                    <SearchInput className={classes.search} context={context} />
                    <IconButton className={classes.menu} color="inherit" aria-label="show drawer" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                </div>
                <div className={classes.mobileNavShort}>
                    {
                        searchVisible
                            ? <SearchInput className={classes.searchMobile} mobile={true} context={context} onClose={toggleSearch} />
                            : <>
                                <Box flex={1}>
                                    <Link href="/">
                                        <Button className={classes.brand}>XR Patterns</Button>
                                    </Link>
                                </Box>
                                <IconButton color="inherit" aria-label="show search" onClick={toggleSearch}>
                                    <SearchIcon />
                                </IconButton>
                                <IconButton className={classes.iconRight} color="inherit" aria-label="show drawer" onClick={toggleDrawer}>
                                    <MenuIcon />
                                </IconButton>
                            </>
                    }
                </div>
            </div>
            <Drawer
                classes={{
                    root: classes.drawer,
                    paper: classes.drawerPaper
                }}
                variant="temporary"
                anchor="right"
                open={drawerVisible}
                onClose={toggleDrawer}
            >
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Link href="/patterns">
                        <Button className={classes.drawerLink}>Patterns</Button>
                    </Link>
                    <Link href="/glossary">
                        <Button className={classes.drawerLink}>Glossary</Button>
                    </Link>
                    <Link href="/devices">
                        <Button className={classes.drawerLink}>Hardware</Button>
                    </Link>
                    <Link href="/tools">
                        <Button className={classes.drawerLink}>Software</Button>
                    </Link>
                    <Link href="/cases">
                        <Button className={classes.drawerLink}>Cases</Button>
                    </Link>
                </Box>
            </Drawer>
        </AppBar>
    )
}

Menu.propTypes = {
    context: PropTypes.object
}

export default Menu
