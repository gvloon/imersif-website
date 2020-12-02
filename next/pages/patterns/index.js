import { React, api, href } from 'common'
import { NestedColumnList, DynamicZone, Link } from 'components'
import { BasicPage } from 'components/page'

export const Page = ({ page, categories }) => {
    const { title, image, content } = page

    const context = {
        title,
        section: 'patterns',
        search: {
            desktop: 'patterns',
            mobile: null
        },
        breadcrumb: [
            {
                name: 'Patterns',
                href: '/patterns'
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

const CategoryList = ({ categories, className }) => {
    const items = categories.map(category => ({
        value: category.name,
        children: category.children.map((category, index) => ({
            value: (
                <Link key={index} href={href('/pattern-category/[slug]', category.slug)}>
                    <a>{category.name}</a>
                </Link>
            ),
            children: category.children.map((category, index) => ({
                value: (
                    <Link key={index} href={href('/pattern-category/[slug]', category.slug)}>
                        <a>{category.name}</a>
                    </Link>
                )
            }))
        }))
    }))
    return <NestedColumnList className={className} items={items} />
}

export const getStaticProps = async context => {
    const [page, categories] = await Promise.all([
        api.get('/patterns-page'),
        api.get('/pattern-categories?parent_null=true&_sort=name:ASC')
    ])
    const props = { page, categories }
    return { props, revalidate: 1 }
}

export default Page
