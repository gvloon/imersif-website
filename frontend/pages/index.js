import React from 'react'
import {Layout, Menu, Content} from 'components'

export default () => (
    <Layout title="XR patterns">
        <Menu selected="home" />
        <Content>
            Dit is de home page
            x{process.env.NEXT_PUBLIC_STRAPI_URL}x
        </Content>
    </Layout>
)
