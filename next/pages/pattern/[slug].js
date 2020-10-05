import { React, api, href } from 'common'
import { PatternPage } from 'components/patterns'

const Page = ({ pattern }) => {
    const { title } = pattern
    const context = {
        title,
        section: 'patterns',
        search: {
            desktop: 'patterns',
            mobile: null
        },
        breadcrumb: getBreadcrumb(pattern)
    }

    return <PatternPage context={context} pattern={pattern} />
}

const getBreadcrumb = ({ title, slug, category }) => {
    const breadcrumb = []
    breadcrumb.push({
        name: 'Patterns',
        href: '/patterns'
    })
    if (category) {
        breadcrumb.push({
            name: category.name,
            href: href('/pattern-category/[slug]', category.slug)
        })
    }
    breadcrumb.push({
        name: title,
        href: href('/pattern/[slug]', slug)
    })
    return breadcrumb
}

export const getStaticProps = async context => {
    const [pattern] = await Promise.all([
        api.get(`/patterns/${context.params.slug}`)
    ])
    const props = { pattern }
    return { props, revalidate: 1 }
}

export const getStaticPaths = async () => {
    const patterns = await api.get(`/patterns`)
    const paths = patterns.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: true }
}

export default Page
