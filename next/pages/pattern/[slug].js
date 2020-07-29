import { React, api, withStyles } from 'common'
import { Markdown, Image } from 'components'
import { BasicPage } from 'components/page'
import { SolutionBlock } from 'components/patterns'

const styles = theme => ({
    solution: {
        marginTop: '1rem'
    }
})

class Page extends React.Component {
    render () {
        const { context, data, classes } = this.props
        const { title, solution, image } = data.pattern

        return (
            <BasicPage context={context} title={title}>
                <h1>{title}</h1>
                <Markdown />
                <SolutionBlock className={classes.solution} solution={solution} image={image} />
            </BasicPage>
        )
    }
}

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
    return { props, unstable_revalidate: 1 }
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
