import React from 'react'
import { withStyles, makeStyles, classNames, inspect } from 'common'
import _Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const selectStyles = theme => ({
    select: {
        width: '100%',
        display: 'flex'
    },
    border: {
        border: '1px solid #ccc',
        borderRadius: '4px'
    },
    left: {
        textAlign: 'left',
        paddingLeft: '10px'
    },
    center: {
        textAlign: 'center'
    },
    right: {
        textAlign: 'right'
    },
    root: {
        '&.MuiSelect-select': {
            paddingRight: '16px',
            fontSize: '13px',
            flex: 1,
            '&:focus': {
                backgroundColor: '#0000'
            }
        }
    },
    icon: {
        fill: '#000',
    }
})

class Select extends React.Component {
    render = () => {
        const { className,
                classes,
                defaultValue,
                onChange = () => {},
                border = true,
                alignment = 'left',
                ...rest } = this.props
        const rootClasses = classNames({
            [classes.root]: !!classes.root,
            [classes.border]: border,
            [classes.left]: alignment === 'left',
            [classes.center]: alignment === 'center',
            [classes.right]: alignment === 'right'
        })
        return (
            <div className={className}>
                <_Select
                    className={classes.select}
                    classes={{
                        root: rootClasses
                    }}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        }
                    }}
                    defaultValue={defaultValue !== undefined ? defaultValue : ''}
                    disableUnderline
                    MenuProps={{
                        getContentAnchorEl: null,
                        anchorOrigin: { vertical: 'bottom', horizontal: 'left'}
                    }}
                    {...rest}
                    onChange={this.onChange}
                />
            </div>
        )
    }

    onChange = evt => {
        const { onChange } = this.props
        onChange(evt.target.value)
    }
}

const useItemStyles = makeStyles(theme => ({
    root: {
        fontSize: '13px',
        minHeight: 'auto'
    }
}))

Select.Item =  React.forwardRef(({ children, ...rest }, ref) => {
    const classes = useItemStyles()
    return (
        <MenuItem
            ref={ref}
            classes={classes}
            {...rest}
        >
            { children }
        </MenuItem>
    )
})

export default withStyles(selectStyles)(Select)

