import { React, api } from 'common'
import { Markdown } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ context, data }) => {
    const { slug, title, description } = data.tool

    const breadcrumb = [
        {
            name: 'Software',
            href: '/software'
        },
        {
            name: title,
            href: '/software/[slug]',
            as: `/software/${slug}`
        }
    ]
    return (
        <BasicPage context={context} title={title} breadcrumb={breadcrumb}>
            <Markdown source={description} />
        </BasicPage>
    )
}

export const getStaticProps = async context => {
    const data = await api({
        tool: {
            __aliasFor: 'toolBySlug',
            __args: { slug: context.params.slug },
            slug: true,
            title: true,
            description: true
        }
    })
    const props = {
        data,
        context: {
            ...context,
            section: 'software'
        }
    }
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
