const Model = require('model')

class Transformer extends Model
{
  constructor(name, modelName) {
    super(name)

    this.modelName = modelName
  }

  update(data) {
  }

  beforeCreate(data) {
    this.update(data)
  }

  beforeUpdate(params, data) {
    this.update(data)
  }

  async updateAll() {
    const db = strapi.connections.default
    const model = db.model(this.modelName)
    const items = await model.find()
    for (let item of items) {
      this.update(item)
      await item.save()
    }
  }
}

module.exports = Transformer

