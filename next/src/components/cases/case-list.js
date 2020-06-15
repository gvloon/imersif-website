import { React, PropTypes, classNames, paginate, getStyle, makeStyles } from 'common'
import { Link, PaginatedList, Preview } from 'components'
import { color } from 'jss/index'

const useStyles = makeStyles(theme => ({
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
}))

const CaseList = ({ category, title, pageSize, pageIndex, ...rest }) => {
    if (!category || !category.cases || !category.cases.length) {
        return null
    }

    const classes = useStyles()
    const pageCount = Math.ceil(category.cases.length / pageSize)
    const renderRow = ({ slug, title, summary }) => (
        <Preview
            key={slug}
            className={classes.row}
            title={title}
            summary={summary}
            href="/cases/[slug]"
            as={`/cases/${slug}`}
        />
    )
    const renderNav = ({ text, index, disabled }) => {
        const className = classNames({
            [classes.disabled]: disabled === true
        })
        return (
            <Link href="/case-categories/[slug]/[index]" as={`/case-categories/${category.slug}/${index}`}>
                <a className={className}>{text}</a>
            </Link>
        )
    }
    return (
        <div style={getStyle(rest)}>
            {
                title &&
                <h2>{title}</h2>
            }
            <PaginatedList
                className={classes.list}
                data={paginate(category.cases, pageSize, pageIndex)}
                renderRow={renderRow}
                renderNav={renderNav}
                pageIndex={pageIndex}
                pageCount={pageCount}
            />
        </div>
    )
}

CaseList.defaultProps = {
    pageSize: 10
}

CaseList.propTypes = {
    category: PropTypes.object,
    pageSize: PropTypes.number,
    pageIndex: PropTypes.number
}

export default CaseList
