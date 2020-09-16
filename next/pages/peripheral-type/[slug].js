import { React, api, validate, href, withStyles, label } from 'common'
import { Table, Pagination } from 'components'
import { BasicPage } from 'components/page'
import url from 'url'

const styles = theme => ({
    pagination: {
        marginTop: '1rem'
    }
})

class Page extends React.Component {

    render () {
        const { peripheralType } = this.props
        const { slug, name } = peripheralType

        const context = {
            title: name,
            section: 'hardware',
            search: {
                desktop: 'hardware',
                mobile: null
            },
            breadcrumb: [
                {
                    name: 'Hardware',
                    href: '/hardware'
                },
                {
                    name: name,
                    href: href('/peripheral-type/[slug]', slug)
                }
            ]
        }

        return (
            <BasicPage context={context}>
                { this.renderPeripheralList() }
                { this.renderPagination() }
            </BasicPage>
        )

    }

    renderPeripheralList = () => {
        const { peripherals, params } = this.props

        const columns = [
            {
                id: 'title',
                label: 'Title',
                sort: params.sort === 'title' ? params.direction : null,
                render: peripheral => peripheral.title || '-',
                link:  this.getLink({ s: 'title' }),
                alignment: 'left'
            }
        ]
        return (
            <Table
                columns={columns}
                items={peripherals}
                getLink={this.getPeripheralLink}
            />
        )
    }

    renderPagination = () => {
        const { peripheralType, params, classes } = this.props
        const pageCount = Math.ceil(peripheralType.peripheralCount / params.pageSize )
        return (
            <Pagination
                className={classes.pagination}
                pageIndex={params.pageIndex}
                pageCount={pageCount}
                getLink={index => this.getLink({ i: index })}
            />
        )
    }

    getLink = q => {
        const { peripheralType, params  } = this.props
        const query = Object.assign({}, this.props.query, q)
        if (q.s) {
            if (q.s === params.sort) {
                if (params.direction === 'asc') {
                    query.d = 'desc'
                } else {
                    delete query.d
                }
            } else {
                delete query.d
            }
        }
        delete query.slug
        const tmp = url.format({
            pathname: '/peripheral-type/[slug]',
            query
        })
        return href(tmp, peripheralType.slug)
    }

    getPeripheralLink = peripheral => {
        return href('/peripheral/[slug]', peripheral.slug)
    }
}

export const getServerSideProps = async context => {
    const params = {
        slug: validate.text(context.params.slug, null),
        pageIndex: validate.number(context.query.i, 0),
        pageSize: validate.number(context.query.c, 10),
        sort: validate.text(context.query.s, 'title'),
        direction: validate.map(context.query.d, { asc: 'asc', desc: 'desc' }, 'asc')
    }
    const peripheralType = await api.get(`/peripheral-types/${params.slug}`)
    const peripherals = await api.get(`/peripherals?peripheral_type=${peripheralType.id}&_start=${params.pageIndex * params.pageSize}&_limit=${params.pageSize}&_sort=${params.sort}:${params.direction}`)

    const props = { peripheralType, peripherals, query: context.query, params  }
    return { props }
}

export default withStyles(styles)(Page)
