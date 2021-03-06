import { React, makeStyles, PropTypes, classNames } from 'common'
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons'
import { color } from 'jss/index'

const useStyles = makeStyles(theme => ({
    prosAndCons: {
        display: 'flex',
        flexDirection: 'row'
    },
    list: {
        flex: 1,
        '&:last-child': {
            marginLeft: '1rem'
        }
    },
    label: {
        fontWeight: 500,
        marginBottom: '0.25rem'
    },
    row: {
        display: 'flex',
        alignItems: 'flex-start',
        lineHeight: '1.5rem'
    },
    disabled: {
        color: color.gray[17]
    },
    icon: {
        fontSize: '1rem',
        color: color.black,
        marginRight: '0.3rem',
        marginTop: '0.25rem'
    }
}))

const ProConList = ({ prosAndCons, className }) => {
    if (!prosAndCons) {
        return null
    }
    const { pros, cons } = prosAndCons
    const classes = useStyles()
    const rootClasses = classNames({
        [className]: className,
        [classes.prosAndCons]: true
    })
    return (
        <div className={rootClasses}>
            <List label="Pro's" symbol="plus" items={pros} classes={classes} />
            <List label="Con's" symbol="minus" items={cons} classes={classes} />
        </div>
    )
}

ProConList.propTypes = {
    prosAndCons: PropTypes.object
}

const List = ({ symbol, label, items, classes }) => {
    return (
        <div className={classes.list}>
            <div className={classes.label}>{label}</div>
            {
                items.map((item, index) => <Row key={index} symbol={symbol} text={item.text} classes={classes}/>)
            }
        </div>
    )
}

const Row = ({ symbol, text, classes }, index) => (
    <div className={classes.row}>
        {
            symbol === 'plus'
                ? <AddIcon className={classes.icon} />
                : <RemoveIcon className={classes.icon} />
        }
        { text }
    </div>
)

export default ProConList
