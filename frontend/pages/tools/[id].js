import {React, api, template} from 'common'
import {Page, getPages} from "components"

export default (props) => {
    const strings = {
        Name: props.tool.name,
        Description: props.tool.description
    }
    return <Page {...props} strings={strings} />
}

export const getStaticProps = async ({ params }) => {
    const pages = getPages('Device')
    const {data: props} = await api({
        ...pages,
        tool : {
            __args: {id: params.id},
            name: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const {data} = await api({
        tools: {
            id: true
        }
    })
    const paths = data.tools.map(({id}) => ({
        params: { id }
    }))
    return { paths, fallback: false }
}
