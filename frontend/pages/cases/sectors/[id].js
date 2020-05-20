import {React, api, template} from 'common'
import {Content, Layout, Link, Markdown, Menu} from "components"

export default ({page, sector}) => {
    const strings = {
        Name: sector.name
    }
    const components = {
        IndustryGroups: () => getIndustryGroups(sector.industry_groups)
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

const getIndustryGroups = (groups) => (
    <ul>
        {
            groups.map(group =>
                <li key={group.id}>
                    <Link href={`/cases/industry-groups/${group.id}`}>{group.name}</Link>
                </li>
            )
        }
    </ul>
)

export const getStaticProps = async ({ params }) => {
    const {data: props} = await api({
        page: {
            __aliasFor: 'pageByType',
            __args: {type: 'Cases_Sector'},
            title: true,
            content: true
        },
        sector : {
            __args: {id: params.id},
            name: true,
            industry_groups: {
                id: true,
                name: true
            }
        }
    })
    console.log(JSON.stringify(props))
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const {data} = await api({
        sectors: {
            id: true
        }
    })
    const paths = data.sectors.map(sector => ({
        params: { id: sector.id }
    }))
    return { paths, fallback: false }
}
