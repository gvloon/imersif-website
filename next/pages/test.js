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
        console.log('render')
        return <JsxParser jsx={jsx} components={this.components} bindings={this.bindings} />
//        return <FilterList values={values} onChange={this.onChange} />
    }

    onChange = filters => {
        this.setState({ filters })
    }
}

export default Page
