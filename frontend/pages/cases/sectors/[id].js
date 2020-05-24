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
            groups.map(({id, name}) =>
                <li key={id}>
                    <Link href="/cases/industry-groups/[id]" data={{id}}>
                        <a>{name}</a>
                    </Link>
                </li>
            )
        }
    </ul>
)

export const getStaticProps = async ({ params }) => {
    console.log('getStaticProps sectors')
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
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    console.log('getStaticPaths sectors')
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
