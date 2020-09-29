import { React, api, validate, href, withStyles, debug } from 'common'
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
        const { deviceType } = this.props
        if (!deviceType)
            return null

        const { slug, name } = deviceType

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
                    href: href('/device-type/[slug]', slug)
                }
            ]
        }

        return (
            <BasicPage context={context}>
                { this.renderDeviceList() }
                { this.renderPagination() }
            </BasicPage>
        )

    }

    renderDeviceList = () => {
        const { devices, params } = this.props

        const columns = [
            {
                id: 'title',
                label: 'Title',
                sort: params.sort === 'title' ? params.direction : null,
                render: device => device.title || '-',
                link:  this.getLink({ s: 'title' }),
                alignment: 'left'
            },
            {
                id: 'tethering',
                label: 'Tethered',
                sort: params.sort === 'tethering' ? params.direction : null,
                render: device => device.tethering || '-',
                link: this.getLink({ s: 'tethering' })
            },
            {
                id: 'display',
                label: 'Display type',
                sort: params.sort === 'display' ? params.direction : null,
                render: device => device.display || '-',
                link: this.getLink({ s: 'display' }),
                responsive: 'xs'
            },
            {
                id: 'fov',
                label: 'Field of view',
                sort: params.sort === 'fov' ? params.direction : null,
                render: device => device.fov || '-',
                link: this.getLink({ s: 'fov' })
            },
            {
                id: 'resolution',
                label: 'Resolution',
                sort: params.sort === 'resolution' ? params.direction : null,
                render: device => device.resolution || '-',
                link: this.getLink({ s: 'resolution' }),
                responsive: 'sm'
            }
        ]
        return (
            <Table
                columns={columns}
                items={devices}
                getLink={this.getDeviceLink}
            />
        )
    }

    renderPagination = () => {
        const { deviceType, params, classes } = this.props
        const pageCount = Math.ceil(deviceType.deviceCount / params.pageSize )
        return (
            <Pagination
                className={classes.pagination}
                pageIndex={params.pageIndex}
                pageCount={pageCount}
                getLink={index => this.getLink({ p: index })}
            />
        )
    }

    getLink = q => {
        const { deviceType, params  } = this.props
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
            delete query.p
        }
        if (query.s === 'title') {
            delete query.s
        }
        delete query.slug
        const tmp = url.format({
            pathname: '/device-type/[slug]',
            query
        })
        return href(tmp, deviceType.slug)
    }

    getDeviceLink = device => {
        return href('/device/[slug]', device.slug)
    }
}

export const getServerSideProps = async context => {
    const params = {
        pageIndex: validate.number(context.query.p, 0),
        pageSize: validate.number(context.query.c, 20),
        sort: validate.text(context.query.s, 'title'),
        direction: validate.map(context.query.d, { asc: 'asc', desc: 'desc' }, 'asc')
    }
    const deviceType = await api.get(`/device-types/${context.params.slug}`)
    const devices = await api.get(`/devices?device_type=${deviceType.id}&_start=${params.pageIndex * params.pageSize}&_limit=${params.pageSize}&_sort=${params.sort}:${params.direction}`)

    const props = { deviceType, devices, query: context.query, params  }
    return { props }
}
//
// export const getStaticPaths = async () => {
//     const deviceTypes = await api.get(`/device-types`)
//     const paths = deviceTypes.map(({ slug }) => ({
//         params: { slug }
//     }))
//     return { paths, fallback: false }
// }

export default withStyles(styles)(Page)
