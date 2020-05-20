import {React, api, template} from 'common'
import {Content, Layout, Link, Markdown, Menu} from "components"

export default ({page, group}) => {
    const strings = {
        Name: group.name
    }
    const components = {
        Industries: () => getIndustries(group.industries)
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

const getIndustries = (industries) => (
    <ul>
        {
            industries.map(industry =>
                <li key={industry.id}>
                    <Link href={`/cases/industries/${industry.id}`}>{industry.name}</Link>
                </li>
            )
        }
    </ul>
)

export const getStaticProps = async ({ params }) => {
    const {data: props} = await api({
        page: {
            __aliasFor: 'pageByType',
            __args: {type: 'Cases_IndustryGroup'},
            title: true,
            content: true
        },
        group : {
            __aliasFor: 'industryGroup',
            __args: {id: params.id},
            name: true,
            industries: {
                id: true,
                name: true
            }
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const {data} = await api({
        industryGroups: {
            id: true
        }
    })
    const paths = data.industryGroups.map(group => ({
        params: { id: group.id }
    }))
    return { paths, fallback: false }
}
