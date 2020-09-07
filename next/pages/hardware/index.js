import { React, api } from 'common'
import { Markdown, Link, NestedColumnList } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ page, deviceTypes, peripheralTypes }) => {
    const { title, image, introduction } = page

    const context = {
        title,
        section: 'hardware',
        search: {
            desktop: 'hardware',
            mobile: null
        },
        breadcrumb: [
            {
                name: 'Hardware',
                href: '/hardware'
            }
        ]
    }

    return (
        <BasicPage context={context} image={image}>
            <Markdown source={introduction} />
            <CategoryList deviceTypes={deviceTypes} peripheralTypes={peripheralTypes} />
        </BasicPage>
    )
}

const CategoryList = ({ deviceTypes, peripheralTypes }) => {
    const items = [
        {
            value: 'Head mounted devices',
            children: deviceTypes.map((type, index) => ({
                value: (
                    <Link key={index} href="/device-type/[slug]" as={`/device-type/${type.slug}`}>
                        <a>{type.name}</a>
                    </Link>
                )
            }))
        },
        {
            value: 'Peripherals',
            children: peripheralTypes.map((type, index) => ({
                value: (
                    <Link key={index} href="/peripheral-type/[slug]" as={`/peripheral-type/${type.slug}`}>
                        <a>{type.name}</a>
                    </Link>
                )
            }))
        }
    ]
    return <NestedColumnList items={items} />
}

export const getStaticProps = async context => {
    const props = {
        page: await api.get('/hardware-page'),
        deviceTypes: await api.get('/device-types'),
        peripheralTypes: await api.get('/peripheral-types')
    }
    return { props, revalidate: 1 }
}

export default Page
