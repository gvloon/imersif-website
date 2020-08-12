import { React, api, withStyles, createSelector } from 'common'
import { Markdown, Accordion, Breadcrumb } from 'components'
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
        const { context, data, classes } = this.props
        const { slug, title, solution, image, category } = data.pattern

        const breadcrumb = [
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
        const variants = getVariants(this.state, this.props)

        return (
            <BasicPage context={context} title={title} breadcrumb={breadcrumb}>
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

const PageBreadcrumb = ({ pattern }) => {
    return (
        <Breadcrumb links={links} />
    )
}

const getVariants = createSelector(
    (state, props) => props.data.pattern.variants,
    variants => {
        variants.forEach(variant => {
            let index = 1
            variant.interaction.forEach(step => {
                step.annotations.forEach(annotation => {
                    annotation.index = index++
                })
            })
        })
        return variants
    }
)

export const getStaticProps = async context => {
    const data = await api({
        pattern: {
            __aliasFor: 'patternBySlug',
            __args: { slug: context.params.slug },
            title: true,
            solution: {
                what: true,
                why: true,
                how: true,
                when: true
            },
            image: {
                url: true
            },
            category: {
                name: true,
                slug: true
            },
            variants: {
                title: true,
                slug: true,
                interaction: {
                    image: {
                        url: true
                    },
                    annotations: {
                        text: true
                    }
                },
                examples: {
                    title: true,
                    content: true
                },
                additions: {
                    title: true,
                    content: true
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

export const getStaticPaths = async () => {
    const { patterns } = await api({
        patterns: {
            slug: true
        }
    })
    const paths = patterns.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: false }
}

export default withStyles(styles)(Page)
