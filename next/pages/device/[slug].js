import { React, api, pageApi, PagePropTypes } from 'common'
import { Markdown, PageRenderer, Specifications } from 'components'

const Page = ({ page, context, data }) => {
    const { title, description } = data.device

    context = {
        ...context,
        section: 'hardware'
    }
    const strings = {
        Title: title
    }
    const components = {
        Description: () => <Markdown source={description} strings={strings} />,
        Specifications: () => getSpecifications(data.device)
    }
    return <PageRenderer context={context} page={page} strings={strings} components={components} />
}

const getSpecifications = device => {
    const specs = [
        ['Type', 'device_type'],
        ['Display type', 'device_screen'],
        ['Tethering', 'device_tethering'],
        ['Tracking', 'device_tracking_type'],
        ['Degrees of freedom', 'device_dof'],
        ['Field of view', 'device_fov']
    ].map(spec => ({
        label: spec[0],
        value: device[spec[1]] ? device[spec[1]].name : null
    }))
    return <Specifications data={specs} />
}

Page.propTypes = PagePropTypes

export const getStaticProps = async context => {
    const props = await pageApi('Device', context, {
        device: {
            __aliasFor: 'deviceBySlug',
            __args: { slug: context.params.slug },
            title: true,
            description: true,
            device_type: {
                name: true
            },
            device_screen: {
                name: true
            },
            device_tethering: {
                name: true
            },
            device_tracking_type: {
                name: true
            },
            device_dof: {
                name: true
            }
        }
    })
    return { props, unstable_revalidate: 1 }
}

export const getStaticPaths = async () => {
    const { devices } = await api({
        devices: {
            slug: true
        }
    })
    const paths = devices.map(({ slug }) => ({
        params: { slug }
    }))
    return { paths, fallback: false }
}

export default Page
