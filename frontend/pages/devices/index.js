import { React, pageApi, PagePropTypes } from 'common'
import { Link, PageRenderer } from 'components'

const Page = ({ page, context, data }) => {
    context = {
        ...context,
        section: 'devices'
    }
    const components = {
        Devices: () => getDevices(data)
    }
    return <PageRenderer context={context} page={page} components={components} />
}

Page.propTypes = PagePropTypes

const getDevices = ({ devices }) => (
    <ul>
        {
            devices.map(({ slug, title }, key) => (
                <li key={key}>
                    <Link href="/devices/[slug]" as={`/devices/${slug}`}>
                        <a>{title}</a>
                    </Link>
                </li>
            ))
        }
    </ul>
)

export const getStaticProps = async context => {
    const props = await pageApi('Devices', context, {
        devices: {
            slug: true,
            title: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export default Page
