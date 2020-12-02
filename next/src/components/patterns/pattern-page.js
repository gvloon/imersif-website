import { React, withStyles, debug } from 'common'
import { Markdown, Accordion } from 'components'
import { BasicPage } from 'components/page'
import { SolutionBlock, PatternVariant, PatternFilterIcons } from 'components/patterns'

const styles = theme => ({
    variants: {
        marginTop: '3rem',
        display: 'block',
    },
    variant: {
        marginBottom: '2rem'
    },
    toc: {
        marginTop: '4rem'
    },
    icons: {
        marginLeft: '10px'
    }
})

class Page extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedVariant: -1
        }
    }

    render = () => {
        const { pattern, context } = this.props
        if (!pattern)
            return null

        const { solution, image, variants } = pattern

        return (
            <BasicPage context={context}>
                <SolutionBlock className="block" solution={solution} image={image} />
                <div className="block">
                    {
                        variants.length > 1
                            ? this.renderVariants(variants)
                            : this.renderVariant(variants[0])
                    }
                </div>
            </BasicPage>
        )
    }

    renderVariants = variants => {
        const { classes } = this.props
        const { selectedVariant } = this.state

        return (
            <Accordion onChange={this.onChange}>
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
                                <PatternVariant
                                    key={index}
                                    className={classes.variant}
                                    variant={variant}
                                    active={index === selectedVariant}
                                />
                            </Accordion.Details>
                        </Accordion.Item>
                    ))
                }
            </Accordion>

        )
    }

    renderVariant = variant => {
        const { classes } = this.props
        return <PatternVariant className={classes.variant} variant={variant} active={true} />
    }

    onChange = index => {
        this.setState({
            selectedVariant: index
        })
    }
}

export default withStyles(styles)(Page)
