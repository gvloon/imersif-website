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

  getId(doc) {
    return doc.slug
  }

  getSuggestResult(id, { title }) {
    return {
      link: this._getLink(id),
      title
    }
  }

  getSearchResult(id, { title }, highlight) {
    return {
      link: this._getLink(id),
      title,
      highlight: highlight.title || highlight.summary || highlight.description || highlight.keywords
    }
  }

  _getLink(id) {
    return {
      href: '/case/[slug]',
      as: `/case/${id}`
    }
  }
}

module.exports = Case
