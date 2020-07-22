import { React, api, pageApi, PagePropTypes } from 'common'
import { PageRenderer } from 'components'
import { PatternList } from 'components/patterns'

export const Page = ({ page, context, data }) => {
    const { name } = data.patternCategory
    context = {
        ...context,
        section: 'patterns'
    }
    const strings = {
        Name: name
    }
    const components = {
        Patterns: () => <PatternList patterns={data.patternCategory.patterns} />
    }
    return <PageRenderer context={context} page={page} strings={strings} components={components} />
}

Page.PropTypes = PagePropTypes

export const getStaticProps = async context => {
    const props = await pageApi('Pattern_Category', context, {
        patternCategory: {
            __aliasFor: 'patternCategoryBySlug',
            __args: { slug: context.params.slug },
            name: true,
            patterns: {
                title: true,
                media: {
                    url: true
                },
                pros_and_cons: {
                    pros: {
                        text: true
                    },
                    cons: {
                        text: true
                    }
                }
            }
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const { patternCategories } = await api({
        patternCategories: {
            slug: true
        }
    })
    const paths = patternCategories.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: false }
}

export default Page
