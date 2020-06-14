import { color, defaultFont } from 'jss/index'

export default theme => ({
    popperClose: {
        pointerEvents: 'none',
        display: 'none !important'
    },
    manager: {
        '& > div > button:first-child > span:first-child, & > div > a:first-child > span:first-child': {
            width: '100%'
        }
    },
    innerManager: {
        display: 'block',
        '& > div > button,& > div > a': {
            margin: '0px !important',
            color: 'inherit !important',
            padding: '10px 20px !important',
            '& > span:first-child': {
                width: '100%',
                justifyContent: 'flex-start'
            }
        }
    },
    target: {
        '& > button:first-child > span:first-child, & > a:first-child > span:first-child': {
            display: 'inline-block'
        },
        '& $caret': {
            marginLeft: '0px'
        }
    },
    dropdown: {
        borderRadius: '3px',
        border: '0',
        boxShadow: '0 2px 5px 0 rgba(' + color.hexToRgb(color.black) + ', 0.26)',
        top: '100%',
        zIndex: '1000',
        minWidth: '160px',
        padding: '5px 0',
        margin: '2px 0 0',
        fontSize: '14px',
        textAlign: 'left',
        listStyle: 'none',
        backgroundColor: color.white,
        backgroundClip: 'padding-box'
    },
    menuList: {
        padding: '0'
    },
    popperResponsive: {
        zIndex: '1200',
        position: 'absolute !important',
        [theme.breakpoints.down('sm')]: {
            zIndex: '1640',
            float: 'none',
            width: 'auto',
            marginTop: '0',
            backgroundColor: 'transparent',
            border: '0',
            boxShadow: 'none',
            color: 'black'
        }
    },
    dropdownItem: {
        ...defaultFont,
        fontSize: '13px',
        margin: '0 5px',
        padding: '0',
        borderRadius: '2px',
        position: 'relative',
        transition: 'all 150ms linear',
        display: 'block',
        clear: 'both',
        fontWeight: '400',
        height: '100%',
        color: color.gray[8],
        whiteSpace: 'nowrap',
        minHeight: 'unset'
    },
    dropdownItemRTL: {
        textAlign: 'right'
    },
    dropdownDividerItem: {
        margin: '5px 0',
        backgroundColor: 'rgba(' + color.hexToRgb(color.black) + ', 0.12)',
        height: '1px',
        overflow: 'hidden'
    },
    buttonIcon: {
        width: '20px',
        height: '20px'
    },
    caret: {
        transition: 'all 150ms ease-in',
        display: 'inline-block',
        width: '0',
        height: '0',
        marginLeft: '4px',
        verticalAlign: 'middle',
        borderTop: '4px solid',
        borderRight: '4px solid transparent',
        borderLeft: '4px solid transparent'
    },
    caretActive: {
        transform: 'rotate(180deg)'
    },
    caretDropup: {
        transform: 'rotate(180deg)'
    },
    caretRTL: {
        marginRight: '4px'
    },
    dropdownHeader: {
        display: 'block',
        padding: '0.1875rem 1.25rem',
        fontSize: '0.75rem',
        lineHeight: '1.428571',
        color: color.gray[10],
        whiteSpace: 'nowrap',
        fontWeight: 'inherit',
        marginTop: '10px',
        minHeight: '24px',
        '&:hover,&:focus': {
            backgroundColor: 'transparent',
            cursor: 'auto'
        }
    }
})
