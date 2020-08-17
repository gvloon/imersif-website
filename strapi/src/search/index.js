const axios = require('axios')
const Pattern = require('./pattern')
const Glossary = require('./glossary')
const Tool = require('./tool')
const Device = require('./device')
const Case = require('./case')

class Search {
  constructor() {
    const host = process.env.ELASTIC_HOST || 'localhost'
    const port = process.env.ELASTIC_PORT || 9200
    this.baseUrl = `http://${host}:${port}`
    this.models = {}
    this._initModel(new Pattern())
    this._initModel(new Glossary())
    this._initModel(new Tool())
    this._initModel(new Device())
    this._initModel(new Case())
  }

  async indexAll(type) {
    const model = this._model(type)
    if (!model)
      return

    try {
      await this._axios('put', `/${type}`, {
        mappings: {
          properties: model.definition
        }
      })
      const db = strapi.connections.default
      const dbModel = db.model(model.name)
      const docs = await dbModel.find()
      for (let doc of docs) {
        await this._index(model, doc)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async updateIndex(type, doc) {
    const model = this._model(type)
    if (!model)
      return

    if (doc._update) {
      await this._index(model, doc._update)
    }
  }

  async deleteIndex(type) {
    try {
      return await this._axios('delete', `/${type}`)
    } catch (error) {
      console.error(error)
    }
  }

  async suggest(type, text) {
    try {
      const response = await this._suggestRequest(type, text)
      return this._suggestResponse(response)
    } catch (error) {
      console.error(error)
    }
  }

  async search(type, text) {
    try {
      const response = await this._searchRequest(type, text)
      return this._searchResponse(response)
    } catch (error) {
      console.error(error)
    }
  }

  _initModel(model) {
    this.models[model.type] = model
  }

  _model(type) {
    return this.models.hasOwnProperty(type) ? this.models[type] : null
  }

  async _index(model, doc) {
    try {
      return await this._axios('put',`/${model.type}/_doc/${doc._id}`, model.index(doc))
    } catch (error) {
      console.error(error)
    }
  }

  async _axios(method, url, data) {
    try {
      const response = await axios({
        method,
        url: `${this.baseUrl}${url}`,
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return response.data
    } catch (error) {
      console.log(error && error.response && error.response.data && error.response.data.error ? error.response.data.error : error)
    }
  }

  async _suggestRequest(type, text) {
    const doc = {
      suggest: {}
    }
    const tokens = text.split(/\s+/)
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
    return await this._axios('post', type ? `/${type}/_search` : '/_search', doc)
  }

  _suggestResponse(data) {
    const map = {}
    for (let index in data.suggest) {
      let options = data.suggest[index][0].options
      for (let option of options) {
        const { _index:type, _id: id, _score: score, _source: source } = option
        const model = this._model(type)
        if (model) {
          const result = map.hasOwnProperty(id) ? map[id] : map[id] = {
            type,
            id,
            title: model.getSuggestTitle(source),
            score: 0
          }
          result.score += score
        }
      }
    }
    const results = Object.values(map)
    results.sort((a, b) => b.score - a.score)
    return results.slice(0, 10)
  }

  async _searchRequest(type, text) {
    const data = {
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query: text,
                fields: ["*"],
                fuzziness: 2
              }
            },
            {
              multi_match: {
                query: text,
                type: "phrase_prefix",
                fields: ["*"]
              }
            }
          ]
        }
      }
    }
    return await this._axios('post', type ? `/${type}/_search` : '/_search', data)
  }

  _searchResponse(data) {
    const results = {}
    data.hits.hits.forEach(({ _index:type, _id: id, _score: score, _source: source }) => {
      const model = this._model(type)
      if (model) {
        const items = results.hasOwnProperty(type) ? results[type] : results[type] = []
        items.push({
          type,
          id,
          source: model.getSearchSource(source),
          score
        })
      }
    })
    return results
  }
}

module.exports = new Search()
