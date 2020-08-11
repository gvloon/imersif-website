import { React, api } from 'common'
import { Markdown } from 'components'
import { FullImagePage } from 'components/page'

const Page = ({ data, context }) => {
    const { title, image, content } = data.page
    return (
        <FullImagePage title={title} image={image} context={context} >
            <h1>{title}</h1>
            <Markdown source={content} />
        </FullImagePage>
    )
}

export const getStaticProps = async context => {
    const data = await api({
        page: {
            __aliasFor: 'homePage',
            title: true,
            image: {
                url: true
            },
            content: true
        }
    })
    const props = {
        data,
        context: {
            ...context,
            section: 'home'
        }
    }
    return { props, revalidate: 1 }
}

export default Page
