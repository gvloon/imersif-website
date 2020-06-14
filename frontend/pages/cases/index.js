import { React, pageApi, PagePropTypes } from 'common'
import { CaseCategoryList, PageRenderer } from 'components'

const Page = ({ page, context, data }) => {
    context = {
        ...context,
        section: 'cases'
    }
    const components = {
        Categories: props => <CaseCategoryList {...props} categories={data.categories} />
    }
    return <PageRenderer context={context} page={page} components={components} />
}

Page.propTypes = PagePropTypes

export const getStaticProps = async context => {
    const props = await pageApi('Cases', context, {
        categories: {
            __aliasFor: 'caseCategories',
            __args: {
                sort: 'title',
                where: {
                    parent_null: true
                }
            },
            slug: true,
            title: true
        }
    })
    return { props, unstable_revalidate: 1 }
}

export default Page
