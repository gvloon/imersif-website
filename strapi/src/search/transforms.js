const striptags = require('striptags')

module.exports = {
  keywords: str => ({
    input: str ? str.split(',') : []
  }),
  stripHtml: str => str ? striptags(str) : null
}
