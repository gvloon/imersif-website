import { React, PropTypes, makeStyles, classNames, _ } from 'common'
import { Dropdown } from 'components'
import { Popper, Paper, InputBase, Divider, ClickAwayListener, IconButton } from '@material-ui/core'
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons'
import { color } from 'jss/index'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: color.white,
        borderRadius: '5px',
        height: '30px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rootMobile: {
        height: '50px',
        backgroundColor: color.black
    },
    inputContainer: {
        display: 'flex',
        flex: 1
    },
    inputContainerMobile: {

    },
    input: {
        marginLeft: '20px',
        flex: 1
    },
    inputMobile: {
        marginLeft: '0px',
        color: color.white
    },
    iconButton: {
        padding: 10
    },
    divider: {
        height: 28,
        margin: 0
    },
    popper: {
        zIndex: theme.zIndex.modal
    },
    dropDownLabel: {
        color: 'black',
        height: '30px',
        background: 'none',
        position: 'relative',
        padding: '0px 10px',
        textTransform: 'none',
        borderRadius: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        boxShadow: 'none',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '20px',
        textDecoration: 'none',
        margin: '0px',
        display: 'inline-flex',
        '&:hover, &:focus, &:active': {
            color: 'black',
            backgroundColor: '#eee',
            boxShadow: 'none',
            borderRadius: 0,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5
        }
    },
    dropdownLink: {
        '&,&:hover,&:focus': {
            color: 'inherit',
            textDecoration: 'none',
            display: 'flex',
            padding: '0.75rem 1.25rem 0.75rem 0.75rem'
        }
    },
    rightButton: {
        marginRight: '-12px'
    }
}))

const options = [
    {
        id: 'all',
        label: 'All',
        placeholder: 'Search everything'
    },
    {
        id: 'patterns',
        label: 'Patterns',
        placeholder: 'Search patterns'
    },
    {
        id: 'glossary',
        label: 'Glossary',
        placeholder: 'Search glossary'
    },
    {
        id: 'hardware',
        label: 'Hardware',
        placeholder: 'Search hardware'
    },
    {
        id: 'software',
        label: 'Software',
        placeholder: 'Search software'
    },
    {
        id: 'cases',
        label: 'Cases',
        placeholder: 'Search cases/applications'
    }
]

const Search = ({ className, context, optionsEnabled, mobile, onSearch, onClose }) => {
    let optionIndex = context ? _.findIndex(options, option => option.id === context.section) : -1
    if (optionIndex < 0) {
        optionIndex = 0
    }
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(optionIndex)
    const onChange = ev => {
        setAnchorEl(ev.target)
        setOpen(!!ev.target.value)
    }

    const onClickAway = ev => {
        setOpen(false)
    }

    const onSelect = id => {
        setValue(id)
    }

    const rootClass = classNames({
        [classes.root]: true,
        [className]: true,
        [classes.rootMobile]: mobile
    })
    const inputClass = classNames({
        [classes.input]: true,
        [classes.inputMobile]: mobile
    })
    return (
        <div className={rootClass}>
            {
                optionsEnabled &&
                <>
                    <Dropdown
                        dropPlacement="bottom-start"
                        navDropdown
                        buttonText={options[value].label}
                        buttonProps={{
                            variant: 'text',
                            className: classes.dropDownLabel
                        }}
                        dropdownList={options.map((option, index) => (
                            <a key={index} className={classes.dropdownLink} onClick={() => onSelect(index)}>{option.label}</a>
                        ))}
                    />
                    <Divider className={classes.divider} orientation="vertical" />
                </>
            }
            <ClickAwayListener onClickAway={onClickAway}>
                <div className={classes.inputContainer}>
                    <InputBase
                        className={inputClass}
                        placeholder={options[value].placeholder}
                        onChange={onChange}
                        onFocus={onChange}
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <Popper
                        className={classes.popper}
                        open={open}
                        anchorEl={anchorEl}
                        style={{
                            width: anchorEl ? anchorEl.clientWidth : null
                        }}
                        role="presentation"
                    >
                        <Paper className={classes.paper}>
                            <ul>
                                <li>test</li>
                                <li>test</li>
                                <li>test</li>
                                <li>test</li>
                                <li>test</li>
                            </ul>
                        </Paper>
                    </Popper>
                </div>
            </ClickAwayListener>
            {
                mobile
                    ? <IconButton className={classes.rightButton} color="inherit" aria-label="show drawer" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                    : <IconButton className={classes.rightButton} color="inherit" aria-label="show drawer" onClick={onSearch}>
                        <SearchIcon />
                    </IconButton>
            }

        </div>
    )
}

Search.propTypes = {
    className: PropTypes.string,
    context: PropTypes.object.isRequired,
    optionsEnabled: PropTypes.bool,
    mobile: PropTypes.bool,
    onSearch: PropTypes.func,
    onClose: PropTypes.func
}

export default Search
