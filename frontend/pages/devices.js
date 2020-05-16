import axios from 'axios'
import React from "react"
import Config from 'config'
import {Layout, Menu, Content} from 'components'

export default ({devices}) => (
    <Layout title="Devices">
        <Menu selected="devices" />
        <Content>
            <ul>
                {
                    devices.map(device => <li key={device.id}>{device.name}</li>)
                }
            </ul>
        </Content>
    </Layout>
)

export const getStaticProps = async () => {
    const response = await axios.get(`${Config.apiUrl}/devices`)
    return {
        props: {
            devices: response.data
        }
    }
}
