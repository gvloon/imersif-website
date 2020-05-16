import axios from 'axios'
import React from 'react'
import Config from 'config'
import {Content, Layout, Menu} from "components"

export default ({industry}) => (
    <Layout title="Cases">
        <Menu selected="cases" />
        <Content>
            {industry.name}
        </Content>
    </Layout>
)

export const getStaticProps = async ({ params }) => {
    const response = await axios.get(`${Config.apiUrl}/industries/${params.id}`)
    return {
        props: {
            industry: response.data
        }
    }
}

export const getStaticPaths = async () => {
    const response = await axios.get(`${Config.apiUrl}/industries`)
    const paths = response.data.map(industry => ({
        params : { id: industry.id }
    }))
    return { paths, fallback: false }
}
