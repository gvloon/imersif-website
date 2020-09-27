const Model = require('./model')
const { suggestions, merge } = require('./transforms')

class Pattern extends Model {
  constructor() {
    super('pattern', 'Pattern', {
      title: {type: 'text'},
      solution: {type: 'object'},
      keywords: {type: 'text'},
      suggest: {type: 'completion'}
    })
  }

  serialize(doc) {
    return {
      title: doc.title,
      solution: doc.solution && doc.solution.length ? doc.solution[0].ref : null,
      keywords: doc.keywords,
      suggest: merge(
        suggestions(doc.title, /\W/, 20),
        suggestions(doc.keywords, /,/, 10)
      )
    }
  }

  getId(doc) {
    return doc.slug
  }

  getSuggestResult(id, { title }) {
    return {
      link: this._getLink(id),
      title
    }
  }

  getSearchResult(id, { title, solution }, highlight) {
    return {
      link: this._getLink(id),
      title,
      highlight: highlight.title
                  || highlight['solution.what']
                  || highlight['solution.how']
                  || highlight['solution.why']
                  || highlight['solution.when']
                  || highlight.keywords
    }
  }

  _getLink(id) {
    return {
      url: '/pattern/[slug]',
      as: `/pattern/${id}`
    }
  }
}

module.exports = Pattern
