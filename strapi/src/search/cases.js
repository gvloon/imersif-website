const api = require('./api')
const { merge, suggestions, stripHtml } = require('./transforms')

class Search {
  async update(model) {
    const data = model._update
    if (data) {
      await this._index(data)
    }
  }

  async index() {
    await api.createIndex('case', {
      title: {type: 'text'},
      summary: {type: 'text'},
      description: {type: 'text'},
      keywords: {type: 'text'},
      suggest: {type: 'completion'}
    })
    const db = strapi.connections.default
    const model = db.model('Case')
    const items = await model.find()
    for (let item of items) {
      await this._index(item)
    }
  }

  async fuzzy(text) {
    const hits = await api.fuzzy('case', ['title', 'summary', 'description', 'keywords'], text)
    return hits.map(({_id, _source}) => ({
      id: _id,
      title: _source.title,
      summary: _source.summary,
      description: _source.description,
      keywords: _source.keywords
    }))
  }

  async suggest(text) {
    return await api.suggest('case', text)
  }

  async _index(doc) {
    await api.index('case', doc._id, {
      title: doc.title,
      summary: doc.summary,
      description: stripHtml(doc.description),
      keywords: doc.keywords,
      suggest: merge(
        suggestions(doc.title, /\W/, 20),
        suggestions(doc.keywords, /,/, 10)
      )
    })
  }
}

module.exports = Search
