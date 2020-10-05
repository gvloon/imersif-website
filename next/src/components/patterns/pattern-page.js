import { React, withStyles, href } from 'common'
import { Markdown, Accordion } from 'components'
import { BasicPage } from 'components/page'
import { SolutionBlock, PatternVariant, PatternFilterIcons } from 'components/patterns'

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
    },
    icons: {
        marginLeft: '10px'
    }
})

class Page extends React.Component {
    render () {
        const { pattern, context, classes } = this.props
        if (!pattern)
            return null

        const { solution, image, variants } = pattern

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
                                        <h2>
                                            {variant.title}
                                            <PatternFilterIcons className={classes.icons} filters={variant.filters} />
                                        </h2>
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

export default withStyles(styles)(Page)
