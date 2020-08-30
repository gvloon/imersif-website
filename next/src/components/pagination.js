import { color } from 'jss/index'
import { React, PropTypes, makeStyles, classNames } from 'common'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => {
    return {
        pagination: {
            display: 'flex',
            paddingLeft: '0',
            listStyle: 'none',
            borderRadius: '0.25rem',
            justifyContent: 'center'
        },
        paginationItem: {
            display: 'inline'
        },
        paginationLink: {
            ':first-of-type': {
                marginLeft: '0'
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
        number: {
            width: '30px'
        },
        active: {
            '&,&:hover,&:focus': {
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
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

const Pagination = ({ pageIndex, pageCount, className, onClick, indicatorCount }) => {
    if (pageCount <= 1) {
        return null
    }
    const { min, max } = getBoundaries(pageIndex, indicatorCount, pageCount)
    const pages = []
    pages.push({ text: 'Previous', disabled: pageIndex === 0, index: pageIndex - 1 })
    for (let i = min; i <= max; i++) {
        pages.push({ text: (i + 1).toString(), active: i === pageIndex, index: i, number: true })
    }
    pages.push({ text: 'Next', disabled: pageIndex === pageCount - 1, index: pageIndex + 1 })

    const classes = useStyles()
    const paginationClasses = classNames(classes.pagination, className)
    return (
        <ul className={paginationClasses}>
            {
                pages.map((prop, index) => {
                    const paginationLink = classNames({
                        [classes.paginationLink]: true,
                        [classes.active]: prop.active,
                        [classes.disabled]: prop.disabled,
                        [classes.number]: prop.number
                    })
                    return (
                        <li className={classes.paginationItem} key={index}>
                            <Button
                                className={paginationLink}
                                disabled={prop.disabled}
                                value={index}
                                onClick={(!prop.disabled && !prop.active) ? () => onClick(prop.index) : null}
                            >
                                { prop.text }
                            </Button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

const getBoundaries = (index, count, max) => {
    let up = true
    const data = { min: index, max: index }
    while (count > 1) {
        if (up) {
            if (data.max < max - 1) {
                data.max++
            } else if (data.min > 0) {
                data.min--
            } else {
                break
            }
        } else {
            if (data.min > 0) {
                data.min--
            } else if (data.max < max - 1) {
                data.max++
            } else {
                break
            }
        }
        up = !up
        count--
    }
    return data
}

Pagination.defaultProps = {
    pageIndex: 0,
    pageCount: 1,
    indicatorCount: 5
}

Pagination.propTypes = {
    pageIndex: PropTypes.number,
    pageCount: PropTypes.number,
    className: PropTypes.string,
    renderNav: PropTypes.func,
    indicatorCount: PropTypes.number
}

export default Pagination
