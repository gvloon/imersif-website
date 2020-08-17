const Model = require('./model')
const { suggestions, merge, stripHtml } = require('./transforms')

class Glossary extends Model {
  constructor() {
    super('glossary', 'GlossaryItem', {
      term: {type: 'text'},
      explanation: {type: 'text'},
      keywords: {type: 'text'},
      suggest: {type: 'completion'}
    })
  }

  index(doc) {
    return {
      term: doc.term,
      explanation: stripHtml(doc.explanation),
      suggest: merge(
        suggestions(doc.term, /\W/, 20),
        suggestions(doc.keywords, /,/, 10)
      )
    }
  }

  getSuggestTitle(doc) {
    return doc.term
  }

  getSearchSource(doc) {
    return {
      term: doc.term
    }
  }
}

module.exports = Glossary
