const Model = require('./model')
const { suggestions, merge, stripHtml } = require('./transforms')

class Tool extends Model {
  constructor() {
    super('tool', 'Tool', {
      title: {type: 'text'},
      description: {type: 'text'},
      keywords: {type: 'text'},
      suggest: {type: 'completion'}
    })
  }

  index(doc) {
    return {
      title: doc.title,
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
      highlight: highlight.title || highlight.description || highlight.keywords
    }
  }

  _getLink(id) {
    return {
      href: '/tool/[slug]',
      as: `/tool/${id}`
    }
  }
}

module.exports = Tool
