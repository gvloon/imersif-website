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
    await api.createIndex('glossary', {
      term: {type: 'text'},
      explanation: {type: 'text'},
      keywords: {type: 'text'},
      suggest: {type: 'completion'}
    })
    const db = strapi.connections.default
    const model = db.model('Glossary')
    const items = await model.find()
    for (let item of items) {
      await this._index(item)
    }
  }

  async fuzzy(text) {
    const hits = await api.fuzzy('glossary', ['term', 'description', 'keywords'], text)
    return hits.map(({_id, _source}) => ({
      id: _id,
      term: _source.term,
      explanation: _source.explanation,
      keywords: _source.keywords
    }))
  }

  async suggest(text) {
    const options = await api.suggest('glossary', text)
    return options.map(({text}) => ({
      text
    }))
  }

  async _index(doc) {
    const response = await api.index('glossary', doc._id, {
      term: doc.term,
      explanation: stripHtml(doc.explanation),
      suggest: keywords(doc.keywords)
    })
    return response
  }
}

module.exports = Search
