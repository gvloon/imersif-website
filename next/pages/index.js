import { React, api } from 'common'
import { Markdown } from 'components'
import { FullImagePage } from 'components/page'

const Page = ({ page }) => {
    const { title, image, content } = page

    const context = {
        title,
        search: {
            desktop: null,
            mobile: null
        }
    }

    return (
        <FullImagePage context={context} image={image}>
            <h1>{title}</h1>
            <Markdown source={content} />
        </FullImagePage>
    )
}

export const getStaticProps = async context => {
    const props = await api({
        page: {
            __aliasFor: 'homePage',
            title: true,
            image: {
                url: true
            },
            content: true
        }
    })
    return { props, revalidate: 1 }
}

export default Page
