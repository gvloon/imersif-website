import { React, getStyle, makeStyles, PropTypes, classNames } from 'common'
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons'
import { color } from 'jss/index'

const spacing = 0.5

const useStyles = makeStyles(theme => ({
    prosAndCons: {
        display: 'flex',
        flexDirection: 'row'
    },
    list: {
        flex: 1,
        marginTop: '-' + spacing + 'rem',
        marginBottom: '-' + spacing + 'rem',
        '&:last-child': {
            marginLeft: '1rem'
        }
    },
    label: {
        marginTop: spacing + 'rem',
        marginBottom: '-' + spacing + 'rem',
        fontWeight: 'bold',
        fontSize: '0.8rem'
    },
    row: {
        marginTop: spacing + 'rem',
        marginBottom: spacing + 'rem',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #666666',
        textTransform: 'uppercase',
        fontSize: '0.8rem'
    },
    disabled: {
        color: color.gray[17]
    },
    icon: {
        fontSize: '1rem',
        color: color.black,
        marginLeft: '0.3rem',
        marginRight: '0.3rem'
    }
}))

const ProConList = ({ prosAndCons, className, ...rest }) => {
    if (!prosAndCons) {
        return null
    }
    const { pros, cons } = prosAndCons
    const classes = useStyles()
    const prosAndConsClasses = classNames({
        [className]: className,
        [classes.prosAndCons]: true
    })
    return (
        <div className={prosAndConsClasses} {...rest}>
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
