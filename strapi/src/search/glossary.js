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

  getId(doc) {
    return doc.slug
  }

  getSuggestResult(id, { term }) {
    return {
      link: this._getLink(id),
      title: term
    }
  }

  getSearchResult(id, { term }, highlight) {
    return {
      link: this._getLink(id),
      title: term,
      highlight: highlight.term || highlight.explanation
    }
  }

  _getLink(id) {
    return {
      href: `/glossary#${id}`
    }
  }
}

module.exports = Glossary
