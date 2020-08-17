import { React, api, inspect } from 'common'
import { BasicPage } from 'components/page'

export const Page = ({ context, data }) => {
    const breadcrumb = [
        {
            name: 'Search',
            href: '/search'
        }
    ]
    return (
        <BasicPage context={context} title="test" breadcrumb={breadcrumb}>
            { data.query }
        </BasicPage>
    )
}

export const getServerSideProps = async context => {
    const data = api({
        results: {
            __aliasFor: 'searchAll',
            id: true,
            title: true,



        }
    })
    const props = {
        data: {
            query: context.query.q
        },
        context: {
            section: 'search'
        }

    }
    return { props }
}



export default Page
