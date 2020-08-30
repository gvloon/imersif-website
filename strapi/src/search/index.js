const axios = require('axios')
const Category = require('./category')
const Pattern = require('./pattern')
const Glossary = require('./glossary')
const Tool = require('./tool')
const Device = require('./device')
const Case = require('./case')
const util = require('util')

class Search {
  constructor() {
    const host = process.env.ELASTIC_HOST || 'localhost'
    const port = process.env.ELASTIC_PORT || 9200
    this.baseUrl = `http://${host}:${port}`
    this.categories = {}
    this.models = {}
    this._initCategory(new Category('patterns', new Pattern()))
    this._initCategory(new Category('glossary', new Glossary()))
    this._initCategory(new Category('software', new Tool()))
    this._initCategory(new Category('hardware', new Device()))
    this._initCategory(new Category('cases', new Case()))
  }

  async indexAll(modelName) {
    const model = this._model(modelName)
    if (!model)
      return

    try {
      await this._axios('put', `/${modelName}`, {
        mappings: {
          properties: model.definition
        }
      })
      const db = strapi.connections.default
      const dbModel = db.model(model.mongoName)
      const docs = await dbModel.find()
      for (let doc of docs) {
        await this._index(model, doc)
      }
    } catch (error) {
      console.error(error)
    }3
  }

  async updateIndex(modelName, doc) {
    const model = this._model(modelName)
    if (!model)
      return

    if (doc._update) {
      await this._index(model, doc._update)
    }
  }

  async deleteIndex(modelName) {
    try {
      return await this._axios('delete', `/${modelName}`)
    } catch (error) {
      console.error(error)
    }
  }

  async suggest(category, text) {
    const response = await this._suggestRequest(category, text)
    return this._suggestResponse(response)
  }

  async search(category, text, pageSize, pageIndex) {
    pageSize = pageSize || 10
    pageIndex = pageIndex || 0
    const response = await this._searchRequest(category, text, pageSize, pageIndex)
    console.log('search response: ' + util.inspect(response))
    const data = this._searchResponse(response)
    data.pageSize = pageSize
    data.pageIndex = pageIndex
    console.log('search: ' + util.inspect(data))
    return data
  }

  _initCategory(category) {
    this.categories[category.name] = category
    for (let model of category.models) {
      this.models[model.name] = model
    }
  }

  _model(modelName) {
    if (!modelName) {
      return null
    }
    if (this.models.hasOwnProperty(modelName)) {
      return this.models[modelName]
    }
    throw new Error('Unknown model name: ' + modelName)
  }

  _category(categoryName) {
    if (!categoryName) {
      return null
    }
    if (this.categories.hasOwnProperty(categoryName)) {
      return this.categories[categoryName]
    }
    throw new Error('Unknown category name: ' + categoryName)
  }

  async _index(model, doc) {
    try {
      const id = model.getId(doc)
      return await this._axios('put',`/${model.name}/_doc/${id}`, model.index(doc))
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

  async _suggestRequest(categoryName, text) {
    const category = this._category(categoryName)
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
    return await this._axios('post', category ? category.getPath() : '/_search', doc)
  }

  _suggestResponse(data) {
    const map = {}
    for (let index in data.suggest) {
      let options = data.suggest[index][0].options
      for (let option of options) {
        const model = this._model(option._index)
        if (model) {
          const id = `${option._index}_${option._id}`
          const result = map.hasOwnProperty(id) ? map[id] : map[id] = model.getSuggestResult(option._id, option._source)
          result.type = option._index
          result.score += option._score
        }
      }
    }
    const results = Object.values(map)
    results.sort((a, b) => b.score - a.score)
    return results.slice(0, 10)
  }

  async _searchRequest(categoryName, text, size, page) {
    const category = this._category(categoryName)
    const data = {
      size,
      from: page * size,
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query: text,
                operator: 'and',
                fields: ["*"],
                fuzziness: 1
              }
            },
            {
              multi_match: {
                query: text,
                operator: 'and',
                type: "phrase_prefix",
                fields: ["*"]
              }
            }
          ]
        }
      },
      highlight: {
        fields: {
          '*': {}
        },
        order: 'score'
      }
    }
    return await this._axios('post', category ? category.getPath() : '/_search', data)
  }

  _searchResponse(data) {
    const response = {
      resultCount: data.hits.total.value,
      results: []
    }
    data.hits.hits.forEach(hit => {
      const model = this._model(hit._index)
      if (model) {
        const result = model.getSearchResult(hit._id, hit._source, hit.highlight)
        result.highlight = result.highlight && result.highlight.length ? result.highlight[0] : ''
        result.type = model.name
        response.results.push(result)
      }
    })
    return response
  }
}

module.exports = new Search()
