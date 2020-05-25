import {React, api} from 'common'
import {Link, Page, getPages} from 'components'

export default (props) => {
    const components = {
        Patterns: () => getPatterns(props)
    }
    return <Page {...props} components={components} />
}

const getPatterns = ({patterns}) => (
    <ul>
        {
            patterns.map(({id, title}) => (
                <li key={id}>
                    <Link href="/patterns/[id]" data={{id}}>
                        <a>{title}</a>
                    </Link>
                </li>
            ))
        }
    </ul>
)

export const getStaticProps = async () => {
    const pages = getPages('Patterns')
    const {data: props} = await api({
        ...pages,
        patterns : {
            id: true,
            title: true
        }
    })
    return {props, unstable_revalidate: 1}
}
