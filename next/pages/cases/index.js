import { React, api, inspect } from 'common'
import { Markdown, Link, NestedColumnList } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ page, categories }) => {
    const { title, image, introduction } = page

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
            }
        ]
    }

    return (
        <BasicPage context={context} image={image}>
            <Markdown source={introduction} />
            <CategoryList categories={categories} />
        </BasicPage>
    )
}

const CategoryList = ({ categories }) => {
    const items = categories.map((category, index) => ({
        value: category.title,
        children: category.children.map((child, index) => ({
            value: (
                <Link key={index} href="/case-category/[slug]/[index]" as={`/case-category/${child.slug}/0`}>
                    <a>{child.title}</a>
                </Link>
            )
        }))
    }))
    return <NestedColumnList items={items} />
}

export const getStaticProps = async context => {
    const props = await api({
        page: {
            __aliasFor: 'casesPage',
            title: true,
            image: {
                url: true
            },
            introduction: true
        },
        categories: {
            __aliasFor: 'caseCategories',
            __args: {
                sort: 'title',
                where: {
                    parent_null: true
                }
            },
            slug: true,
            title: true,
            children: {
                title: true,
                slug: true
            }
        }
    })
    return { props, revalidate: 1 }
}

export default Page
