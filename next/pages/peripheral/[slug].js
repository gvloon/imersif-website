import { React, api, href } from 'common'
import { Markdown, Specifications } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ peripheral }) => {
    const { title, description } = peripheral

    const context = {
        title,
        section: 'hardware',
        search: {
            desktop: 'hardware',
            mobile: null
        },
        breadcrumb: getBreadcrumb(peripheral)
    }

    return (
        <BasicPage context={context}>
            <SpecificationList peripheral={peripheral} />
            <Markdown source={description} />
        </BasicPage>
    )
}

const getBreadcrumb = ({ title, slug, peripheral_type }) => {
    if (peripheral_type) {
        return [
            {
                name: 'Hardware',
                href: '/hardware'
            },
            {
                name: peripheral_type.name,
                href: href('/peripheral-type/[slug]', peripheral_type.slug)
            },
            {
                name: title,
                href: href('/peripheral/[slug]', slug)
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
                href: href('/peripheral/[slug]', slug)
            }
        ]
    }
}

const SpecificationList = ({ peripheral }) => {
    const specs = [
        spec('Type', peripheral.peripheral_type ? peripheral.peripheral_type.name : ''),
        spec('Url', url(peripheral.url))
    ]
    return <Specifications data={specs} />
}

const spec = (label, value) => ({ label, value })
const url = url => {
    if (!url)
        return ''
    return <a className="link" href={url} target="_blank">{url}</a>
}

export const getStaticProps = async context => {
    const [peripheral] = await Promise.all([
        api.get(`/peripherals/${context.params.slug}`)
    ])
    const props = { peripheral }
    return { props, revalidate: 1 }
}

export const getStaticPaths = async () => {
    const peripherals = await api.get(`/peripherals`)
    const paths = peripherals.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: true }
}

export default Page
