import {React, api, template} from 'common'
import {Content, Layout, Markdown, Menu} from "components"

export default ({page, pattern}) => {
    const strings = {
        Name: pattern.name,
        Device: pattern.content
    }
    return (
        <Layout title={template(page.title, strings)}>
            <Menu selected="patterns" />
            <Content>
                <Markdown source={page.content} strings={strings} />
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
            name: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const {data} = await api({
        patterns: {
            id: true
        }
    })
    const paths = data.patterns.map(({id}) => ({
        params: { id }
    }))
    return { paths, fallback: false }
}
