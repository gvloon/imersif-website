import { React, PagePropTypes, api, pageApi } from 'common'
import { Markdown, PageRenderer } from 'components'

const Page = ({ page, context, data }) => {
    const { title, description } = data.tool

    context = {
        ...context,
        section: 'tools'
    }
    const strings = {
        Title: title
    }
    const components = {
        Description: () => <Markdown source={description} strings={strings} />
    }
    return <PageRenderer context={context} page={page} strings={strings} components={components} />
}

Page.propTypes = PagePropTypes

export const getStaticProps = async context => {
    const props = await pageApi('Tool', context, {
        tool: {
            __aliasFor: 'toolBySlug',
            __args: { slug: context.params.slug },
            title: true,
            description: true
        }
    })
    return { props, unstable_revalidate: 1 }
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
