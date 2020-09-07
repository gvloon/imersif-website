import { React, api, withStyles } from 'common'
import { Markdown, Accordion } from 'components'
import { BasicPage } from 'components/page'
import { SolutionBlock, PatternVariant } from 'components/patterns'

const styles = theme => ({
    solution: {
        marginTop: '1rem'
    },
    variants: {
        marginTop: '3rem',
        display: 'block',
    },
    variant: {
        marginBottom: '4rem'
    },
    toc: {
        marginTop: '4rem'
    }
})

class Page extends React.Component {
    render () {
        const { pattern, classes } = this.props
        const { title, solution, image, variants } = pattern

        const context = {
            title,
            section: 'patterns',
            search: {
                desktop: 'patterns',
                mobile: null
            },
            breadcrumb: getBreadcrumb(pattern)
        }

        return (
            <BasicPage context={context}>
                <Markdown />
                <SolutionBlock className={classes.solution} solution={solution} image={image} />
                <div className={classes.variants}>
                    <Accordion>
                        {
                            variants.map((variant, index) => (
                                <Accordion.Item key={index}>
                                    <Accordion.Summary>
                                        <h2>{variant.title}</h2>
                                    </Accordion.Summary>
                                    <Accordion.Details>
                                        <PatternVariant key={index} className={classes.variant} variant={variant} />
                                    </Accordion.Details>
                                </Accordion.Item>
                            ))
                        }
                    </Accordion>
                </div>
            </BasicPage>
        )
    }
}

const getBreadcrumb = ({ title, slug, category }) => {
    if (category) {
        return [
            {
                name: 'Patterns',
                href: '/patterns'
            },
            {
                name: category.name,
                href: '/pattern-category/[slug]',
                as: `/pattern-category/${category.slug}`
            },
            {
                name: title,
                href: '/pattern/[slug]',
                as: `/pattern/${slug}`
            }
        ]
    } else {
        return [
            {
                name: 'Patterns',
                href: '/patterns'
            },
            {
                name: title,
                href: '/pattern/[slug]',
                as: `/pattern/${slug}`
            }
        ]
    }
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
    return { paths, fallback: false }
}

export default withStyles(styles)(Page)
