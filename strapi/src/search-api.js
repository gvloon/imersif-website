const axios = require('axios')

class SearchAPI {
  constructor() {
    const host = process.env.ELASTIC_HOST || 'localhost'
    const port = process.env.ELASTIC_PORT || 9200
    this.baseUrl = `http://${host}:${port}`
  }

  async createIndex(name, properties) {
    try {
      return await this._put(`/${name}`, {
        mappings: {
          properties
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  async index(name, id, document) {
    try {
      return await this._put(`/${name}/_doc/${id}`, document)
    } catch (error) {
      console.error(error)
    }
  }

  async fuzzy(name, fields, value) {
    return await this._post(`/${name}/_search`, {
      query: {
        multi_match: {
          query: value,
          fields,
          fuzziness: "AUTO"
        }
      }
    })
  }

  async _put (url, data) {
    const baseUrl = this.baseUrl
    const response = await axios.put(
      `${baseUrl}${url}`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    return response.data
  }

  async _post (url, data) {
    const baseUrl = this.baseUrl
    const response = await axios.post(
      `${baseUrl}${url}`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    return response.data
  }
}

module.exports = new SearchAPI()
