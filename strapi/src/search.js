const api = require('./search-api')

class Search {
  constructor(name, modelName, config) {
    this.name = name
    this.modelName = modelName
    this.config = config
    this.keys = []
    for (let key in config) {
      if (config.hasOwnProperty(key)) {
        this.keys.push(key)
      }
    }
  }

  async update(model) {
    const data = model._update
    if (data) {
      const document = {}
      this.keys.forEach(key => {
        document[key] = data[key]
      })
      await api.index(this.name, data.id, document)
    }
  }

  async index() {
    await api.createIndex(this.name, this.config)
    const db = strapi.connections.default
    const model = db.model(this.modelName)
    const items = await model.find()
    for (let item of items) {
      const document = {}
      for (let key of this.keys) {
        document[key] = item[key]
      }
      await api.index(this.name, item.id, document)
    }
  }

  async fuzzy(text) {
    const result = await api.fuzzy(this.name, this.keys, text)
    return result.hits.hits.map(hit => {
      const document = {_id: hit._id}
      for (let key of this.keys) {
        document[key] = hit[key]
      }
      return document
    })
  }
}

module.exports = {
  devices: new Search('device', 'Device', {
    name: {type: 'text'},
    description: {type: 'text'},
    keywords: {type: 'text'}
  }),
  cases: new Search('case', 'Case', {
    title: {type: 'text'},
    content: {type: 'text'},
    keywords: {type: 'text'}
  }),
  patterns: new Search('pattern', 'Pattern', {
    title: {type: 'text'},
    content: {type: 'text'},
    keywords: {type: 'text'}
  })
}
