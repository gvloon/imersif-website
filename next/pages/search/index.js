import { React, withStyles, withRouter, _, LoaderContext, api } from 'common'
import config from 'config'
import { Pagination } from 'components'
import { BasicPage } from 'components/page'
import { SearchResult, MobileFilter, DesktopFilter, LoadMore } from 'components/search'
import url from 'url'

const styles = theme => ({
    search: {
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    },
    content: {
        width: '100%'
    },
    results: {
        flex: 1,
    },
    result: {
        marginTop: '1.2rem',
        '&:first-child': {
            marginTop: 0
        }
    },
    pagination: {
        marginTop: '3rem'
    }
})

const search = async (text, category, pageSize, pageIndex) => {
    const tmp = url.format({
        pathname: '/search',
        query: { text, category, pageSize, pageIndex }
    })
    return await api.get(tmp)
}

class Page extends React.Component
{
    static contextType = LoaderContext

    constructor(props) {
        super(props)
        this.state = {
            results: _.clone(props.search.results),
            pageIndex: props.search.pageIndex,
            mobile: false
        }
    }

    componentDidMount() {
        this.setState({
            mobile: typeof window !== 'undefined' && window.innerWidth < 480
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.search !== prevProps.search) {
            this.setState({
                results: _.clone(this.props.search.results),
                pageIndex: this.props.search.pageIndex
            })
        }
        if (snapshot !== null) {
            window.scrollTo(0, snapshot)
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevState.results.length < this.state.results.length) {
            return window.scrollY
        }
        return null
    }

    render = () => {
        const { search, classes } = this.props
        const { results } = this.state
        const { text, category, resultCount } = search

        const context = {
            title: `${resultCount} results for ${text}`,
            section: 'search',
            search: {
                desktop: category || null,
                mobile: category || null
            },
            breadcrumb: [
                {
                    name: 'Search',
                    href: '/search'
                }
            ]
        }

        const categoryObj = _.find(config.categories, current => current.value === category) || config.categories[0]
        return (
            <BasicPage context={context}>
                <div className={classes.search}>
                    <MobileFilter category={categoryObj} onChange={this.onChangeCategory} />
                    <DesktopFilter category={categoryObj} onChange={this.onChangeCategory} />
                    <div className={classes.content}>
                        <div className={classes.results}>
                            {
                                results.map((result, index) => <SearchResult key={index} className={classes.result} result={result} />)
                            }
                        </div>
                        {
                            this.renderPagination()
                        }
                    </div>
                </div>
            </BasicPage>
        )
    }

    renderPagination = () => {
        const { search, classes } = this.props
        const { pageCount } = search
        const { mobile, pageIndex } = this.state

        if (mobile) {
            return pageIndex < pageCount - 1 ? <LoadMore onClick={this.onLoadMore} /> : null
        } else {
            return <Pagination className={classes.pagination} pageCount={pageCount} pageIndex={pageIndex} onClick={this.onPagination} />
        }
    }

    onChangeCategory = category => {
        const { router, search } = this.props

        router.push(url.format({
            pathname: '/search',
            query: {
                q: search.text,
                c: category.value || undefined
            }
        }))
    }

    onPagination = async index => {
        const { text, category } = this.props.search
        const { setLoading } = this.context

        this.setState({
            pageIndex: index
        })
        setLoading(true)

        const data = await search(text, category, null, index)

        this.setState({
            results: data.results
        })
        setLoading(false)
    }

    onLoadMore = async () => {
        const { text, category } = this.props.search
        const { pageIndex } = this.state
        const { setLoading } = this.context

        setLoading(true)
        const data = await search(text, category, null, pageIndex+1)
        setLoading(false)
        if (this.state.pageIndex === pageIndex) {
            this.setState((state, props) => {
                if (state.pageIndex === pageIndex) {
                    return {
                        pageIndex: (pageIndex + 1),
                        results: _.concat(state.results, data.results),
                    }
                }
                return null
            })
        }
    }

}

export const getServerSideProps = async context => {
    const results = await search(context.query.q, context.query.c)
    return {
        props: { search: results }
    }
}

export default withStyles(styles)(withRouter(Page))
