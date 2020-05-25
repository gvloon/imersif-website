import {React, api} from 'common'
import {Link, Page, getPages} from "components"

export default (props) => {
    const {group} = props
    const strings = {
        Name: group.name
    }
    const components = {
        Industries: () => getIndustries(group.industries),
    }
    return <Page {...props} strings={strings} components={components} />
}

const getIndustries = (industries) => (
    <ul>
        {
            industries.map(({id, name}) =>
                <li key={id}>
                    <Link href="/cases/industries/[id]" data={{id}}>
                        <a>{name}</a>
                    </Link>
                </li>
            )
        }
    </ul>
)

export const getStaticProps = async ({ params }) => {
    const pages = getPages('Cases_IndustryGroup')
    const {data: props} = await api({
        ...pages,
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
    const paths = data.industryGroups.map(({id}) => ({
        params: { id }
    }))
    return { paths, fallback: false }
}
