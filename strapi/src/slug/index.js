const slugify = require('slugify')

class Slug {
  constructor()
  {
    this.options = {
      lower: true,
      strict: true
    }
    this.regex = /[^\w]/g
  }

  beforeCreate(name, data) {
    if (data[name]) {
      data.slug = this._slugify(data[name])
    }
  }

  beforeUpdate(name, params, data) {
    if (data[name]) {
      data.slug = this._slugify(data[name])
    }
  }

  async updateAll(modelName, name) {
    const db = strapi.connections.default
    const model = db.model(modelName)
    const items = await model.find()
    for (let item of items) {
      item.slug = this._slugify(item[name])
      await item.save()
    }
  }

  _slugify(value) {
    value = value.replace(this.regex, ' ')
    return slugify(value, this.options)
  }
}``

module.exports = new Slug()
