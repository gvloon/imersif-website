import {React, PropTypes, withStyles, classNames} from 'common'
import {Link} from 'components'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

const styles = theme => ({
    table: {
        tableLayout: 'fixed',
        width: '100%',
        borderSpacing: '0px',
        border: '1px solid ' + theme.palette.secondary.dark
    },
    header: {
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.secondary.main,
        height: '40px',
        fontSize: '0.9rem',
        '& a': {
            color: 'white',
            display: 'flex',
            height: '100%',
            alignItems: 'center'
        },
    },
    row: {
        '&:nth-child(even)': {
            backgroundColor: theme.palette.secondary.dark
        },
        '&:nth-child(odd)': {
            backgroundColor: theme.palette.secondary.main
        },
        '&:hover': {
            backgroundColor: '#e0e0e0'
        }
    },
    cell: {
        overflow: 'hidden',
        height: '3rem',
        fontSize: '0.9rem',
        fontWeight: 400,
        '& a': {
            height: '100%',
            display: 'flex',
            alignItems: 'center'
        }
    },
    left: {
        textAlign: 'left',
        paddingLeft: '0.8rem',
        '& a': {
            justifyContent: 'flexStart',
        }
    },
    center: {
        textAlign: 'center',
        '& a': {
            justifyContent: 'center',
        }
    },
    right: {
        textAlign: 'right',
        paddingRight: '0.8rem',
        '& a': {
            justifyContent: 'flexEnd'
        }
    },
    xs: {
        display: 'none',
        [theme.breakpoints.up('xs')]: {
            display: 'table-cell'
        }
    },
    sm: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'table-cell'
        }
    },
    icon: {
        marginTop: '5px'
    }
})

class Table extends React.Component {
    render = () => {
        const {classes} = this.props
        return (
            <table className={classes.table}>
                {this.renderHeaders()}
                {this.renderRows()}
            </table>
        )
    }

    renderColumnGroup = () => {
        const {columns, classes} = this.props

        return (
            <colgroup>
                {
                    columns.map((column, index) => {
                        const columnClasses = classNames({
                            [classes.column]: !!classes.column,
                            [classes.desktop]: column.desktop
                        })
                        return <col className={columnClasses} />
                    })
                }
            </colgroup>
        )
    }

    renderHeaders = () => {
        const {columns, classes} = this.props
        if (!columns)
            return null

        return (
            <thead className={classes.headers}>
            <tr>
                {
                    columns.map((column, index) => this.renderHeader(column, index))
                }
            </tr>
            </thead>
        )
    }

    renderHeader = (column, index) => {
        const { classes } = this.props

        const headerClasses = classNames({
            [classes.header]: !!classes.header,
            [classes.left]: column.alignment === 'left',
            [classes.center]: column.alignment !== 'left' && column.alignment !== 'right',
            [classes.right]: column.alignment === 'right',
            [classes.xs]: column.responsive === 'xs',
            [classes.sm]: column.responsive === 'sm',
        })
        let arrow = null
        if (column.sort !== null) {
            arrow = column.sort === 'desc' ? <span class={classes.icon}><ArrowDropDownIcon /></span> : <span class={classes.icon}><ArrowDropUpIcon /></span>
        }
        return (
            <th key={index} className={headerClasses}>
                <Link href={column.link}>
                    <a>{column.label}{arrow}</a>
                </Link>
            </th>
        )
    }

    renderRows = () => {
        const {items, columns, classes, getLink} = this.props
        return (
            <tbody>
            {
                items.map((item, index) => {
                    const link = getLink(item)
                    return (
                        <tr key={index} className={classes.row}>
                            {
                                columns.map((column, index) => {
                                    return this.renderCell(column, item, link, index)
                                })
                            }
                        </tr>
                    )
                })
            }
            </tbody>
        )
    }

    renderCell = (column, item, link, index) => {
        const { classes } = this.props
        const cellClasses = classNames({
            [classes.cell]: !!classes.cell,
            [classes.left]: column.alignment === 'left',
            [classes.center]: column.alignment !== 'left' && column.alignment !== 'right',
            [classes.right]: column.alignment === 'right',
            [classes.xs]: column.responsive === 'xs',
            [classes.sm]: column.responsive === 'sm',
        })
        return (
            <td key={index} className={cellClasses}>
                <Link href={link}>
                    <a>
                        { column.render(item) }
                    </a>
                </Link>
            </td>
        )
    }
}


Table.defaultProps = {
    indicatorCount: 10
}

Table.propTypes = {
    data: PropTypes.array,
    pageIndex: PropTypes.number,
    pageCount: PropTypes.number,
    renderRow: PropTypes.func,
    renderNav: PropTypes.func,
    className: PropTypes.string,
    indicatorCount: PropTypes.number
}

export default withStyles(styles)(Table)
