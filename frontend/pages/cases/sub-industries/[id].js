import {React, api, template} from 'common'
import {Content, Layout, Link, Markdown, Menu} from "components"

export default ({page, subIndustry}) => {
    const strings = {
        Name: subIndustry.name,
        Description: subIndustry.description
    }
    const components = {
        Cases: () => getCases(subIndustry.cases)
    }
    return (
        <Layout title={template(page.title, strings)}>
            <Menu selected="cases" />
            <Content>
                <Markdown source={page.content} strings={strings} components={components} />
            </Content>
        </Layout>
    )
}

const getCases = (cases) => (
    <ul>
        {
            cases.map(({id, title}) =>
                <li key={id}>
                    <Link href="/cases/[id]" data={{id}}>
                        <a>{title}</a>
                    </Link>
                </li>
            )
        }
    </ul>
)

export const getStaticProps = async ({ params }) => {
    const {data: props} = await api({
        page: {
            __aliasFor: 'pageByType',
            __args: {type: 'Cases_SubIndustry'},
            title: true,
            content: true
        },
        subIndustry: {
            __args: {id: params.id},
            name: true,
            description: true,
            cases: {
                id: true,
                title: true
            }
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const {data} = await api({
        subIndustries: {
            id: true
        }
    })
    const paths = data.subIndustries.map(subIndustry => ({
        params: { id: subIndustry.id }
    }))
    return { paths, fallback: false }
}
