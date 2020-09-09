import { React, PropTypes, withStyles } from 'common'
import Pagination from './pagination'

const styles = theme => ({
    pagination: {
        marginTop: '20px',
        marginLeft: '-14px'
    }
})

class PaginatedList extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            pageIndex: 0
        }
    }

    render () {
        const { columns, items, className, indicatorCount, classes } = this.props
        const { pageIndex } = this.state
        return (
            <div className={className}>
                { this.renderHeaders() }
                { this.renderRows() }
                { this.renderPagination() }
            </div>
        )
    }

    renderHeaders() {
        const { columns } = this.props
        return columns.map(column => (
            <div>{column.label}</div>
        ))
    }

    renderRows() {
        const { columns, items, pageSize } = this.props
    }

    renderPagination() {
        const { items, pageSize, classes } = this.props
        const { pageIndex } = this.state
        const pageCount = 0

        return (
            <Pagination
                className={classes.pagination}
                pageIndex={pageIndex}
                pageCount={pageCount}
            />
        )
    }
}


PaginatedList.defaultProps = {
    indicatorCount: 10
}

PaginatedList.propTypes = {
    data: PropTypes.array,
    pageIndex: PropTypes.number,
    pageCount: PropTypes.number,
    renderRow: PropTypes.func,
    renderNav: PropTypes.func,
    className: PropTypes.string,
    indicatorCount: PropTypes.number
}

export default withStyles(styles)(PaginatedList)
