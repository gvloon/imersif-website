import {React, api} from 'common'
import {Link, Page, getPages} from "components"

export default (props) => {
    const {sector} = props
    const strings = {
        Name: sector.name
    }
    const components = {
        IndustryGroups: () => getIndustryGroups(sector.industry_groups)
    }
    return <Page {...props} strings={strings} components={components} />
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
    const pages = getPages('Cases_Sector')
    const {data: props} = await api({
        ...pages,
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
