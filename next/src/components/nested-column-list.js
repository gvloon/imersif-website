import { React, PropTypes, classNames, makeStyles } from 'common'

const verticalItemSpacing = 0.6
const horizontalItemSpacing = 0.4
const verticalSubItemsPadding = 0.4
const horizontalItemPadding = 0.8
const titleHeight = 2.5
const itemHeight = 1.8
const subItemHeight = 1.8

const List = ({ items, title, className }) => {
    if (!items || !items.length) {
        return null
    }
    const data = analyzeItems(items)
    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '1rem'
        },
        list: {
            marginTop: '-' + verticalItemSpacing + 'rem',
            marginBottom: '-' + verticalItemSpacing + 'rem',
            marginLeft: '-' + horizontalItemSpacing + 'rem',
            marginRight: '-' + horizontalItemSpacing + 'rem',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            [theme.breakpoints.up('xs')]: {
                height: getMinimalHeight(data, 2) + 'rem'
            },
            [theme.breakpoints.up('sm')]: {
                height: getMinimalHeight(data, 3) + 'rem'
            }
        },
        container: {
            marginTop: verticalItemSpacing + 'rem',
            marginBottom: verticalItemSpacing + 'rem',
            [theme.breakpoints.up('xs')]: {
                width: '50%'
            },
            [theme.breakpoints.up('sm')]: {
                width: '33.3333%'
            }
        },
        content: {
            marginLeft: horizontalItemSpacing + 'rem',
            marginRight: horizontalItemSpacing + 'rem'
        },
        title: {
            height: titleHeight + 'rem',
            paddingLeft: horizontalItemPadding + 'rem',
            paddingRight: horizontalItemPadding + 'rem',
            backgroundColor: 'black',
            color: 'white',
            display: 'flex',
            fontWeight: '400',
            alignItems: 'center'
        },
        items: {
            backgroundColor: '#eeeeee',
            paddingTop: verticalSubItemsPadding + 'rem',
            paddingBottom: verticalSubItemsPadding + 'rem'
        },
        item: {
            height: itemHeight + 'rem',
            paddingLeft: horizontalItemPadding + 'rem',
            paddingRight: horizontalItemPadding + 'rem',
            display: 'flex',
            alignItems: 'center'
        },
        subItem: {
            height: subItemHeight + 'rem',
            paddingLeft: (2 * horizontalItemPadding) + 'rem',
            paddingRight: horizontalItemPadding + 'rem',
            display: 'flex',
            alignItems: 'center'
        }
    }))
    const classes = useStyles()
    const rootClasses = classNames({
        [className]: !!className,
        [classes.root]: true
    })
    return (
        <div className={rootClasses}>
            {
                title &&
                    <h2>{title}</h2>
            }
            <div className={classes.list}>
                {
                    items.map((item, index) => (
                        <Item key={index} classes={classes} item={item} />
                    ))
                }
            </div>
        </div>
    )
}

const analyzeItems = items => {
    const data = {
        max: 0,
        min: 0,
        items: []
    }
    items.forEach(item => {
        item = {
            ...item,
            height: getHeightForItem(item)
        }
        data.max += item.height + 2 * verticalItemSpacing
        if (item.height > data.min) {
            data.min = item.height
        }
        data.items.push(item)
    })
    return data
}

const getMinimalHeight = (data, columnCount) => {
    if (isValidHeight(data.items, columnCount, data.min)) {
        return data.min
    }
    let invalid = data.min
    let valid = data.max
    while (valid > invalid + 0.05) {
        const candidate = 0.5 * (invalid + valid)
        if (isValidHeight(data.items, columnCount, candidate)) {
            valid = candidate
        } else {
            invalid = candidate
        }
    }
    return valid
}

const isValidHeight = (items, columnCount, height) => {
    let itemIndex = 0
    let columnIndex = 0
    let currentHeight = 0
    while (itemIndex < items.length && columnIndex < columnCount) {
        const itemHeight = items[itemIndex].height
        currentHeight += itemHeight + 2 * verticalItemSpacing
        if (currentHeight > height) {
            currentHeight = itemHeight + 2 * verticalItemSpacing
            columnIndex++
        }
        itemIndex++
    }
    return columnIndex < columnCount
}

const getHeightForItem = (item) => {
    let height = 2 * verticalSubItemsPadding + item.children.length * itemHeight + titleHeight
    item.children.forEach(child => {
        if (child.children) {
            height += child.children.length * subItemHeight
        }
    })
    return height
}

List.propTypes = {
    items: PropTypes.array,
    title: PropTypes.string
}

const Item = ({ classes, item }) => {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.title}>{item.value}</div>
                <div className={classes.items}>
                    {
                        item.children.map((child, index) => (
                            <React.Fragment key={index}>
                                <div className={classes.item}>{child.value}</div>
                                {
                                    child.children ? child.children.map((subChild, index) => (
                                        <div key={index} className={classes.subItem}>{subChild.value}</div>
                                    )) : []
                                }
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default List
