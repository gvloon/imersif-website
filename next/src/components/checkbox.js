import React from 'react'
import _Checkbox from '@material-ui/core/Checkbox'

const Checkbox = props => {
    return (
        <_Checkbox
            size="small"
            color="primary"
            {...props}
        />
    )
}

export default Checkbox
