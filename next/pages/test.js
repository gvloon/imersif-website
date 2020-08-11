import { React, PagePropTypes, pageApi } from 'common'
import { FilterList } from 'components/patterns'
import JsxParser from 'react-jsx-parser'

const jsx = '<FilterList />'
const values = ['test1', 'test2']

class Page extends React.Component
{
    constructor(props)
    {
        super()
        this.state = {
            filters: []
        }
        this.bindings = {
            onChange: filters => { console.log(filters) }
        }
        this.components = {
            FilterList: props => <FilterList onChange={this.onChange} />
        }
    }

    render = () => {
        return (
            <>
                <h1>Header 1</h1>
                <h2>Header 2</h2>
                <h3>Header 3</h3>
                <h4>Header 4</h4>
                <h5>Header 5</h5>
                <h6>Header 6</h6>
            </>
        )
    }

    onChange = filters => {
        this.setState({ filters })
    }
}

export default Page
