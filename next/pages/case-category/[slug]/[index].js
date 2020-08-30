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
    const props = await api({
        category: {
            __aliasFor: 'caseCategoryBySlug',
            __args: { slug: context.params.slug },
            slug: true,
            title: true,
            description: true,
            children: {
                slug: true,
                title: true
            },
            cases: {
                slug: true,
                title: true,
                summary: true
            }
        }
    })
    props.pageIndex = parseInt(context.params.index)
    return { props, revalidate: 1 }
}

export const getStaticPaths = async () => {
    const { caseCategories } = await api({
        caseCategories: {
            slug: true,
            cases: {
                slug: true
            }
        }
    })
    const paths = []
    caseCategories.forEach(({ slug, cases }) => {
        const pageCount = Math.ceil(cases.length / pageSize)
        for (let index = 0; index < pageCount; index++) {
            paths.push({ params: { slug, index: index.toString() } })
        }
    })
    return { paths, fallback: false }
}

export default Page
