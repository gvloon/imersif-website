import { React, api, href } from 'common'
import { Link, DynamicZone } from 'components'
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
            <DynamicZone className="block" content={content} />
            <ToolList className="block" tools={tools} />
        </BasicPage>
    )
}

const ToolList = ({ tools, className }) => {
    return (
        <ul className={className}>
            {
                tools.map(({ slug, title }, index) => (
                    <li key={index}>
                        <Link href={href('/tool/[slug]', slug)}>
                            <a>{title}</a>
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}

export const getStaticProps = async context => {
    const [page, tools] = await Promise.all([
        api.get('/software-page'),
        api.get('/tools')
    ])
    return { props: { page, tools }, revalidate: 1 }
}

export default Page
