import { React, api } from 'common'
import { Markdown, Specifications } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ device }) => {
    const { title, description } = device

    const context = {
        title,
        section: 'hardware',
        search: {
            desktop: 'hardware',
            mobile: null
        },
        breadcrumb: getBreadcrumb(device)
    }

    return (
        <BasicPage context={context}>
            <SpecificationList device={device} />
            <Markdown source={description} />
        </BasicPage>
    )
}

const getBreadcrumb = ({ title, slug, device_type }) => {
    if (device_type) {
        return [
            {
                name: 'Hardware',
                href: '/hardware'
            },
            {
                name: device_type.name,
                href: '/device-type/[slug]',
                as: `/device-type/${device_type.slug}`
            },
            {
                name: title,
                href: '/device/[slug]',
                as: `/device/${slug}`
            }
        ]
    } else {
        return [
            {
                name: 'Hardware',
                href: '/hardware'
            },
            {
                name: title,
                href: '/device/[slug]',
                as: `/device/${slug}`
            }
        ]
    }
}

const SpecificationList = ({ device }) => {
    const specs = [
        ['Type', 'device_type'],
        ['Display type', 'screen'],
        ['Tethering', 'tethering'],
        ['Tracking', 'tracking_type'],
        ['Degrees of freedom', 'dof'],
        ['Field of view', 'fov']
    ].map(spec => ({
        label: spec[0],
        value: device[spec[1]] ? device[spec[1]].name : null
    }))
    return <Specifications data={specs} />
}

export const getStaticProps = async context => {
    const [device] = await Promise.all([
        api.get(`/devices/${context.params.slug}`)
    ])
    const props = { device }
    return { props, revalidate: 1 }
}

export const getStaticPaths = async () => {
    const devices = await api.get(`/devices`)
    const paths = devices.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: false }
}

export default Page
