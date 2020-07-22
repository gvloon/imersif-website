import { React, pageApi, api, PagePropTypes } from 'common'
import { Link, PageRenderer } from 'components'

const Page = ({ page, context, data }) => {
    context = {
        ...context,
        section: 'hardware'
    }
    const strings = {
        Name: data.deviceType.name
    }
    const components = {
        Devices: () => getDevices(data)
    }
    return <PageRenderer context={context} page={page} components={components} strings={strings} />
}

Page.propTypes = PagePropTypes

const getDevices = ({ deviceType }) => (
    <ul>
        {
            deviceType.devices.map(({ slug, title }, key) => (
                <li key={key}>
                    <Link href="/device/[slug]" as={`/device/${slug}`}>
                        <a>{title}</a>
                    </Link>
                </li>
            ))
        }
    </ul>
)

export const getStaticProps = async context => {
    const props = await pageApi('Device_type', context, {
        deviceType: {
            __aliasFor: 'deviceTypeBySlug',
            __args: {
                slug: context.params.slug
            },
            name: true,
            devices: {
                slug: true,
                title: true
            }
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const { deviceTypes } = await api({
        deviceTypes: {
            slug: true
        }
    })
    const paths = deviceTypes.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: false }
}

export default Page
