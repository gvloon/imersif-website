import { React, api } from 'common'
import { Markdown } from 'components'
import { BasicPage } from 'components/page'
import { Glossary } from 'components/glossary'

export const Page = ({ page, items }) => {
    const { title, image, introduction } = page

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
            <Markdown source={introduction} />
            <Glossary items={items} />
        </BasicPage>
    )
}

export const getStaticProps = async context => {
    const props = await api({
        page: {
            __aliasFor: 'glossaryPage',
            title: true,
            image: {
                url: true
            },
            introduction: true
        },
        items: {
            __aliasFor: 'glossaryItems',
            term: true,
            slug: true,
            explanation: true
        }
    })
    return { props, revalidate: 1 }
}

export default Page
