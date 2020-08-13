const striptags = require('striptags')

module.exports = {
  suggestions: (str, delimiter, weight) => ({
    values: str ? str.split(delimiter) : [],
    weight
  }),
  merge: (...items) => {
    const result = []
    for (let item of items) {
       for (let value of item.values) {
         result.push({
           input: value,
           weight: item.weight
         })
       }
    }
    return result
  },
  stripHtml: str => str ? striptags(str) : null
}
