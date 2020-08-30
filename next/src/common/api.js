import { config, axios } from 'common'
import { jsonToGraphQLQuery } from 'json-to-graphql-query'
import delay from 'delay'

export const api = async query => {
    const headers = {
        'Content-Type': 'application/json'
    }
    query = jsonToGraphQLQuery({ query }, { includeFalsyKeys: true })
    const data = JSON.stringify({ query })
    let response
    try {
//        await delay(3000)
        response = await axios.post(`${config.dockerApiUrl}/graphql`, data, { headers })
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
    return response.data.data
}
