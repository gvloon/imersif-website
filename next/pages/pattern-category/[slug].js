import { React, api, withStyles, createSelector } from 'common'
import { BasicPage } from 'components/page'
import { FilterList, PatternList } from 'components/patterns'

const styles = theme => ({
    patterns: {
        marginTop: '0.5rem'
    }
})

class Page extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedFilters: []
        }
    }

    render = () => {
        const { context, data, classes } = this.props
        const { name } = data.patternCategory
        const filters = getAvailableFilters(this.state, this.props)
        const patterns = getFilteredPatterns(this.state, this.props)
        return (
            <BasicPage context={context} title={name}>
                <h1>{name}</h1>
                <FilterList values={filters} onChange={this.onFilterChange} />
                <PatternList className={classes.patterns} patterns={patterns} />
            </BasicPage>
        )
    }

    onFilterChange = selected => {
        this.setState({ selectedFilters: selected })
    }
}

const getAvailableFilters = createSelector(
    (state, props) => props.data.patternCategory.patterns,
    patterns => {
        const map = {}
        patterns.forEach(pattern => {
            pattern.filters.forEach(filter => {
                map[filter.name] = true
            })
        })
        return Object.keys(map)
    }
)

const getPatterns = createSelector(
    (state, props) => props.data.patternCategory.patterns,
    patterns => {
        return patterns.map(pattern => {
            const item = Object.assign({}, pattern)
            item.filterMap = {}
            pattern.filters.forEach(filter => {
                item.filterMap[filter.name] = true
            })
            return item
        })
    }
)

const getFilteredPatterns = createSelector(
    getPatterns,
    (state, props) => state.selectedFilters,
    (patterns, filters) => {
        return patterns.filter(pattern => {
            if (filters.length === 0) {
                return true
            }
            for (const filter of filters) {
                if (pattern.filterMap.hasOwnProperty(filter)) {
                    return true
                }
            }
            return false
        })
    }
)

export const getStaticProps = async context => {
    const data = await api({
        patternCategory: {
            __aliasFor: 'patternCategoryBySlug',
            __args: { slug: context.params.slug },
            name: true,
            patterns: {
                title: true,
                slug: true,
                image: {
                    url: true
                },
                pros_and_cons: {
                    pros: {
                        text: true
                    },
                    cons: {
                        text: true
                    }
                },
                filters: {
                    name: true
                }
            }
        }
    })
    const props = {
        data,
        context: {
            ...context,
            section: 'patterns'
        }
    }
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const { patternCategories } = await api({
        patternCategories: {
            slug: true
        }
    })
    const paths = patternCategories.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: false }
}

export default withStyles(styles)(Page)
