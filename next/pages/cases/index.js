import { React, api } from 'common'
import { CategoryList, Markdown, Link } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ context, data }) => {
    const { title, image, introduction } = data.page

    return (
        <BasicPage context={context} title={title} image={image}>
            <h1>{title}</h1>
            <Markdown source={introduction} />
            <Categories categories={data.categories} />
        </BasicPage>
    )
}

const Categories = ({ categories }) => {
    const items = categories.map((category, index) =>
        <Link key={index} href="/case-categories/[slug]/[index]" as={`/case-categories/${category.slug}/0`}>
            <a>{category.title}</a>
        </Link>
    )
    return <CategoryList categories={items} />
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
            title: true
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
