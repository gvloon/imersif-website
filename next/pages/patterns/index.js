import { React, PagePropTypes, pageApi } from 'common'
import { PageRenderer, NestedColumnList } from 'components'
import Link from 'next/link'

export const Page = ({ page, context, data }) => {
    context = {
        ...context,
        section: 'patterns'
    }
    const components = {
        Categories: () => getCategories(data)
    }
    return <PageRenderer context={context} page={page} components={components} />
}

Page.propTypes = PagePropTypes

const getCategories = ({ categories }) => {
    const items = categories.map(category => ({
        value: category.name,
        children: category.children.map((category, index) => {
            return {
                value: (
                    <Link key={index} href="/pattern-category/[slug]" as={`/pattern-category/${category.slug}`}>
                        <a>{category.name}</a>
                    </Link>
                ),
                children: category.children.map((category, index) => (
                    {
                        value: (
                            <Link key={index} href="/pattern-category/[slug]" as={`/pattern-category/${category.slug}`}>
                                <a>{category.name}</a>
                            </Link>
                        )
                    }
                ))
            }
        })
    }))
    return <NestedColumnList items={items} />
}

export const getStaticProps = async context => {
    const props = await pageApi('Patterns', context, {
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
    return { props, unstable_revalidate: 1 }
}

export default Page
