import { React, pageApi, PagePropTypes } from 'common'
import { Link, PageRenderer, CategoryList } from 'components'

const Page = ({ page, context, data }) => {
    context = {
        ...context,
        section: 'hardware'
    }
    const components = {
        DeviceTypes: props => getDeviceTypes({ ...props, ...data }),
        PeripheralTypes: props => getPeripheralTypes({ ...props, ...data })
    }
    return <PageRenderer context={context} page={page} components={components} />
}

Page.propTypes = PagePropTypes

const getDeviceTypes = ({ deviceTypes, ...rest }) => {
    const categories = deviceTypes.map((type, index) => (
        <Link key={index} href="/device-type/[slug]" as={`/device-type/${type.slug}`}>
            <a>{type.name}</a>
        </Link>
    ))
    return <CategoryList {...rest} categories={categories} />
}
const getPeripheralTypes = ({ peripheralTypes, ...rest }) => {
    const categories = peripheralTypes.map((type, index) => (
        <Link key={index} href="/peripheral-type/[slug]" as={`/peripheral-type/${type.slug}`}>
            <a>{type.name}</a>
        </Link>
    ))
    return <CategoryList {...rest} categories={categories}/>
}

export const getStaticProps = async context => {
    const props = await pageApi('Hardware', context, {
        deviceTypes: {
            slug: true,
            name: true
        },
        peripheralTypes: {
            slug: true,
            name: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export default Page
