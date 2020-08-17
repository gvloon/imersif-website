const Model = require('./model')
const { suggestions, merge, stripHtml } = require('./transforms')

class Pattern extends Model {
  constructor() {
    super('pattern', 'Pattern', {
      title: {type: 'text'},
      solution: {type: 'object'},
      keywords: {type: 'text'},
      suggest: {type: 'completion'}
    })
  }

  index(doc) {
    return {
      title: doc.title,
      solution: doc.solution,
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
      solution: doc.solution
    }
  }
}

module.exports = Pattern
