import { React, api } from 'common'
import { Markdown, CaseList, CategoryList, Link } from 'components'
import { BasicPage } from 'components/page'

const pageSize = 10

const Page = ({ category, pageIndex }) => {
    const { slug, title, description, children } = category

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
                href: '/case/[slug]',
                as: `/cases/${slug}`
            }
        ]
    }

    return (
        <BasicPage context={context}>
            <Markdown source={description} />
            <Categories categories={children} />
            <CaseList
                category={category}
                pageSize={pageSize}
                pageIndex={pageIndex}
            />
        </BasicPage>
    )
}

const Categories = ({ categories }) => {
    const items = categories.map((child, index) => (
        <Link key={index} href="/case-categories/[slug]/[index]" as={`/case-categories/${child.slug}/0`}>
            <a>{child.title}</a>
        </Link>
    ))
    return <CategoryList categories={items} />
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
        const pageCount = Math.ceil(caseCount / pageSize)
        for (let index = 0; index < pageCount; index++) {
            paths.push({ params: { slug, index: index.toString() } })
        }
    })
    return { paths, fallback: false }
}

export default Page
