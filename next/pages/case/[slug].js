import { React, api } from 'common'
import { Markdown, Breadcrumb } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ context, data }) => {
    const { slug, title, summary, description, categories } = data.case

    const category = categories[0]
    const breadcrumb = [
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

    return (
        <BasicPage context={context} title={title} breadcrumb={breadcrumb}>
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
            slug: true,
            title: true,
            summary: true,
            description: true,
            categories: {
                title: true,
                slug: true
            }
        }
    })
    const props = {
        data,
        context: {
            ...context,
            section: 'cases'
        }
    }
    return { props, revalidate: 1 }
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
