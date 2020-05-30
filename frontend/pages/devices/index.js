import {React, useState, api} from 'common'
import {Link, SearchInput, Page, getPages} from 'components'

export default (props) => {
    const components = {
        Devices : () => getDevices(props),
        Search : () => getSearch(props)
    }
    return <Page {...props} components={components} />
}

const getDevices = ({devices}) => (
    <ul>
        {
            devices.map(({id, name}) => (
                <li key={id}>
                    <Link href="/devices/[id]" data={{id}}>
                        <a>{name}</a>
                    </Link>
                </li>
            ))
        }
    </ul>
)

const onChange = (text, setOptions) => {
    api({
        suggestDevices: {
            __args: {text},
            text: true
        }
    }).then(response => {
        console.log(JSON.stringify(response.data.suggestDevices))
        setOptions(response.data.suggestDevices.map(suggestion => suggestion.text))
    })
}

const getSearch = () => {
    const [options, setOptions] = useState([])
    return (
        <SearchInput options={options} label="Search devices" onChange={evt => onChange(evt.target.value, setOptions)} />
    )
}

export const getStaticProps = async () => {
    const pages = getPages('Devices')
    const {data: props} = await api({
        ...pages,
        devices: {
            id: true,
            name: true
        }
    })
    return {props, unstable_revalidate: 1}
}
