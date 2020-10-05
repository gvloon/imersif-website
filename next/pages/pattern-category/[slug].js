import { React, api } from 'common'
import { PatternCategoryPage, PatternPage } from 'components/patterns'

const Page = ({ patternCategory, pattern }) => {
    const { slug, name } = patternCategory
    const context = {
        title: name,
        section: 'patterns',
        search: {
            desktop: 'patterns',
            mobile: null
        },
        breadcrumb: [
            {
                name: 'Patterns',
                href: '/patterns'
            },
            {
                name: name,
                href: ('/pattern-category/[slug]', slug)
            }
        ]
    }

    if (pattern != null) {
        return <PatternPage context={context} pattern={pattern} />
    } else {
        return <PatternCategoryPage context={context} patternCategory={patternCategory} />
    }
}

export const getStaticProps = async context => {
    let pattern = null
    const [patternCategory] = await Promise.all([
        api.get(`/pattern-categories/${context.params.slug}`)
    ])
    if (patternCategory && patternCategory.patterns && patternCategory.patterns.length === 1) {
        [pattern] = await Promise.all([
            api.get(`/patterns/${patternCategory.patterns[0].slug}`)
        ])
    }

    const props = { patternCategory, pattern }
    return { props, revalidate: 1 }
}

export const getStaticPaths = async () => {
    const patternCategories = await api.get(`/pattern-categories`)
    const paths = patternCategories.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: true }
}

export default Page
