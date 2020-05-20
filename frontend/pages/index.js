import {React, api} from 'common'
import {Layout, Menu, Content, Markdown} from 'components'

export default ({page}) => {
    return (
        <Layout title={page.title}>
            <Menu selected="home" />
            <Content>
                <Markdown source={page.content} />
            </Content>
        </Layout>
    )
}

export const getStaticProps = async () => {
    const {data: props} = await api({
        page: {
            __aliasFor: 'pageByType',
            __args: {type: 'Home'},
            title: true,
            content: true
        }
    })
    return {props, unstable_revalidate: 1}
}

