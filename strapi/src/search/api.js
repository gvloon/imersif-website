const axios = require('axios')

class Api {
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
    const data = await this._post(`/${name}/_search`, {
      query: {
        multi_match: {
          query: value,
          fields,
          fuzziness: "AUTO"
        }
      }
    })
    return data.hits.hits
  }

  async suggest(name, value) {
    const doc = {
      suggest: {}
    }
    const tokens = value.split(/\s+/)
    for (let i in tokens) {
      doc.suggest[i.toString()] = {
        prefix: tokens[i],
        completion: {
          field: 'suggest',
          fuzzy: {
            fuzziness: 2
          }
        }
      }
    }
    const data = await this._post(`/${name}/_search`, doc)
    return this.mergeSuggestResult(data)
  }

  mergeSuggestResult(data) {
    const map = {}
    for (let index in data.suggest) {
      let options = data.suggest[index][0].options
      for (let option of options) {
        const {_id: id, _score: score, _index: type, _source: source} = option
        const result = map.hasOwnProperty(id) ? map[id] : map[id] = {
          type,
          id,
          title: source.title,
          score: 0
        }
        result.score += score
      }
    }
    const results = Object.values(map)
    results.sort((a, b) => b.score - a.score)
    return results.slice(0, 10)
  }

  async _put(url, data) {
    const baseUrl = this.baseUrl
    url = `${baseUrl}${url}`
    data = JSON.stringify(data)
    const response = await axios.put(
      url,
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    return response.data
  }

  async _post(url, data) {
    const baseUrl = this.baseUrl
    url = `${baseUrl}${url}`
    data = JSON.stringify(data)
    const response = await axios.post(
      url,
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    return response.data
  }
}

module.exports = new Api()
