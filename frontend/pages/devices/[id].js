import {React, api, template} from 'common'
import {Content, Layout, Markdown, Menu} from "components"

export default ({page, device}) => {
    const strings = {
        Name: device.name
    }
    const components = {
        Description: () => <Markdown source={device.description} strings={strings} />
    }
    return (
        <Layout title={template(page.title, strings)}>
            <Menu selected="devices" />
            <Content>
                <Markdown source={page.content} strings={strings} components={components} />
            </Content>
        </Layout>
    )
}

export const getStaticProps = async ({ params }) => {
    const {data: props} = await api({
        page: {
            __aliasFor: 'pageByType',
            __args: {type: 'Device'},
            title: true,
            content: true
        },
        device : {
            __args: {id: params.id},
            name: true,
            description: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const {data} = await api({
        devices: {
            id: true
        }
    })
    const paths = data.devices.map(({id}) => ({
        params: { id }
    }))
    return { paths, fallback: false }
}
