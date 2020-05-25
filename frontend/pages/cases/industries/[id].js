import {React, api, template} from 'common'
import {Link, Page, getPages} from "components"

export default (props) => {
    const {industry} = props
    const strings = {
        Name: industry.name
    }
    const components = {
        SubIndustries: () => getSubIndustries(industry.sub_industries)
    }
    return <Page {...props} strings={strings} components={components} />
}

const getSubIndustries = (subIndustries) => (
    <ul>
        {
            subIndustries.map(({id, name}) =>
                <li key={id}>
                    <Link href="/cases/sub-industries/[id]" data={{id}}>
                        <a>{name}</a>
                    </Link>
                </li>
            )
        }
    </ul>
)

export const getStaticProps = async ({ params }) => {
    const pages = getPages('Cases_Industry')
    const {data: props} = await api({
        ...pages,
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
