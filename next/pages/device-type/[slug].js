import { React, api } from 'common'
import { Link } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ deviceType }) => {
    const { slug, name, devices } = deviceType

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
                href: '/device-type/[slug]',
                as: `/device-type/${slug}`
            }
        ]
    }

    return (
        <BasicPage context={context}>
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
    const [deviceType] = await Promise.all([
        api.get(`/device-types/${context.params.slug}`)
    ])
    const props = { deviceType }
    return { props, revalidate: 1 }
}

export const getStaticPaths = async () => {
    const deviceTypes = await api.get(`/device-types`)
    const paths = deviceTypes.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: false }
}

export default Page
