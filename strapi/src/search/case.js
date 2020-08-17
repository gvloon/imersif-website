const Model = require('./model')
const { merge, suggestions, stripHtml } = require('./transforms')

class Case extends Model {
  constructor() {
    super('case', 'Case', {
      title: {type: 'text'},
      summary: {type: 'text'},
      description: {type: 'text'},
      keywords: {type: 'text'},
      suggest: {type: 'completion'}
    })
  }

  index(doc) {
    return {
      title: doc.title,
      summary: doc.summary,
      description: stripHtml(doc.description),
      keywords: doc.keywords,
      suggest: merge(
        suggestions(doc.title, /\W/, 20),
        suggestions(doc.keywords, /,/, 10)
      )
    }
  }

  getSuggestTitle(doc) {
    return doc.title
  }

  getSearchSource(doc) {
    return {
      title: doc.title,
      summary: doc.summary
    }
  }
}

module.exports = Case
