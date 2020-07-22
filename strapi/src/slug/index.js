const slugify = require('slugify')

class Slug {
  constructor()
  {
    this.options = {
      lower: true,
      strict: true
    }
    this.regex = /[.]/g
  }

  beforeSave(model, name) {
    if (model[name]) {
      model.slug = this._slugify(model[name])
    }
  }

  beforeUpdate(model, name) {
    const update = model.getUpdate()
    if (update && update[name]) {
      model.update({
        slug: this._slugify(update[name])
      })
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
}

module.exports = new Slug()
