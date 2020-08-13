const api = require('./api')
const { suggestions, merge, stripHtml } = require('./transforms')

class Search {
  async update(model) {
    const data = model._update
    if (data) {
      await this._index(data['$set'])
    }
  }

  async index() {
    await api.createIndex('device', {
      title: {type: 'text'},
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
    const hits = await api.fuzzy('device', ['title', 'description', 'keywords'], text)
    return hits.map(({_id, _source}) => ({
      id: _id,
      title: _source.title,
      description: _source.description,
      keywords: _source.keywords
    }))
  }

  async suggest(text) {
    return await api.suggest('device', text)
  }

  async _index(doc) {
    const response = await api.index('device', doc._id, {
      title: doc.title,
      description: stripHtml(doc.description),
      keywords: doc.keywords,
      suggest: merge(
        suggestions(doc.title, /\W/, 20),
        suggestions(doc.keywords, /,/, 10)
      )
    })
    return response
  }
}

module.exports = Search
