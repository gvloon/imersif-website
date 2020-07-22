import { React, makeStyles } from 'common'

const useStyles = makeStyles(theme => ({
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    label: {
        whiteSpace: 'nowrap',
        paddingRight: '20px'
    },
    value: {
        width: '100%'
    }
}))

const Row = ({ data }) => {
    const classes = useStyles()
    return (
        <tr>
            <th className={classes.label}>{data.label}</th>
            <td className={classes.value}>{data.value}</td>
        </tr>
    )
}

const Specifications = ({ data }) => {
    return (
        <table>
            {
                data.map((item, index) => <Row key={index} data={item} />)
            }
        </table>
    )
}

export default Specifications
