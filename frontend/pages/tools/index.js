import {React, api} from 'common'
import {Link, Page, getPages} from 'components'

export default (props) => {
    const components = {
        Tools: () => getTools(props)
    }
    return <Page {...props} components={components} />
}

const getTools = ({tools}) => (
    <ul>
        {
            tools.map(({id, name}) => (
                <li key={id}>
                    <Link href="/tools/[id]" data={{id}}>
                        <a>{name}</a>
                    </Link>
                </li>
            ))
        }
    </ul>
)

export const getStaticProps = async () => {
    const pages = getPages('Tools')
    const {data: props} = await api({
        ...pages,
        tools : {
            id: true,
            name: true
        }
    })
    return {props, unstable_revalidate: 1}
}
