import { React, PropTypes, makeStyles } from 'common'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import Pagination from './pagination'
const useStyles = makeStyles({})

const List = ({ headers, data, pageOffset, pageCount, onPage, indicatorCount }) => {
    const classes = useStyles()
    const start = Math.max(0, pageOffset - Math.floor(indicatorCount / 2))
    const end = Math.min(pageCount - 1, pageOffset + Math.ceil(indicatorCount / 2) - 1)
    const pages = []
    pages.push({ text: 'Previous', disabled: pageOffset === 0 })
    for (let i = start; i <= end; i++) {
        pages.push({ text: i.toString(), active: i === pageOffset })
    }
    pages.push({ text: 'Next', disabled: pageOffset === pageCount - 1 })

    return (
        <>
            <Table className={classes.table}>
                { getTableHead(headers) }
                { getTableBody(data) }
            </Table>
            <Pagination
                pages={pages}
                onClick={onPage}
            />
        </>
    )
}

List.defaultProps = {
    indicatorCount: 10
}

List.propTypes = {
    headers: PropTypes.array,
    data: PropTypes.array,
    pageOffset: PropTypes.number,
    pageCount: PropTypes.number,
    onPage: PropTypes.func,
    indicatorCount: PropTypes.number
}

const getTableHead = headers => {
    if (!headers) { return null }
    return (
        <TableHead>
            <TableRow>
                {headers.map((prop, key) => {
                    return (
                        <TableCell key={key}>
                            {prop}
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    )
}

const getTableBody = data => {
    return (
        <TableBody>
            {
                data.map((prop, key) => {
                    return (
                        <TableRow key={key}>
                            {
                                prop.map((prop, key) => {
                                    return (
                                        <TableCell key={key}>
                                            {prop}
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    )
                })
            }
        </TableBody>
    )
}

export default List
