import { React, api, withStyles, createSelector } from 'common'
import { Markdown, Accordion, Toc } from 'components'
import { BasicPage } from 'components/page'
import { SolutionBlock, PatternVariant } from 'components/patterns'

const styles = theme => ({
    solution: {
        marginTop: '1rem'
    },
    variantsMobile: {
        marginTop: '3rem',
        display: 'block',
        [theme.breakpoints.up('xs')]: {
            display: 'none'
        }
    },
    variantsDesktop: {
        display: 'none',
        [theme.breakpoints.up('xs')]: {
            display: 'block'
        }
    },
    containerDesktop: {
        marginTop: '6rem'
    },
    variantDesktop: {
        marginTop: '1rem'
    },
    variantMobile: {
        marginBottom: '4rem'
    },
    toc: {
        marginTop: '4rem'
    }
})

class Page extends React.Component {
    render () {
        const { context, data, classes } = this.props
        const { title, solution, image } = data.pattern

        const variants = getVariants(this.state, this.props)

        return (
            <BasicPage context={context} title={title}>
                <h1>{title}</h1>
                <Markdown />
                <SolutionBlock className={classes.solution} solution={solution} image={image} />
                <div className={classes.variantsMobile}>
                    <Accordion>
                        {
                            variants.map((variant, index) => (
                                <Accordion.Item key={index}>
                                    <Accordion.Summary>
                                        <h2>{variant.title}</h2>
                                    </Accordion.Summary>
                                    <Accordion.Details>
                                        <PatternVariant key={index} className={classes.variantMobile} variant={variant} />
                                    </Accordion.Details>
                                </Accordion.Item>
                            ))
                        }
                    </Accordion>
                </div>
                <div className={classes.variantsDesktop}>
                    <Toc className={classes.toc} title="Pattern variants">
                        {
                            variants.map((variant, index) => (
                                <Toc.Item key={index} href={'#' + variant.slug}>{variant.title}</Toc.Item>
                            ))
                        }
                    </Toc>
                    {
                        variants.map((variant, index) => (
                            <>
                                <a id={variant.slug} />
                                <div key={index} className={classes.containerDesktop}>
                                    <h2>{variant.title}</h2>
                                    <PatternVariant key={index} className={classes.variantDesktop} variant={variant} />
                                </div>
                            </>
                        ))
                    }
                </div>
            </BasicPage>
        )
    }
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
