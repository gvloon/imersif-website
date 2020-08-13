const api = require('./api')
const { merge, suggestions, stripHtml } = require('./transforms')

class Search {
  async update(model) {
    const data = model._update
    if (data) {
      await this._index(data['$set'])
    }
  }

  async index() {
    await api.createIndex('tool', {
      title: {type: 'text'},
      description: {type: 'text'},
      keywords: {type: 'text'},
      suggest: {type: 'completion'}
    })
    const db = strapi.connections.default
    const model = db.model('Tool')
    const items = await model.find()
    for (let item of items) {
      await this._index(item)
    }
  }

  async fuzzy(text) {
    const hits = await api.fuzzy('tool', ['title', 'description', 'keywords'], text)
    return hits.map(({_id, _source}) => ({
      id: _id,
      title: _source.title,
      description: _source.description,
      keywords: _source.keywords
    }))
  }

  async suggest(text) {
    return await api.suggest('tool', text)
  }

  async _index(doc) {
    const response = await api.index('tool', doc._id, {
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
