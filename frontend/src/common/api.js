import Config from 'config'
import axios from 'axios'
import { jsonToGraphQLQuery } from 'json-to-graphql-query'

// export default async (api) => {
//     try {
//         const response = await axios.get(`${Config.apiUrl}/${api}`)
//         return response.status === 200 ? {success: true, data: response.data} : {success: false, data: {}}
//     } catch (error) {
//         return {success: false, data: {}}
//     }
// }

export default async (query) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        query = jsonToGraphQLQuery({query}, { includeFalsyKeys: true})
        const data = JSON.stringify({query})
        const response = await axios.post(`${Config.apiUrl}/graphql`, data, {headers})
        if (response.status !== 200)
            return {success: false, data: {}}
        return {success: true, data: response.data.data}
    } catch (error) {
        console.log(error)
        return {success: false, data: {}}
    }
}