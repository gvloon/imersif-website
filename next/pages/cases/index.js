import { React, api, inspect } from 'common'
import { Markdown, Link, NestedColumnList } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ context, data }) => {
    const { title, image, introduction } = data.page

    const breadcrumb = [
        {
            name: 'Cases',
            href: '/cases'
        }
    ]
    return (
        <BasicPage context={context} title={title} image={image} breadcrumb={breadcrumb}>
            <Markdown source={introduction} />
            <CategoryList categories={data.categories} />
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
    const data = await api({
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
    const props = {
        data,
        context: {
            ...context,
            section: 'cases'
        }
    }
    return { props, revalidate: 1 }
}

export default Page
