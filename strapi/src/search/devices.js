const api = require('./api')
const {keywords, stripHtml} = require('./transforms')

class Search {
  async update(model) {
    const data = model._update
    if (data) {
      await this._index(data['$set'])
    }
  }

  async index() {
    await api.createIndex('device', {
      name: {type: 'text'},
      description: {type: 'text'},
      keywords: {type: 'text'},
      suggest: {type: 'completion'}
    })
    const db = strapi.connections.default
    const model = db.model('Device')
    const items = await model.find()
    for (let item of items) {
      await this._index(item)
    }
  }

  async fuzzy(text) {
    const hits = await api.fuzzy('device', ['name', 'description', 'keywords'], text)
    return hits.map(({_id, _source}) => ({
      id: _id,
      name: _source.name,
      description: _source.description,
      keywords: _source.keywords
    }))
  }

  async suggest(text) {
    const options = await api.suggest('device', text)
    return options.map(({text}) => ({
      text
    }))
  }

  async _index(doc) {
    const response = await api.index('device', doc._id, {
      name: doc.name,
      description: stripHtml(doc.description),
      keywords: doc.keywords,
      suggest: keywords(doc.keywords)
    })
    return response
  }
}

module.exports = Search
