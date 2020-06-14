import { React, api, pageApi, PagePropTypes } from 'common'
import { Markdown, PageRenderer } from 'components'

const Page = ({ page, context, data }) => {
    const { title, description } = data.device

    context = {
        ...context,
        section: 'devices'
    }
    const strings = {
        Title: title
    }
    const components = {
        Description: () => <Markdown source={description} strings={strings} />
    }
    return <PageRenderer context={context} page={page} strings={strings} components={components} />
}

Page.propTypes = PagePropTypes

export const getStaticProps = async context => {
    const props = await pageApi('Device', context, {
        device: {
            __aliasFor: 'deviceBySlug',
            __args: { slug: context.params.slug },
            title: true,
            description: true
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
