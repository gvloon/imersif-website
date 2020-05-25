import React from 'react'
import {api} from 'common'
import {Page, getPages} from 'components'

export default (props) => {
    return <Page {...props} />
}

export const getStaticProps = async () => {
    const pages = getPages('Home')
    const {data: props} = await api({
        ...pages
    })
    return {props, unstable_revalidate: 1}
}

