import { React, api } from 'common'
import { Link, Markdown } from 'components'
import { BasicPage } from 'components/page'

const Page = ({ context, data }) => {
    const { title, image, content } = data.page

    const breadcrumb = [
        {
            name: 'Software',
            href: '/software'
        }
    ]
    return (
        <BasicPage title={title} image={image} context={context} breadcrumb={breadcrumb}>
            <Markdown source={content} />
            <ToolList tools={data.tools} />
        </BasicPage>
    )
}

const ToolList = ({ tools }) => {
    return (
        <ul>
            {
                tools.map(({ slug, title }, index) => (
                    <li key={index}>
                        <Link href="/software/[slug]" as={`/software/${slug}`}>
                            <a>{title}</a>
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}

export const getStaticProps = async context => {
    const data = await api({
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
    const props = {
        data,
        context: {
            ...context,
            section: 'software'
        }
    }
    return { props, revalidate: 1 }
}

export default Page
