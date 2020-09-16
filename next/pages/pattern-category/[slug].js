import { React, api, withStyles, memoize, href } from 'common'
import { CheckboxList } from 'components'
import { BasicPage } from 'components/page'
import { PatternList } from 'components/patterns'

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
        const { patternCategory, classes } = this.props
        const { selectedFilters } = this.state
        const { slug, name, patterns } = patternCategory

        const context = {
            title: name,
            section: 'patterns',
            search: {
                desktop: 'patterns',
                mobile: null
            },
            breadcrumb: [
                {
                    name: 'Patterns',
                    href: '/patterns'
                },
                {
                    name: name,
                    href: ('/pattern-category/[slug]', slug)
                }
            ]
        }

        const filters = getAvailableFilters(patterns)
        const preparedPatterns = preparePatterns(patterns)
        const filteredPatterns = getFilteredPatterns(preparedPatterns, selectedFilters)
        return (
            <BasicPage context={context}>
                <CheckboxList title="With: " values={filters} onChange={this.onFilterChange} />
                <PatternList className={classes.patterns} patterns={filteredPatterns} />
            </BasicPage>
        )
    }

    onFilterChange = selected => {
        this.setState({ selectedFilters: selected })
    }
}

const getAvailableFilters = memoize(patterns => {
    const map = {}
    patterns.forEach(pattern => {
        pattern.filters.forEach(filter => {
            map[filter.name] = true
        })
    })
    return Object.keys(map)
})

const preparePatterns = memoize(patterns => {
    return patterns.map(pattern => {
        const item = Object.assign({}, pattern)
        item.filterMap = {}
        pattern.filters.forEach(filter => {
            item.filterMap[filter.name] = true
        })
        return item
    })
})

const getFilteredPatterns = memoize((patterns, filters) => {
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
})

export const getStaticProps = async context => {
    const [patternCategory] = await Promise.all([
        api.get(`/pattern-categories/${context.params.slug}`)
    ])
    const props = { patternCategory }
    return { props, revalidate: 1 }
}

export const getStaticPaths = async () => {
    const patternCategories = await api.get(`/pattern-categories`)
    const paths = patternCategories.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: false }
}

export default withStyles(styles)(Page)
