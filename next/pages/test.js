import { React, PagePropTypes, pageApi } from 'common'
import { Select, MenuItem } from '@material-ui/core'

class Page extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render = () => {
        return (
            <Select>
                <MenuItem value="1">Test 1</MenuItem>
                <MenuItem value="2">Test 2</MenuItem>
                <MenuItem value="3">Test 3</MenuItem>
                <MenuItem value="4">Test 4</MenuItem>
            </Select>
        )
    }
}

export default Page
