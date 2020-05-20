import {React, api, template} from 'common'
import {Content, Layout, Markdown, Menu} from "components"

export default ({page, useCase}) => {
    const strings = {
        Name: useCase.name
    }
    return (
        <Layout title={template(page.title, strings)}>
            <Menu selected="cases" />
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
            __args: {type: 'Case'},
            title: true,
            content: true
        },
        useCase : {
            __aliasFor: 'case',
            __args: {id: params.id},
            name: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const {data} = await api({
        cases: {
            id: true
        }
    })
    const paths = data.cases.map(useCase => ({
        params: { id: useCase.id }
    }))
    return { paths, fallback: false }
}
