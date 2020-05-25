import {React, api} from 'common'
import {Link, Page, getPages} from 'components'

export default (props) => {
    const components = {
        Devices : () => getDevices(props)
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
