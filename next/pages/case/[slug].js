import { React, api, href } from 'common'
import { BasicPage } from 'components/page'
import { DynamicZone } from 'components'
import { CaseSpecs } from 'components/cases'

const Page = ({ case: useCase }) => {
    if (!useCase)
        return null

    const { title, content } = useCase

    const context = {
        title,
        section: 'cases',
        search: {
            desktop: 'cases',
            mobile: null
        },
        breadcrumb: getBreadcrumb(useCase)
    }

    return (
        <BasicPage context={context}>
            <CaseSpecs className="block" useCase={useCase} />
            <DynamicZone className="block" content={content} />
        </BasicPage>
    )
}



const getBreadcrumb = ({ slug, title, category }) => {
    if (category) {
        return [
            {
                name: 'Cases',
                href: '/cases'
            },
            {
                name: category.title,
                href: href('/case-category/[slug]/[index]', category.slug, 0)
            },
            {
                name: title,
                href: href('/cases/[slug]', slug)
            }
        ]
    } else {
        return [
            {
                name: 'Cases',
                href: '/cases'
            },
            {
                name: title,
                href: href('/cases/[slug]', slug)
            }
        ]
    }
}

export const getStaticProps = async context => {
    const [useCase] = await Promise.all([
        api.get(`/cases/${context.params.slug}`)
    ])
    const props = {
        case: useCase
    }
    return { props, revalidate: 1 }
}

export const getStaticPaths = async () => {
    const cases = await api.get(`/cases`)
    const paths = cases.map(({ slug }) => ({
        params: { slug },
    }))
    return { paths, fallback: true }
}

export default Page
