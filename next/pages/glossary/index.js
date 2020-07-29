import { React, api } from 'common'
import { Markdown } from 'components'
import { BasicPage } from 'components/page'
import { Glossary } from 'components/glossary'

export const Page = ({ context, data }) => {
    const { title, image, introduction } = data.page
    return (
        <BasicPage context={context} title={title} image={image}>
            <h1>{title}</h1>
            <Markdown source={introduction} />
            <Glossary items={data.items} />
        </BasicPage>
    )
}

export const getStaticProps = async context => {
    const data = await api({
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
            explanation: true
        }
    })
    const props = {
        data,
        context: {
            ...context,
            section: 'glossary'
        }
    }
    return { props, unstable_revalidate: 1 }
}

export default Page
