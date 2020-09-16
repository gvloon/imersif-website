import axios from 'axios'
import config from 'config'

export const fetch = async options => {
    if (options.headers) {
        options.headers['Content-Type'] = 'application/json'
    } else {
        options.headers = {
            'Content-Type': 'application/json'
        }
    }
    options.url = `${config.apiUrl}${options.url}`
    let response
    try {
        response = await axios(options)
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            throw error.response.data.errors[0]
        } else {
            throw new Error(error.message)
        }
    }
    if (response.data.errors && response.data.errors.length) {
        throw new Error(response.data.errors[0].message)
    }
    return response.data
}

export const get = async url => {
    return fetch({
        method: 'get',
        url
    })
}
