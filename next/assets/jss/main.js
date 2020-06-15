export const container = theme => ({
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
    '@media (min-width: 1024px)': {
        maxWidth: '1024px'
    }
})

export const contentPadding = theme => ({
    paddingLeft: '1rem',
    paddingRight: '1rem',
    [theme.breakpoints.up('xs')]: {
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
    },
    [theme.breakpoints.up('sm')]: {
        paddingLeft: '2rem',
        paddingRight: '2rem'
    },
    [theme.breakpoints.up('md')]: {
        paddingLeft: '2.5rem',
        paddingRight: '2.5rem'
    }
})

export const defaultFont = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '300',
    lineHeight: '1.5rem'
}

export const merge = (...rest) => {
    const result = {}
    for (const obj of rest) {
        for (const name in obj) {
            const value = obj[name]
            if (result.hasOwnProperty(name) && typeof value === 'object') {
                result[name] = Object.assign(result[name], value)
            } else {
                result[name] = value
            }
        }
    }
    return result
}
