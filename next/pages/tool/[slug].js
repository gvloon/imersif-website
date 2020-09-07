import { React, api } from 'common'
import { Markdown } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ tool }) => {
    const { slug, title, description } = tool

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
                href: '/tool/[slug]',
                as: `/tool/${slug}`
            }
        ]
    }

    return (
        <BasicPage context={context}>
            <Markdown source={description} />
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
    return { paths, fallback: false }
}

export default Page
