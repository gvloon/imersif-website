import React from 'react'

const pageContext = {
    search: null
}

export const PageContext = React.createContext(pageContext)

const loaderContext = {
    loading: false,
    setLoading: () => {}
}

export const LoaderContext = React.createContext(loaderContext)