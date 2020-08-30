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
    const props = await api({
        tool: {
            __aliasFor: 'toolBySlug',
            __args: { slug: context.params.slug },
            slug: true,
            title: true,
            description: true
        }
    })
    return { props, revalidate: 1 }
}

export const getStaticPaths = async () => {
    const { tools } = await api({
        tools: {
            slug: true
        }
    })
    const paths = tools.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: false }
}

export default Page
