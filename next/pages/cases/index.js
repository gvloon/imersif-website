import { React, api, href } from 'common'
import { DynamicZone, Link, NestedColumnList } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ page, categories }) => {
    const { title, image, content } = page

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
            <DynamicZone className="block" content={content} />
            <CategoryList className="block" categories={categories} />
        </BasicPage>
    )
}

const CategoryList = ({ className, categories }) => {
    const items = categories.map((category, index) => ({
        value: category.title,
        children: category.children.map((child, index) => ({
            value: (
                <Link key={index} href={href("/case-category/[slug]/[index]", child.slug, 0)}>
                    <a>{child.title}</a>
                </Link>
            )
        }))
    }))
    return <NestedColumnList className={className} items={items} />
}

export const getStaticProps = async context => {
    const [page, categories] = await Promise.all([
        api.get(`/cases-page`),
        api.get('/case-categories?parent_null=true&_sort=title:ASC')
    ])
    const props = { page, categories }
    return { props, revalidate: 1 }
}

export default Page
