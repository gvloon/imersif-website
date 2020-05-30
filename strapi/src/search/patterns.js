const api = require('./api')
const {keywords, stripHtml} = require('./transforms')

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
      content: {type: 'text'},
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
      content: _source.content,
      keywords: _source.keywords
    }))
  }

  async suggest(text) {
    const options = await api.suggest('pattern', text)
    return options.map(({text}) => ({
      text
    }))
  }

  async _index(doc) {
    await api.index('pattern', doc._id, {
      title: doc.title,
      content: stripHtml(doc.content),
      keywords: doc.keywords,
      suggest: keywords(doc.keywords)
    })
  }
}

module.exports = Search
