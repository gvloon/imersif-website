const Model = require('./model')
const { suggestions, merge, stripHtml } = require('./transforms')

class Device extends Model {
  constructor() {
    super('device', 'Device', {
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

  getSuggestTitle(doc) {
    return doc.title
  }

  getSearchSource(doc) {
    return {
      title: doc.title
    }
  }
}

module.exports = Device
