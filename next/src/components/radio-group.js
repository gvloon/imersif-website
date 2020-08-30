import { React, withStyles, classNames, inspect } from 'common'
import { Radio, RadioGroup as _RadioGroup, FormControl, FormControlLabel } from '@material-ui/core'

const groupStyles = theme => ({
    root: {
    }
})


class RadioGroup extends React.Component {
    render = () => {
        const { className, classes, children, value, onChange } = this.props
        return (
            <div className={className}>
                <FormControl component="fieldset">
                    <_RadioGroup className={classes.group}>
                        {
                            children.map((child, index) => {
                                return React.cloneElement(child, {
                                    key: index,
                                    checked: child.props.value === value,
                                    onChange: evt => {
                                        if (evt.currentTarget.checked) {
                                            onChange(child.props.value)
                                        }
                                    }
                                })
                            })
                        }
                    </_RadioGroup>
                </FormControl>
            </div>
        )
    }
}

const itemStyles = theme => ({
    FormControlLabel_label: {
        fontWeight: 'normal',
        lineHeight: '1rem'
    },
    FormControlLabel_root: {
        marginLeft: '-6px',
        marginRight: '0px'
    },
    Radio_root: {
        padding: '6px'
    }
})

class RadioGroupItem extends React.Component
{
    render = () => {
        const { classes, children, value, checked, onChange } = this.props
        const labelClasses = {
            root: classes.FormControlLabel_root,
            label: classes.FormControlLabel_label
        }
        const radioClasses = {
            root: classes.Radio_root
        }
        const radio = <Radio classes={radioClasses} color="primary" size="small" checked={checked} onChange={onChange} />
        return (
            <FormControlLabel classes={labelClasses} value={value} control={radio} label={children} />
        )
    }
}

RadioGroup.Item = withStyles(itemStyles)(RadioGroupItem)

export default withStyles(groupStyles)(RadioGroup)
