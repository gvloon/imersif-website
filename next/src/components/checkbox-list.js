import { React, withStyles, PropTypes, classNames } from 'common'
import { Checkbox } from 'components'
import { FormGroup, FormControlLabel } from '@material-ui/core'

const styles = theme => ({
    filters: {
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        height: '1.8rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1
    },
    label: {
        margin: 0,
        marginLeft: '0.25rem',
        marginRight: '0.25rem',
        height: '1.8rem',
        display: 'flex',
        flexDirection: 'row',
    },
    labelText: {
        fontWeight: 300,
        fontSize: '1rem'
    },
    checkbox: {
        '&.MuiCheckbox-root': {
            padding: 0,
            paddingRight: '0.2rem'
        }
    }
})

class CheckboxList extends React.Component {

    static propTypes = {
        values: PropTypes.array
    }

    static defaultProps = {
        values: []
    }

    render = () => {
        const { values, title, classes, className } = this.props
        if (!values || !values.length) {
            return null
        }
        const rootClasses = classNames({
            [className]: !!className,
            [classes.filters]: true
        })
        const labelClasses = {
            root: classes.label,
            label: classes.labelText
        }
        return (
            <div className={rootClasses}>
                <div className={classes.title}>{title}</div>
                <FormGroup className={classes.input} row onChange={this.onChange}>
                    {
                        values.map((value, index) => (
                            <FormControlLabel
                                key={index}
                                classes={labelClasses}
                                control={
                                    <Checkbox className={classes.checkbox} value={index} />
                                }
                                label={value}
                            />
                        ))
                    }
                </FormGroup>
            </div>
        )
    }

    onChange = evt => {
        const { onChange, values } = this.props
        if (!onChange)
            return

        const inputs = evt.currentTarget.getElementsByTagName('input')
        const result = []
        for (let i=0, n=inputs.length; i<n; i++) {
            const input = inputs[i]
            if (input.checked) {
                result.push(values[parseInt(input.value)])
            }
        }
        onChange(result)
    }
}

CheckboxList.propTypes = {
}

export default withStyles(styles)(CheckboxList)
