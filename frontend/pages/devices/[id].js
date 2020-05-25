import {React, api, template} from 'common'
import {Markdown, Page, getPages} from "components"

export default (props) => {
    const strings = {
        Name: props.device.name
    }
    const components = {
        Description: () => <Markdown source={props.device.description} strings={props.strings} />
    }
    return <Page {...props} strings={strings} components={components} />
}

export const getStaticProps = async ({ params }) => {
    const pages = getPages('Device')
    const {data: props} = await api({
        ...pages,
        device : {
            __args: {id: params.id},
            name: true,
            description: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const {data} = await api({
        devices: {
            id: true
        }
    })
    const paths = data.devices.map(({id}) => ({
        params: { id }
    }))
    return { paths, fallback: false }
}
