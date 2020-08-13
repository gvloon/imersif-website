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
    await api.createIndex('glossary', {
      title: {type: 'text'},
      explanation: {type: 'text'},
      keywords: {type: 'text'},
      suggest: {type: 'completion'}
    })
    const db = strapi.connections.default
    const model = db.model('GlossaryItem')
    const items = await model.find()
    for (let item of items) {
      await this._index(item)
    }
  }

  async fuzzy(text) {
    const hits = await api.fuzzy('glossary', ['title', 'description', 'keywords'], text)
    return hits.map(({_id, _source}) => ({
      id: _id,
      title: _source.title,
      explanation: _source.explanation,
      keywords: _source.keywords
    }))
  }

  async suggest(text) {
    return await api.suggest('glossary', text)
  }

  async _index(doc) {
    const response = await api.index('glossary', doc._id, {
      title: doc.term,
      explanation: stripHtml(doc.explanation),
      suggest: merge(
        suggestions(doc.term, /\W/, 20),
        suggestions(doc.keywords, /,/, 10)
      )
    })
    return response
  }
}

module.exports = Search
