import { React, PropTypes, paginate, withStyles, href } from 'common'
import { Pagination } from 'components'
import { color } from 'jss/index'
import CasePreview from './case-preview'

const styles = theme => ({
    list: {
        marginTop: '-1rem',
        marginBottom: '-1rem',
        [theme.breakpoints.up('sm')]: {
            marginTop: '-1.25rem',
            marginBottom: '-1.25rem',
        }
    },
    row: {
        marginTop: '1rem',
        marginBottom: '1rem',
        [theme.breakpoints.up('sm')]: {
            marginTop: '1.25rem',
            marginBottom: '1.25rem',
        }
    },
    disabled: {
        color: color.gray[17]
    }
})

class CaseList extends React.Component {
    render () {
        const { category, className } = this.props

        if (!category || !category.cases || !category.cases.length) {
            return null
        }
        return (
            <div className={className}>
                { this.renderRows() }
                { this.renderPagination() }
            </div>
        )
    }

    renderRows = () => {
        const { category, pageSize, pageIndex, classes } = this.props

        const items = paginate(category.cases, pageSize, pageIndex)

        return items.map(useCase => {
            return (
                <CasePreview
                    key={useCase.slug}
                    className={classes.row}
                    useCase={useCase}
                />
            )
        })
    }

    renderPagination = () => {
        const { category, classes, pageIndex, pageSize } = this.props

        const pageCount = Math.ceil(category.cases.length / pageSize)
        return (
            <Pagination
                className={classes.pagination}
                pageCount={pageCount}
                pageIndex={pageIndex}
                getLink={this.getPaginationLink}
            />
        )
    }

    getPaginationLink = index => {
        const { category } = this.props
        return href('/case-category/[slug]/[index]', category.slug, index)
    }
}

CaseList.defaultProps = {
    pageIndex: 0,
    pageSize: 10
}

CaseList.propTypes = {
    category: PropTypes.object,
    pageSize: PropTypes.number,
    pageIndex: PropTypes.number
}

export default withStyles(styles)(CaseList)
