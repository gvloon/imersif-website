import {React, api} from 'common'
import {Layout, Menu, Content, Markdown} from 'components'

export default ({page, devices}) => {
    const components = {
        Devices : () => getDevices(devices)
    }
    return (
        <Layout title={page.title}>
            <Menu selected="devices"/>
            <Content>
                <Markdown source={page.content} components={components} />
            </Content>
        </Layout>
    )
}

const getDevices = (devices) => (
    <ul>
        {
            devices.map(device => <li key={device.id}>{device.name}</li>)
        }
    </ul>
)

export const getStaticProps = async () => {
    const {data: props} = await api({
        page: {
            __aliasFor: 'pageByType',
            __args: {type:'Devices'},
            title: true,
            content: true
        },
        devices: {
            id: true,
            name: true
        }
    })
    return {props, unstable_revalidate: 1}
}
