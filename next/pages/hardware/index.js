import { React, api } from 'common'
import { Markdown, Link, CategoryList } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ context, data }) => {
    const { title, image, introduction } = data.page
    return (
        <BasicPage context={context} title={title} image={image}>
            <h1>{title}</h1>
            <Markdown source={introduction} />
            <DeviceTypeList types={data.deviceTypes} />
            <PeripheralTypeList types={data.peripheralTypes} />
        </BasicPage>
    )
}

const DeviceTypeList = ({ types }) => {
    const categories = types.map((type, index) => (
        <Link key={index} href="/device-type/[slug]" as={`/device-type/${type.slug}`}>
            <a>{type.name}</a>
        </Link>
    ))
    return <CategoryList title="Head mounted devices" categories={categories} />
}

const PeripheralTypeList = ({ types }) => {
    const categories = types.map((type, index) => (
        <Link key={index} href="/peripheral-type/[slug]" as={`/peripheral-type/${type.slug}`}>
            <a>{type.name}</a>
        </Link>
    ))
    return <CategoryList title="Peripherals" categories={categories}/>
}

export const getStaticProps = async context => {
    const data = await api({
        page: {
            __aliasFor: 'hardwarePage',
            title: true,
            image: {
                url: true
            },
            introduction: true
        },
        deviceTypes: {
            slug: true,
            name: true
        },
        peripheralTypes: {
            slug: true,
            name: true
        }
    })
    const props = {
        data,
        context: {
            ...context,
            section: 'hardware'
        }
    }
    return { props, unstable_revalidate: 1 }
}

export default Page
