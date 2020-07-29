import { useTheme } from '@material-ui/core/styles'
import { Grid, useMediaQuery } from '@material-ui/core'
import { paginate, React, PropTypes, makeStyles, classNames } from 'common'

const useStyles = makeStyles(theme => ({
    categoryList: {
        marginTop: '1rem'
    }
}))

const CategoryList = ({ categories, title, className }) => {
    if (!categories || !categories.length) {
        return null
    }
    const classes = useStyles()
    const rootClasses = classNames({
        [className]: !!className,
        [classes.categoryList]: true
    })
    const theme = useTheme()
    const lg = useMediaQuery(theme.breakpoints.up('lg'))
    const md = useMediaQuery(theme.breakpoints.up('md'))
    return (
        <div className={rootClasses}>
            {
                title &&
                <h2>{title}</h2>
            }
            <Grid container>
                {
                    lg ? getColumns(categories, 3)
                        : md ? getColumns(categories, 2)
                            : getColumns(categories, 1)
                }
            </Grid>
        </div>
    )
}

CategoryList.propTypes = {
    categories: PropTypes.array,
    title: PropTypes.string
}

const getColumns = (data, count) => {
    const pageSize = Math.ceil(data.length / count)
    const columns = []
    for (let i = 0; i < count; i++) {
        columns[i] = getColumn(data, pageSize, i)
    }
    return columns
}

const getColumn = (data, count, index) => {
    data = paginate(data, count, index)
    return (
        <Grid key={index} item container xs={12} md={6} lg={4} direction="column">
            {
                data.map((component, key) => (
                    <Grid key={key} item>
                        { component }
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default CategoryList
