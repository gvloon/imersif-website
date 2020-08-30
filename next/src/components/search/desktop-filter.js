import { React, config, makeStyles, classNames } from 'common'
import { RadioGroup } from 'components'

const useStyles = makeStyles(theme => ({
    filter: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            marginRight: '5rem',
            display: 'flex'
        },
        [theme.breakpoints.up('md')]: {
            marginRight: '8rem'
        }
    }
}))

const DesktopFilter = ({ className, category, onChange }) => {
    const classes = useStyles()

    const rootClasses = classNames({
        [classes.filter] : !!classes.filter,
        [className]: !!className
    })

    return (
        <RadioGroup className={rootClasses} value={category} onChange={onChange}>
            {
                config.categories.map((category, index) => (
                    <RadioGroup.Item key={index} value={category}>{category.label}</RadioGroup.Item>
                ))
            }
        </RadioGroup>
    )
}

export default DesktopFilter
