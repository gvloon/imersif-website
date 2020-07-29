import { React, api } from 'common'
import { Markdown, CaseList, CategoryList, Link} from 'components'
import { BasicPage } from 'components/page'

const pageSize = 10

const Page = ({ context, data }) => {
    const { title, description } = data.category
    return (
        <BasicPage context={context} title={title}>
            <h1>{title}</h1>
            <Markdown source={description} />
            <Categories categories={data.category.children} />
            <CaseList
                category={data.category}
                pageSize={pageSize}
                pageIndex={parseInt(context.params.index)}
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
    const data = await api({
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
