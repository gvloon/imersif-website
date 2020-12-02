import { React, api, href } from 'common'
import { Markdown, Specifications } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ device }) => {
    if (!device)
        return null

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
            <SpecificationList className="block" device={device} />
            <div className="block">
                <Markdown source={description} />
            </div>
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
                href: href('/device-type/[slug]', device_type.slug)
            },
            {
                name: title,
                href: href('/device/[slug]', slug)
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
                href: href('/device/[slug]', slug)
            }
        ]
    }
}

const SpecificationList = ({ device, className }) => {
    const specs = [
        spec('Type', device.device_type ? device.device_type.name : ''),
        spec('Tethering', device.tethering || ''),
        spec('Display type', device.display || ''),
        spec('Resolution', device.resolution || ''),
        spec('Degrees of freedom', device.dof || ''),
        spec('Field of view', device.fov || ''),
        spec('Tracking type', device.tracking_type || ''),
        spec('Url', url(device.url))
    ]
    return <Specifications className={className} data={specs} />
}

const spec = (label, value) => ({ label, value })
const url = url => {
    if (!url)
        return ''
    return <a className="link" href={url} target="_blank">{url}</a>
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
    return { paths, fallback: true }
}

export default Page
