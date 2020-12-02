import { React, api } from 'common'
import { DynamicZone } from 'components'
import { BasicPage } from 'components/page'
import { Glossary } from 'components/glossary'

export const Page = ({ page, items }) => {
    const { title, image, content } = page

    const context = {
        title,
        section: 'glossary',
        search: {
            desktop: 'glossary',
            mobile: null
        },
        breadcrumb: [
            {
                name: 'Glossary',
                href: '/glossary'
            }
        ]
    }

    return (
        <BasicPage context={context} image={image}>
            <DynamicZone className="block" content={content} />
            <Glossary className="block" items={items} />
        </BasicPage>
    )
}

export const getStaticProps = async context => {
    const [page, items] = await Promise.all([
        api.get('/glossary-page'),
        api.get('/glossary-items')
    ])
    return { props: { page, items }, revalidate: 1 }
}

export default Page
