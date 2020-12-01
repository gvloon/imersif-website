import {React, makeStyles} from 'common'
import CasePlatform from './case-platform'

const useStyles = makeStyles({
    title: {
        paddingRight: '1rem',
        fontWeight: 400
    }
})


const Specs = ({ useCase, className }) => {
    const { topic, url} = useCase
    const classes = useStyles()

    return (
        <table className={className}>
            <tbody>
                <tr>
                    <td className={classes.title}>Platform</td>
                    <td><CasePlatform useCase={useCase} /></td>
                </tr>
                <tr>
                    <td className={classes.title}>Topic</td>
                    <td><Topic value={topic} /></td>
                </tr>
                <tr>
                    <td className={classes.title}>Url</td>
                    <td><URL value={url} /></td>
                </tr>
            </tbody>
        </table>
    )
}

const URL = ({ value }) => {
    if (!value)
        return ''

    return <a href={value}>{ value }</a>
}

const Topic = ({ value }) => {
    return value || ''
}

export default Specs
