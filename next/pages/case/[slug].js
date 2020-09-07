import { React, api } from 'common'
import { Markdown } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ case: useCase }) => {
    const { title, summary, description } = useCase

    const context = {
        title,
        section: 'cases',
        search: {
            desktop: 'cases',
            mobile: null
        },
        breadcrumb: getBreadcrumb(useCase)
    }

    return (
        <BasicPage context={context}>
            <div>{summary}</div>
            <Markdown source={description} />
        </BasicPage>
    )
}

const getBreadcrumb = ({ slug, title, category }) => {
    if (category) {
        return [
            {
                name: 'Cases',
                href: '/cases'
            },
            {
                name: category.title,
                href: '/case-category/[slug]/[index]',
                as: `/case-category/${category.slug}/0`
            },
            {
                name: title,
                href: '/cases/[slug]',
                as: `/cases/${slug}`
            }
        ]
    } else {
        return [
            {
                name: 'Cases',
                href: '/cases'
            },
            {
                name: title,
                href: '/cases/[slug]',
                as: `/cases/${slug}`
            }
        ]
    }
}

export const getStaticProps = async context => {
    const [useCase] = await Promise.all([
        api.get(`/cases/${context.params.slug}`)
    ])
    const props = {
        case: useCase
    }
    return { props, revalidate: 1 }
}

export const getStaticPaths = async () => {
    const cases = await api.get(`/cases`)
    const paths = cases.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: false }
}

export default Page
