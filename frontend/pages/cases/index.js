import {React, api} from 'common'
import {Layout, Menu, Content, Link, Markdown} from 'components'

export default ({page, sectors}) => {
    const components = {
        Sectors: () => getSectors(sectors)
    }
    return (
        <Layout title={page.title}>
            <Menu selected="cases" />
            <Content>
                <Markdown source={page.content} components={components} />
            </Content>
        </Layout>
    )
}

const getSectors = (sectors) => (
    <ul>
        {
            sectors.map(({id, name}) =>
                <li key={id}>
                    <Link href="/cases/sectors/[id]" data={{id}}>
                        {name}
                    </Link>
                </li>
            )
        }
    </ul>
)

export const getStaticProps = async () => {
    const {data: props} = await api({
        page: {
            __aliasFor: 'pageByType',
            __args: {type: 'Cases'},
            title: true,
            content: true
        },
        sectors: {
            id: true,
            name: true
        }
    })
    return {props, unstable_revalidate: 1}
}
