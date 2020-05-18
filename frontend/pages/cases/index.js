import axios from 'axios'
import React from 'react'
import Config from 'config'
import {Content, Layout, Menu, Link} from "components"

export default ({industries}) => (
    <Layout title="Cases">
        <Menu selected="cases" />
        <Content>
            <ul>
                {
                    industries.map(industry =>
                        <li key={industry.id}>
                            <Link href={`/cases/${industry.id}`}>{industry.name}</Link>
                        </li>
                    )
                }
            </ul>
        </Content>
    </Layout>
)

export const getStaticProps = async () => {
    const response = await axios.get(`${Config.apiUrl}/industries`)
    return {
        props: {
            industries: response.data
        },
        unstable_revalidate: 1
    }
}
