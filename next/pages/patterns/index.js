import { React, api } from 'common'
import { NestedColumnList, Markdown, Link } from 'components'
import { BasicPage } from 'components/page'

export const Page = ({ context, data }) => {
    const { title, image, introduction } = data.page
    return (
        <BasicPage context={context} title={title} image={image}>
            <h1>{title}</h1>
            <Markdown source={introduction} />
            <CategoryList categories={data.categories} />
        </BasicPage>
    )
}

const CategoryList = ({ categories }) => {
    const items = categories.map(category => ({
        value: category.name,
        children: category.children.map((category, index) => ({
            value: (
                <Link key={index} href="/pattern-category/[slug]" as={`/pattern-category/${category.slug}`}>
                    <a>{category.name}</a>
                </Link>
            ),
            children: category.children.map((category, index) => ({
                value: (
                    <Link key={index} href="/pattern-category/[slug]" as={`/pattern-category/${category.slug}`}>
                        <a>{category.name}</a>
                    </Link>
                )
            }))
        }))
    }))
    return <NestedColumnList items={items} />
}

export const getStaticProps = async context => {
    const data = await api({
        page: {
            __aliasFor: 'patternsPage',
            title: true,
            image: {
                url: true
            },
            introduction: true
        },
        categories: {
            __aliasFor: 'patternCategories',
            __args: {
                sort: 'name',
                where: {
                    parent_null: true
                }
            },
            name: true,
            children: {
                name: true,
                slug: true,
                children: {
                    name: true,
                    slug: true
                }
            }
        }
    })
    const props = {
        data,
        context: {
            ...context,
            section: 'patterns'
        }
    }
    return { props, revalidate: 1 }
}

export default Page
