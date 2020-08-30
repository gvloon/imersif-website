import { React, api } from 'common'
import { Link, Markdown } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ page, tools }) => {
    const { title, image, content } = page

    const context = {
        title,
        section: 'software',
        search: {
            desktop: 'software',
            mobile: null
        },
        breadcrumb: [
            {
                name: 'Software',
                href: '/software'
            }
        ]
    }

    return (
        <BasicPage context={context} image={image}>
            <Markdown source={content} />
            <ToolList tools={tools} />
        </BasicPage>
    )
}

const ToolList = ({ tools }) => {
    return (
        <ul>
            {
                tools.map(({ slug, title }, index) => (
                    <li key={index}>
                        <Link href="/tool/[slug]" as={`/tool/${slug}`}>
                            <a>{title}</a>
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}

export const getStaticProps = async context => {
    const props = await api({
        page: {
            __aliasFor: 'softwarePage',
            title: true,
            image: {
                url: true
            },
            introduction: true
        },
        tools: {
            slug: true,
            title: true
        }
    })
    return { props, revalidate: 1 }
}

export default Page
