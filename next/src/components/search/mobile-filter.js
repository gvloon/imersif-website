import { React, config, makeStyles, classNames } from 'common'
import { Select } from 'components'

const useStyles = makeStyles(theme => ({
    filter: {
        width: '120px',
        marginBottom: '2rem',
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    }
}))

const MobileFilter = ({ className, category, onChange }) => {
    const classes = useStyles()

    const rootClasses = classNames({
        [classes.filter] : !!classes.filter,
        [className]: !!className
    })

    return (
        <Select className={rootClasses} value={category} onChange={onChange}>
            {
                config.categories.map((category, index) => (
                    <Select.Item key={index} value={category}>{category.label}</Select.Item>
                ))
            }
        </Select>
    )
}

export default MobileFilter
