import {React, api, template} from 'common'
import {Content, Layout, Link, Markdown, Menu} from "components"

export default ({page, industry}) => {
    const strings = {
        Name: industry.name
    }
    const components = {
        SubIndustries: () => getSubIndustries(industry.sub_industries)
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

const getSubIndustries = (subIndustries) => (
    <ul>
        {
            subIndustries.map(({id, name}) =>
                <li key={id}>
                    <Link href="/cases/sub-industries/[id]" data={{id}}>
                        {name}
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
            __args: {type: 'Cases_Industry'},
            title: true,
            content: true
        },
        industry : {
            __args: {id: params.id},
            name: true,
            sub_industries: {
                id: true,
                name: true
            }
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const {data} = await api({
        industries: {
            id: true
        }
    })
    const paths = data.industries.map(industry => ({
        params: { id: industry.id }
    }))
    return { paths, fallback: false }
}
