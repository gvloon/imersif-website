import { React, api } from 'common'
import { Link } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ context, data }) => {
    const { name, devices } = data.deviceType
    return (
        <BasicPage context={context} title={name} >
            <h1>{name}</h1>
            <DeviceList devices={devices} />
        </BasicPage>
    )
}

const DeviceList = ({ devices }) => (
    <ul>
        {
            devices.map(({ slug, title }, key) => (
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
    const data = await api({
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
    const props = {
        data,
        context: {
            ...context,
            section: 'hardware'
        }
    }
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
