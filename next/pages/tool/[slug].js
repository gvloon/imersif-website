import { React, api, href } from 'common'
import { DynamicZone } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ tool }) => {
    if (!tool)
        return null

    const { slug, title, content } = tool

    const context = {
        title,
        section: 'software',
        search: {
            desktop: 'software',
            mobile: null
        },
        breadcrumb: [
            {
                name: 'Software',
                href: '/software'
            },
            {
                name: title,
                href: href('/tool/[slug]', slug)
            }
        ]
    }

    return (
        <BasicPage context={context}>
            <DynamicZone className="block" content={content} />
        </BasicPage>
    )
}

export const getStaticProps = async context => {
    const [tool] = await Promise.all([
        api.get(`/tools/${context.params.slug}`)
    ])
    return { props: { tool }, revalidate: 1 }
}

export const getStaticPaths = async () => {
    const tools = await api.get('/tools')
    const paths = tools.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: true }
}

export default Page
