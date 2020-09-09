import { React, PropTypes, makeStyles } from 'common'
import Pagination from './pagination'

const useStyles = makeStyles(theme => ({
    pagination: {
        marginTop: '20px',
        marginLeft: '-14px'
    }
}))

const PaginatedList = ({ data, pageIndex, pageCount, renderRow, renderNav, className, indicatorCount }) => {
    const classes = useStyles()
    return (
        <div className={className}>
            {
                data.map(renderRow)
            }
            {
                pageCount > 1 &&
                <Pagination
                    className={classes.pagination}
                    pageIndex={pageIndex}
                    pageCount={pageCount}
                    renderNav={renderNav}
                    indicatorCount={indicatorCount}
                />
            }
        </div>
    )
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

export default PaginatedList
