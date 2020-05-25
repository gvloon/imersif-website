import {React, api, template} from 'common'
import {Page, getPages} from "components"

export default (props) => {
    const strings = {
        Name: props.pattern.name,
        Device: props.pattern.content
    }
    return <Page {...props} strings={strings} />
}

export const getStaticProps = async ({ params }) => {
    const pages = getPages('Patterns')
    const {data: props} = await api({
        ...pages,
        pattern : {
            __args: {id: params.id},
            name: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const {data} = await api({
        patterns: {
            id: true
        }
    })
    const paths = data.patterns.map(({id}) => ({
        params: { id }
    }))
    return { paths, fallback: false }
}
