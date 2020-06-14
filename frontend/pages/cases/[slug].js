import { React, api, pageApi, PagePropTypes } from 'common'
import { Markdown, PageRenderer } from 'components'

const Page = ({ page, context, data }) => {
    const { title, summary, description } = data.case
    context = {
        ...context,
        section: 'cases'
    }
    const strings = {
        Title: title
    }
    const components = {
        Summary: () => <div>{summary}</div>,
        Description: () => <Markdown source={description} strings={strings} />
    }
    return <PageRenderer context={context} page={page} strings={strings} components={components} />
}

Page.propTypes = PagePropTypes

export const getStaticProps = async context => {
    const props = await pageApi('Case', context, {
        case: {
            __aliasFor: 'caseBySlug',
            __args: { slug: context.params.slug },
            title: true,
            summary: true,
            description: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const { cases } = await api({
        cases: {
            slug: true
        }
    })
    const paths = cases.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: false }
}

export default Page
