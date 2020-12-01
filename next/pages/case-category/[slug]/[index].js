import { React, api, href } from 'common'
import { Markdown } from 'components'
import { BasicPage } from 'components/page'
import { CaseList } from 'components/cases'

const pageSize = 10

const Page = ({ category, pageIndex }) => {
    if (!category)
        return null

    const { slug, title, description } = category

    const context = {
        title,
        section: 'cases',
        search: {
            desktop: 'cases',
            mobile: null
        },
        breadcrumb: [
            {
                name: 'Cases',
                href: '/cases'
            },
            {
                name: title,
                href: href('/case/[slug]', slug)
            }
        ]
    }

    return (
        <BasicPage context={context}>
            <Markdown source={description} />
            <CaseList
                category={category}
                pageSize={pageSize}
                pageIndex={pageIndex}
            />
        </BasicPage>
    )
}

export const getStaticProps = async context => {
    const [category] = await Promise.all([
        api.get(`/case-categories/${context.params.slug}`)
    ])
    const props = {
        category,
        pageIndex: parseInt(context.params.index)
    }
    return { props, revalidate: 1 }
}

export const getStaticPaths = async () => {
    const categories = await api.get(`/case-categories`)
    const paths = []
    categories.forEach(({ slug, caseCount }) => {
        const pageCount = Math.ceil(caseCount / pageSize) || 1
        for (let index = 0; index < pageCount; index++) {
            paths.push({ params: { slug, index: index.toString() } })
        }
    })
    return { paths, fallback: true }
}

export default Page
