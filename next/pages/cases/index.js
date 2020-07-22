import { React, pageApi, PagePropTypes } from 'common'
import { CategoryList, PageRenderer } from 'components'
import Link from 'next/link'

const Page = ({ page, context, data }) => {
    context = {
        ...context,
        section: 'cases'
    }
    const categories = data.categories.map((category, index) =>
        <Link key={index} href="/case-categories/[slug]/[index]" as={`/case-categories/${category.slug}/0`}>
            <a>{category.title}</a>
        </Link>
    )
    const components = {
        Categories: props => <CategoryList {...props} categories={categories} />
    }
    return <PageRenderer context={context} page={page} components={components} />
}

Page.propTypes = PagePropTypes

export const getStaticProps = async context => {
    const props = await pageApi('Cases', context, {
        categories: {
            __aliasFor: 'caseCategories',
            __args: {
                sort: 'title',
                where: {
                    parent_null: true
                }
            },
            slug: true,
            title: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export default Page
