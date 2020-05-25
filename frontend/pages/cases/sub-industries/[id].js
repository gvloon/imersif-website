import {React, api, template} from 'common'
import {Link, Page, getPages} from "components"

export default (props) => {
    const {subIndustry} = props
    const strings = {
        Name: subIndustry.name,
        Description: subIndustry.description
    }
    const components = {
        Cases: () => getCases(subIndustry.cases)
    }
    return <Page {...props} strings={strings} components={components} />
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
    const pages = getPages('Cases_SubIndustry')
    const {data: props} = await api({
        ...pages,
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
