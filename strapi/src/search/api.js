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
      _source: "suggest",
      suggest: {}
    }
    const tokens = value.split(/\s+/)
    for (let i in tokens) {
      doc.suggest[i.toString()] = {
        prefix: tokens[i],
        completion: {
          field: 'suggest',
          skip_duplicates: true,
          fuzzy: {
            fuzziness: 2
          }
        }
      }
    }
    const data = await this._post(`/${name}/_search`, doc)
    return this.mergeSuggestResult(tokens, data)
  }

  mergeSuggestResult(tokens, data) {
    const results = []
    for (let i in tokens) {
      const options = data.suggest[i.toString()][0].options
      if (options.length > 0) {
        if (results.length === 0) {
          for (let option of options) {
            results.push({
              values: { [option.text]: true },
              score: option._score,
              text: option.text
            })
          }
        } else {
          for (let result of results) {
            for (let option of options) {
              if (!result.values.hasOwnProperty(option.text)) {
                result.values[option.text] = true
                result.score += option._score
                result.text += ' ' + option.text
              }
            }
          }
        }
      }
    }
    results.sort((a, b) => a.score - b.score)
    return results.slice(0, 10)
  }

  async _put (url, data) {
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

  async _post (url, data) {
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
