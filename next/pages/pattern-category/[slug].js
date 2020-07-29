import { React, api, withStyles } from 'common'
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
        const metaData = this.getMetaData()
        const filteredPatterns = this.getFilteredPatterns(metaData.patterns)
        return (
            <BasicPage context={context} title={name}>
                <h1>{name}</h1>
                <FilterList values={metaData.filters} onChange={this.onFilterChange} />
                <PatternList className={classes.patterns} patterns={filteredPatterns} />
            </BasicPage>
        )
    }

    getMetaData = () => {
        const filters = {}
        const patterns = []
        this.props.data.patternCategory.patterns.forEach(pattern => {
            const item = {
                pattern,
                filters: {}
            }
            pattern.filters.forEach(filter => {
                filters[filter.name] = true
                item.filters[filter.name] = true
            })
            patterns.push(item)
        })

        return {
            filters: Object.keys(filters),
            patterns
        }
    }

    getFilteredPatterns = (patternsInfo) => {
        const result = []
        patternsInfo.forEach(info => {
            if (this.filtersMatches(info.filters)) {
                result.push(info.pattern)
            }
        })
        return result
    }

    filtersMatches = filterMap => {
        if (this.state.selectedFilters.length === 0) {
            return true
        }
        for (const filter of this.state.selectedFilters) {
            if (filterMap.hasOwnProperty(filter)) {
                return true
            }
        }
        return false
    }

    onFilterChange = (selected) => {
        this.setState({ selectedFilters: selected })
    }
}

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
