import { config, axios } from 'common'
import { jsonToGraphQLQuery } from 'json-to-graphql-query'

export const api = async query => {
    const headers = {
        'Content-Type': 'application/json'
    }
    query = jsonToGraphQLQuery({ query }, { includeFalsyKeys: true })
    const data = JSON.stringify({ query })
    let response
    try {
        response = await axios.post(`${config.dockerApiUrl}/graphql`, data, { headers })
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            throw error.response.data.errors[0]
        } else {
            throw new Error(error.message)
        }
    }
    console.log(JSON.stringify(response.data))
    if (response.data.errors && response.data.errors.length) {
        throw new Error(response.data.errors[0].message)
    }
    return response.data.data
}

export const pageApi = async (type, context, query) => {
    const pageQuery = {
        basic_page: {
            __aliasFor: 'pageByType',
            __args: { type },
            title: true,
            content: true,
            image: {
                url: true
            }
        },
        parallax_page: {
            __aliasFor: 'parallaxPageByType',
            __args: { type },
            title: true,
            content: true,
            parallax_content: true,
            parallax_image: {
                url: true
            }
        }
    }
    const response = await api({ ...pageQuery, ...query })
    const data = {}
    const page = {}
    for (const i in response) {
        if (response.hasOwnProperty(i)) {
            if (pageQuery.hasOwnProperty(i)) {
                page[i] = response[i]
            } else {
                data[i] = response[i]
            }
        }
    }
    return { page, context, data }
}
