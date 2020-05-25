import {React, api} from 'common'
import {Page, getPages} from "components"

export default (props) => {
    const strings = {
        Name: props.case.name
    }
    return <Page {...props} strings={strings} />
}

export const getStaticProps = async ({ params }) => {
    const pages = getPages('Case')
    const {data: props} = await api({
        ...pages,
        case : {
            __args: {id: params.id},
            name: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const {data} = await api({
        cases: {
            id: true
        }
    })
    const paths = data.cases.map(({id}) => ({
        params: { id }
    }))
    return { paths, fallback: false }
}
