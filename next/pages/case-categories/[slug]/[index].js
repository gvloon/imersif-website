import { React, api, pageApi, getStyle, PagePropTypes } from 'common'
import { Markdown, PageRenderer, CaseList, CategoryList } from 'components'
import Link from 'next/link'

const pageSize = 10

const Page = ({ page, context, data }) => {
    const { title, description } = data.category
    context = {
        ...context,
        section: 'cases'
    }
    const strings = {
        Title: title
    }
    const categories = data.category.children.map((child, index) => (
        <Link key={index} href="/case-categories/[slug]/[index]" as={`/case-categories/${child.slug}/0`}>
            <a>{child.title}</a>
        </Link>
    ))
    const components = {
        Description: props => <Markdown style={getStyle(props)} source={description} strings={strings} />,
        Categories: props => <CategoryList {...props} categories={categories} />,
        Cases: props => (
            <CaseList
                {...props}
                category={data.category}
                pageSize={pageSize}
                pageIndex={parseInt(context.params.index)}
            />
        )
    }
    return <PageRenderer context={context} page={page} strings={strings} components={components} />
}

Page.propTypes = PagePropTypes

export const getStaticProps = async context => {
    const props = await pageApi('Cases_Category', context, {
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
