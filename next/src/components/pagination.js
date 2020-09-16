import { color } from 'jss/index'
import { React, PropTypes, withStyles, classNames, memoize, debug } from 'common'
import { Link } from 'components'
import { Button } from '@material-ui/core'

const styles = theme => {
    return {
        pagination: {
            display: 'flex',
            paddingLeft: '0',
            listStyle: 'none',
            borderRadius: '0.25rem',
            justifyContent: 'center',
            paddingRight: '26px'
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
}

class Pagination extends React.Component {
    render () {
        const { pageCount, pageIndex, indicatorCount, className, classes } = this.props
        if (pageCount < 2) {
            return null
        }

        const buttons = this.getButtons(pageCount, pageIndex, indicatorCount)
        const paginationClasses = classNames(classes.pagination, className)
        return (
            <ul className={paginationClasses}>
                {
                    buttons.map((button, index) => {
                        return (
                            <li className={classes.paginationItem} key={index}>
                                {
                                    this.renderButton(button, index)
                                }
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    getButtons = memoize((pageCount, pageIndex, indicatorCount) => {
        const { min, max } = this.getBoundaries(pageIndex, indicatorCount, pageCount)
        const buttons = []
        buttons.push({ text: 'Previous', disabled: pageIndex === 0, index: pageIndex - 1 })
        for (let i = min; i <= max; i++) {
            buttons.push({ text: (i + 1).toString(), active: i === pageIndex, index: i, number: true })
        }
        buttons.push({ text: 'Next', disabled: pageIndex === pageCount - 1, index: pageIndex + 1 })
        return buttons
    })

    getBoundaries = memoize((index, count, max) => {
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
    })

    renderButton = (button, index) => {
        const { classes, getLink, onClick } = this.props
        const className = classNames({
            [classes.paginationLink]: true,
            [classes.active]: button.active,
            [classes.disabled]: button.disabled,
            [classes.number]: button.number
        })
        if (button.disabled || button.active) {
            return (
                <Button className={className} disabled={button.disabled} value={index}>
                    {button.text}
                </Button>
            )
        } else if (getLink) {
            const href = getLink(button.index)
            console.log('href: ' + debug(href))
            return (
                <Link href={href}>
                    <Button className={className} disabled={button.disabled} value={index}>
                        {button.text}
                    </Button>
                </Link>
            )
        } else {
            return (
                <Button className={className} disabled={button.disabled} value={index} onClick={onClick}>
                    { button.text }
                </Button>
            )
        }
    }


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

export default withStyles(styles)(Pagination)
