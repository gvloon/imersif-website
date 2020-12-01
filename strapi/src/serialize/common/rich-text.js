const md = require('markdown-it')();

const richText = obj => {
  if (!obj) return null

  const { value } = obj
  return {
    value: md.render(value)
  }
}
richText._name = 'common.rich-text'

module.exports = richText
