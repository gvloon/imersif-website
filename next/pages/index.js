import { React, PagePropTypes, pageApi } from 'common'
import { PageRenderer } from 'components'

const Page = ({ page, context }) => {
    context = {
        ...context,
        section: 'home'
    }
    return <PageRenderer context={context} page={page} />
}

export const getStaticProps = async context => {
    const props = await pageApi('Home', context, {})
    return { props, unstable_revalidate: 1 }
}

Page.propTypes = PagePropTypes

export default Page
