import axios from 'axios'
import React from 'react'
import Config from 'config'
import {Layout, Menu, Content} from 'components'

export default ({patterns}) => (
    <Layout title="XR patterns">
        <Menu selected="patterns" />
        <Content>
            <ul>
                {
                    patterns.map(pattern => <li key={pattern.id}>{pattern.title}</li>)
                }
            </ul>
        </Content>
    </Layout>
)

export const getStaticProps = async () => {
    const response = await axios.get(`${Config.apiUrl}/patterns`)
    return {
        props: {
            patterns: response.data
        },
        unstable_revalidate: 1
    }
}
