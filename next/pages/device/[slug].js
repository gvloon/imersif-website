import { React, api } from 'common'
import { Markdown, Specifications } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ context, data }) => {
    const { title, description } = data.device

    return (
        <BasicPage context={context} title={title} breadcrumb={getBreadcrumb(data.device)}>
            <SpecificationList device={data.device} />
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
        ['Display type', 'device_screen'],
        ['Tethering', 'device_tethering'],
        ['Tracking', 'device_tracking_type'],
        ['Degrees of freedom', 'device_dof'],
        ['Field of view', 'device_fov']
    ].map(spec => ({
        label: spec[0],
        value: device[spec[1]] ? device[spec[1]].name : null
    }))
    return <Specifications data={specs} />
}

export const getStaticProps = async context => {
    const data = await api({
        device: {
            __aliasFor: 'deviceBySlug',
            __args: { slug: context.params.slug },
            slug: true,
            title: true,
            description: true,
            device_type: {
                slug: true,
                name: true
            },
            device_screen: {
                name: true
            },
            device_tethering: {
                name: true
            },
            device_tracking_type: {
                name: true
            },
            device_dof: {
                name: true
            }
        }
    })
    const props = {
        data,
        context: {
            ...context,
            section: 'hardware'
        }
    }
    return { props, revalidate: 1 }
}

export const getStaticPaths = async () => {
    const { devices } = await api({
        devices: {
            slug: true
        }
    })
    const paths = devices.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: false }
}

export default Page
