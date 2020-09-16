const Transformer = require('../transformer')
const slugify = require('slugify')

class Model extends Transformer {
  constructor(name, modelName, field) {
    super(name, modelName)

    this.field = field

    this.options = {
      lower: true,
      strict: true
    }
    this.regex = /[^\w]/g
  }

  update(data) {
    let value = data[this.field]
    if (value) {
      value = value.replace(this.regex, ' ')
      data.slug = slugify(value, this.options)
    }
  }
}

module.exports = Model
