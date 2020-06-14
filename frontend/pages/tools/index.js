import { React, PagePropTypes, pageApi } from 'common'
import { Link, PageRenderer } from 'components'

const Page = ({ page, context, data }) => {
    context = {
        ...context,
        section: 'tools'
    }
    const components = {
        Tools: () => getTools(data)
    }
    return <PageRenderer context={context} page={page} components={components} />
}

Page.propTypes = PagePropTypes

const getTools = ({ tools }) => {
    return (
        <ul>
            {
                tools.map(({ slug, title }, index) => (
                    <li key={index}>
                        <Link href="/tools/[slug]" as={`/tools/${slug}`}>
                            <a>{title}</a>
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}

export const getStaticProps = async context => {
    const props = await pageApi('Tools', context, {
        tools: {
            slug: true,
            title: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export default Page
