import { React, PagePropTypes, pageApi } from 'common'
import { Link, PageRenderer } from 'components'

export const Page = ({ page, context, data }) => {
    context = {
        ...context,
        section: 'patterns'
    }
    const components = {
        Patterns: () => getPatterns(data)
    }
    return <PageRenderer context={context} page={page} components={components} />
}

Page.propTypes = PagePropTypes

const getPatterns = ({ patterns }) => (
    <ul>
        {
            patterns.map(({ slug, title }, index) => (
                <li key={index}>
                    <Link href="/patterns/[slug]" as={`/patterns/${slug}`}>
                        <a>{title}</a>
                    </Link>
                </li>
            ))
        }
    </ul>
)

export const getStaticProps = async context => {
    const props = await pageApi('Patterns', context, {
        patterns: {
            slug: true,
            title: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export default Page
