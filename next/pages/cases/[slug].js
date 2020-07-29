import { React, api } from 'common'
import { Markdown } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ context, data }) => {
    const { title, summary, description } = data.case
    return (
        <BasicPage context={context} title={title}>
            <h1>{title}</h1>
            <div>{summary}</div>
            <Markdown source={description} />
        </BasicPage>
    )
}

export const getStaticProps = async context => {
    const data = await api({
        case: {
            __aliasFor: 'caseBySlug',
            __args: { slug: context.params.slug },
            title: true,
            summary: true,
            description: true
        }
    })
    const props = {
        data,
        context: {
            ...context,
            section: 'cases'
        }
    }
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
