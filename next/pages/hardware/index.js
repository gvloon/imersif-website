import { React, api, href } from 'common'
import { DynamicZone, Link, NestedColumnList } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ page, deviceTypes, peripheralTypes }) => {
    const { title, image, content } = page

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
            <DynamicZone className="block" content={content} />
            <CategoryList className="block" deviceTypes={deviceTypes} peripheralTypes={peripheralTypes} />
        </BasicPage>
    )
}

const CategoryList = ({ deviceTypes, peripheralTypes, className }) => {
    const items = [
        {
            value: 'Head mounted devices',
            children: deviceTypes.map((type, index) => ({
                value: (
                    <Link key={index} href={href('/device-type/[slug]', type.slug)}>
                        <a>{type.name}</a>
                    </Link>
                )
            }))
        },
        {
            value: 'Peripherals',
            children: peripheralTypes.map((type, index) => ({
                value: (
                    <Link key={index} href={href('/peripheral-type/[slug]', type.slug)}>
                        <a>{type.name}</a>
                    </Link>
                )
            }))
        }
    ]
    return <NestedColumnList className={className} items={items} />
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
