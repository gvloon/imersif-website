import { color } from 'jss/index'
import { React, PropTypes, makeStyles, classNames } from 'common'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => {
    return {
        pagination: {
            display: 'flex',
            paddingLeft: '0',
            listStyle: 'none',
            borderRadius: '0.25rem'
        },
        paginationItem: {
            display: 'inline'
        },
        paginationLink: {
            ':first-of-type': {
                marginleft: '0'
            },
            letterSpacing: 'unset',
            border: '0',
            borderRadius: '30px !important',
            transition: 'all .3s',
            padding: '0px 11px',
            margin: '0 3px',
            minWidth: '30px',
            height: '30px',
            minHeight: 'auto',
            lineHeight: '30px',
            fontWeight: '400',
            fontSize: '12px',
            textTransform: 'uppercase',
            background: 'transparent',
            position: 'relative',
            float: 'left',
            textDecoration: 'none',
            boxSizing: 'border-box',
            '&,&:hover,&:focus': {
                color: color.gray[0]
            },
            '&:hover,&:focus': {
                zIndex: '3',
                backgroundColor: color.gray[2],
                borderColor: color.gray[6]
            },
            '&:hover': {
                cursor: 'pointer'
            }
        },
        active: {
            '&,&:hover,&:focus': {
                backgroundColor: color.black,
                borderColor: color.black,
                color: color.white,
                boxShadow:
                    '0 4px 5px 0 rgba(' +
                    color.hexToRgb(color.black) +
                    ', 0.14), 0 1px 10px 0 rgba(' +
                    color.hexToRgb(color.black) +
                    ', 0.12), 0 2px 4px -1px rgba(' +
                    color.hexToRgb(color.black) +
                    ', 0.2)'
            },
            '&:hover,&:focus': {
                zIndex: '2',
                cursor: 'default'
            }
        },
        disabled: {
            '&,&:hover,&:focus': {
                color: color.gray[10],
                cursor: 'not-allowed',
                backgroundColor: color.white,
                borderColor: color.gray[6]
            }
        }
    }
})

const Pagination = ({ pageIndex, pageCount, className, renderNav, indicatorCount }) => {
    const start = Math.max(0, pageIndex - Math.floor(indicatorCount / 2))
    const end = Math.min(pageCount - 1, pageIndex + Math.ceil(indicatorCount / 2) - 1)
    const pages = []
    pages.push({ text: 'Previous', disabled: pageIndex === 0, index: pageIndex - 1 })
    for (let i = start; i <= end; i++) {
        pages.push({ text: i.toString(), active: i === pageIndex, index: i })
    }
    pages.push({ text: 'Next', disabled: pageIndex === pageCount - 1, index: pageIndex + 1 })

    const classes = useStyles()
    const paginationClasses = classNames(classes.pagination, className)
    return (
        <ul className={paginationClasses}>
            {pages.map((prop, key) => {
                const paginationLink = classNames({
                    [classes.paginationLink]: true,
                    [classes.active]: prop.active,
                    [classes.disabled]: prop.disabled
                })
                return (
                    <li className={classes.paginationItem} key={key}>
                        <Button
                            className={paginationLink}
                            disabled={prop.disabled}
                        >
                            {
                                renderNav(prop)
                            }
                        </Button>
                    </li>
                )
            })}
        </ul>
    )
}

Pagination.defaultProps = {
    indicatorCount: 10
}

Pagination.propTypes = {
    pageIndex: PropTypes.number,
    pageCount: PropTypes.number,
    className: PropTypes.string,
    renderNav: PropTypes.func,
    indicatorCount: PropTypes.number
}

export default Pagination
