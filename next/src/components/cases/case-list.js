import { React, PropTypes, paginate, withStyles, href } from 'common'
import { Pagination, Preview } from 'components'
import { color } from 'jss/index'

const styles = theme => ({
    list: {
        marginTop: '-1rem',
        marginBottom: '-1rem'
    },
    row: {
        marginTop: '1rem',
        marginBottom: '1rem'
    },
    disabled: {
        color: color.gray[17]
    }
})

class CaseList extends React.Component {
    render () {
        const { category } = this.props

        if (!category || !category.cases || !category.cases.length) {
            return null
        }
        return (
            <div>
                { this.renderTitle() }
                { this.renderRows() }
                { this.renderPagination() }
            </div>
        )
    }

    renderTitle = () => {
        const { title } = this.props
        if (!title)
            return null

        return <h2>{title}</h2>
    }

    renderRows = () => {
        const { category, pageSize, pageIndex, classes } = this.props

        const items = paginate(category.cases, pageSize, pageIndex)

        return items.map(({ slug, title, summary }) => {
            return (
                <Preview
                    key={slug}
                    className={classes.row}
                    title={title}
                    summary={summary}
                    link={href('/case/[slug]', slug)}
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
