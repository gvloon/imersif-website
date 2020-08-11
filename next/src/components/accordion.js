import { React, withStyles, useState } from 'common'
import { ExpandMore } from '@material-ui/icons'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'

class Accordion extends React.Component
{
    state = {
        expanded: -1
    }

    render () {
        const { children } = this.props
        const { expanded } = this.state
        return (
            <>
                {
                    children.map((child, index) => {
                        return React.cloneElement(child, {
                            expanded: expanded === index,
                            onChange: () => this.setExpanded(index),
                        })
                    })
                }
            </>
        )
    }

    setExpanded = index => {
        this.setState(state => ({
            expanded: state.expanded !== index ? index : -1
        }))
    }
}

const AccordionItem = withStyles({
    root: {
        border: 'none',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0
        },
        '&:before': {
            display: 'none'
        },
        '&$expanded': {
            margin: 'auto'
        }
    },
    expanded: {}
})(MuiAccordion)

Accordion.Item = props => (
    <AccordionItem
        TransitionProps={{
            timeout: {
                enter: 500,
                exit: 0
            }
        }}
        {...props}
    />
)

const AccordionSummary = withStyles({
    root: {
        padding: 0,
        minHeight: 54,
        '&$expanded': {
            minHeight: 54
        },
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    },
    content: {
        margin: 0,
        '&$expanded': {
            margin: 0
        }
    },
    expanded: {}
})(MuiAccordionSummary)

Accordion.Summary = props => (
    <AccordionSummary
        expandIcon={<ExpandMore />}
        {...props}
    />
)

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: 0
    }
}))(MuiAccordionDetails)

Accordion.Details = props => (
    <AccordionDetails {...props} />
)

export default Accordion
