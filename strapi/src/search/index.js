const axios = require('./axios')
const Module = require('../module')
const Category = require('./category')
const Pattern = require('./pattern')
const Glossary = require('./glossary')
const Tool = require('./tool')
const Device = require('./device')
const Case = require('./case')

class Search extends Module {
  constructor() {
    super()

    this.categories = {}
    this._initCategory(new Category('patterns', new Pattern()))
    this._initCategory(new Category('glossary', new Glossary()))
    this._initCategory(new Category('software', new Tool()))
    this._initCategory(new Category('hardware', new Device()))
    this._initCategory(new Category('cases', new Case()))
  }

  async indexAll() {
    for (let name in this.models) {
      await this.models[name].indexAll()
    }
  }

  async suggest(category, text) {
    const response = await this._suggestRequest(category, text)
    return this._suggestResponse(response)
  }

  async search(categoryName, text, pageSize, pageIndex) {
    const category = this.category(categoryName)
    pageSize = pageSize || 10
    pageIndex = pageIndex || 0
    const response = await this._searchRequest(category, text, pageSize, pageIndex)
    const data = this._searchResponse(response)
    data.text = text
    data.category = category ? category.name : null
    data.pageSize = pageSize
    data.pageCount = Math.ceil(data.resultCount / pageSize),
    data.pageIndex = pageIndex
    return data
  }

  _initCategory(category) {
    this.categories[category.name] = category
    for (let model of category.models) {
      this.register(model)
    }
  }


  category(categoryName) {
    if (!categoryName) {
      return null
    }
    if (this.categories.hasOwnProperty(categoryName)) {
      return this.categories[categoryName]
    }
    throw new Error('Unknown category name: ' + categoryName)
  }

  async _suggestRequest(categoryName, text) {
    const category = this.category(categoryName)
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
    return await axios('post', category ? category.getPath() : '/_search', doc)
  }

  _suggestResponse(data) {
    const map = {}
    for (let index in data.suggest) {
      let options = data.suggest[index][0].options
      for (let option of options) {
        const model = this.model(option._index)
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

  async _searchRequest(category, text, size, page) {
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
    return await axios('post', category ? category.getPath() : '/_search', data)
  }

  _searchResponse(data) {
    const response = {
      resultCount: data.hits.total.value,
      results: []
    }
    data.hits.hits.forEach(hit => {
      const model = this.model(hit._index)
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
