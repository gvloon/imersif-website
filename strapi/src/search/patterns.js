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
    await api.createIndex('pattern', {
      title: {type: 'text'},
      solution: {type: 'text'},
      keywords: {type: 'text'},
      suggest: {type: 'completion'}
    })
    const db = strapi.connections.default
    const model = db.model('Pattern')
    const items = await model.find()
    for (let item of items) {
      await this._index(item)
    }
  }

  async fuzzy(text) {
    const hits = await api.fuzzy('pattern', ['title', 'content', 'keywords'], text)
    return hits.map(({_id, _source}) => ({
      id: _id,
      title: _source.title,
      solution: _source.solution,
      keywords: _source.keywords
    }))
  }

  async suggest(text) {
    return await api.suggest('pattern', text)
  }

  async _index(doc) {
    await api.index('pattern', doc._id, {
      title: doc.title,
      solution: doc.solution ? doc.solution.what + ' ' + doc.solution.why + ' ' + doc.solution.when + ' ' + doc.solution.how : null,
      keywords: doc.keywords,
      suggest: merge(
        suggestions(doc.title, /\W/, 20),
        suggestions(doc.keywords, /,/, 10)
      )
    })
  }
}

module.exports = Search
