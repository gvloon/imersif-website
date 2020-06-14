import { React, PagePropTypes, pageApi } from 'common'
import { PageRenderer, Glossary } from 'components'

export const Page = ({ page, context, data }) => {
    context = {
        ...context,
        section: 'glossary'
    }
    const components = {
        Glossary: () => <Glossary items={data.items} />
    }
    return <PageRenderer context={context} page={page} components={components} />
}

Page.propTypes = PagePropTypes

export const getStaticProps = async context => {
    const props = await pageApi('Glossary', context, {
        items: {
            __aliasFor: 'glossaryItems',
            term: true,
            explanation: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export default Page
