import { React, api, pageApi, PagePropTypes } from 'common'
import { Markdown, PageRenderer } from 'components'

export const Page = ({ page, context, data }) => {
    const { title, description } = data.pattern

    context = {
        ...context,
        section: 'patterns'
    }
    const strings = {
        Title: title
    }
    const components = {
        Description: () => <Markdown source={description} strings={strings} />
    }
    return <PageRenderer context={context} page={page} strings={strings} components={components} />
}

Page.PropTypes = PagePropTypes

export const getStaticProps = async context => {
    const props = await pageApi('Pattern', context, {
        pattern: {
            __aliasFor: 'patternBySlug',
            __args: { slug: context.params.slug },
            title: true,
            description: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const { patterns } = await api({
        patterns: {
            slug: true
        }
    })
    const paths = patterns.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: false }
}

export default Page
