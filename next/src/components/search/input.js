import { React, PropTypes, classNames, config, _, api, withStyles, withRouter, PageContext } from 'common'
import { Link, Select } from 'components'
import { Popper, InputBase, Divider, ClickAwayListener, IconButton } from '@material-ui/core'
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons'
import { color } from 'jss/index'
import url from 'url'

const styles = theme => ({
    root: {
        backgroundColor: color.white,
        borderRadius: '5px',
        height: '30px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rootMobile: {
        height: '50px',
        backgroundColor: color.black
    },
    inputContainer: {
        display: 'flex',
        flex: 1
    },
    inputContainerMobile: {
    },
    inputRoot: {
        marginLeft: '20px',
        flex: 1,
        fontSize: '14px'
    },
    inputMobile: {
        marginLeft: '0px',
        color: color.white
    },
    categorySelect: {
        width: '90px'
    },
    iconButton: {
        padding: 10
    },
    divider: {
        height: 28,
        margin: 0
    },
    popper: {
        zIndex: theme.zIndex.modal
    },
    suggestions: {
        marginTop: '5px',
        color: '#ffff',
        backgroundColor: '#222',
        borderRadius: '5px'
    },
    suggestion: {
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        borderTop: '1px solid #888',
        '&:first-child': {
            borderTop: 0
        },
        '& a': {
            color: 'white'
        }
    },
    suggestionTitle: {
        fontSize: '0.95rem',
        fontWeight: 400
    },
    suggestionType: {
        fontSize: '0.9rem',
        color: '#999'
    },
    dropDownLabel: {
        color: 'black',
        height: '30px',
        background: 'none',
        position: 'relative',
        padding: '0px 10px',
        textTransform: 'none',
        borderRadius: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        boxShadow: 'none',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '20px',
        textDecoration: 'none',
        margin: '0px',
        display: 'inline-flex',
        '&:hover, &:focus, &:active': {
            color: 'black',
            backgroundColor: '#eee',
            boxShadow: 'none',
            borderRadius: 0,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5
        }
    },
    dropdownLink: {
        '&,&:hover,&:focus': {
            color: 'inherit',
            textDecoration: 'none',
            display: 'flex',
            padding: '0.75rem 1.25rem 0.75rem 0.75rem'
        }
    },
    rightButton: {
        marginRight: '-12px'
    }
})

class Input extends React.Component
{
    constructor(props, context)
    {
        super(props)

        const search = props.mobile ? context.search.mobile : context.search.desktop
        this.state = {
            root: null,
            focus: false,
            text: '',
            category: _.find(config.categories, category => category.value === search) || config.categories[0],
            results: []
        }
    }

    render = () => {
        const { className, classes, categoriesEnabled, mobile, onSearch, onClose } = this.props
        const { root, category, text, focus, results } = this.state

        const rootClass = classNames({
            [classes.root]: true,
            [className]: true,
            [classes.rootMobile]: mobile
        })
        const inputClass = classNames({
            [classes.inputRoot]: true,
            [classes.inputMobile]: mobile
        })

        return (
            <div ref={this.onRoot} className={rootClass}>
                {
                    categoriesEnabled &&
                    <>
                        <Select className={classes.categorySelect} border={false} alignment="center" value={category} onChange={this.onChangeCategory}>
                            {
                                config.categories.map((category, index) => (
                                    <Select.Item key={index} value={category}>{category.label}</Select.Item>
                                ))
                            }
                        </Select>
                        <Divider className={classes.divider} orientation="vertical" />
                    </>
                }
                <ClickAwayListener onClickAway={this.onClickAway}>
                    <div className={classes.inputContainer}>
                        <InputBase
                            className={inputClass}
                            placeholder={category.placeholder}
                            onChange={this.onChangeText}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onKeyUp={this.onKeyUp}
                            autoFocus={true}
                            value={text}
                            inputProps={{ 'aria-label': 'search XR Patterns' }}
                        />
                        <Popper
                            className={classes.popper}
                            open={!!text && focus}
                            anchorEl={root}
                            style={{
                                width: root ? root.clientWidth : null
                            }}
                            role="presentation"
                        >
                            <div className={classes.suggestions}>
                                <Results results={results} classes={classes} />
                            </div>
                        </Popper>
                    </div>
                </ClickAwayListener>
                {
                    mobile
                        ? <IconButton className={classes.rightButton} color="inherit" aria-label="show drawer" onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                        : <IconButton className={classes.rightButton} color="inherit" aria-label="show drawer" onClick={onSearch}>
                            <SearchIcon />
                        </IconButton>
                }

            </div>
        )
    }

    onRoot = c => {
        this.setState({
            root: c
        })
    }

    onChangeCategory = category => {
        this.setState({ category }, this.updateResults)
    }

    onChangeText = ev => {
        this.setState({
            text: ev.currentTarget.value
        }, this.updateResults)
    }

    onFocus = ev => {
        this.setState({
            focus: true
        })
    }

    onBlur = ev => {
        this.setState({
            focus: false
        })
    }

    onKeyUp = ev => {
        if (ev.key === "Enter") {
            const { text, category } = this.state
            this.setState({
                text: ''
            })
            const { router } = this.props
            const query = {
                q: text
            }
            if (category.value) {
                query.c = category.value
            }
            router.push(url.format({
                pathname: '/search',
                query
            }))
        }
    }

    onClickAway = ev => {
        this.setState({
            focus: false
        })
    }

    async updateResults()
    {
        const { category, text } = this.state
        if (!text) {
            this.setState({
                results: null
            })
            return
        }
        const tmp = url.format({
            pathname: '/suggest',
            query: { text, category: category.value }
        })
        const results = await api.get(tmp)
        this.setState({ results })
    }
}


const Results = ({ results, classes }) => {
    if (!results || !results.length) {
        return (
            <div className={classes.suggestion}>
                <div className={classes.suggestionTitle}>No results</div>
            </div>
        )
    }
    return results.map((result, index) => (
        <div key={index} className={classes.suggestion}>
            <Link href={result.link.href} as={result.link.as}>
                <a>
                    <div className={classes.suggestionTitle}>{result.title}</div>
                    <div className={classes.suggestionType}>{result.type}</div>
                </a>
            </Link>
        </div>
    ))
}

Input.contextType = PageContext
Input.propTypes = {
    className: PropTypes.string,
    categoriesEnabled: PropTypes.bool,
    mobile: PropTypes.bool,
    onSearch: PropTypes.func,
    onClose: PropTypes.func
}

export default withStyles(styles)(withRouter(Input))
