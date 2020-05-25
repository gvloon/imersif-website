import {React, api} from 'common'
import {Link, Page, getPages} from 'components'

export default (props) => {
    const {sectors} = props
    const components = {
        Sectors: () => getSectors(sectors)
    }
    return <Page {...props} components={components} />
}

const getSectors = (sectors) => (
    <ul>
        {
            sectors.map(({id, name}) =>
                <li key={id}>
                    <Link href="/cases/sectors/[id]" data={{id}}>
                        <a>{name}</a>
                    </Link>
                </li>
            )
        }
    </ul>
)

export const getStaticProps = async () => {
    const pages = getPages('Cases')
    const {data: props} = await api({
        ...pages,
        sectors: {
            id: true,
            name: true
        }
    })
    return {props, unstable_revalidate: 1}
}
