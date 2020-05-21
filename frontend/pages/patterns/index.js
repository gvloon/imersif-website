import {React, api} from 'common'
import {Layout, Menu, Content, Markdown, Link} from 'components'

export default ({page, patterns}) => {
    const components = {
        Patterns: () => getPatterns(patterns)
    }
    return (
        <Layout title={page.title}>
            <Menu selected="patterns" />
            <Content>
                <Markdown source={page.content} components={components} />
            </Content>
        </Layout>
    )
}

const getPatterns = (patterns) => (
    <ul>
        {
            patterns.map(({id, title}) => (
                <li key={id}>
                    <Link href="/patterns/[id]" data={{id}}>
                        {title}
                    </Link>
                </li>
            ))
        }
    </ul>
)

export const getStaticProps = async () => {
    const {data: props} = await api({
        page: {
            __aliasFor: 'pageByType',
            __args: { type: 'Patterns' },
            title: true,
            content: true
        },
        patterns : {
            id: true,
            title: true
        }
    })
    return {props, unstable_revalidate: 1}
}
