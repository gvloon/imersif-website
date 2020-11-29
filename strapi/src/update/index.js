const util = require('util')

class Updater {

  async set(modelName, updater) {
    const model = strapi.connections.default.model(modelName)
    const items = await model.find()
    for (let item of items) {
      const update = updater(item.toJSON())
      if (update) {
        await model.updateOne({ _id: item._id }, {
          $set: update
        })
      }
    }
  }

  async remove(modelName, fields) {
    let model = strapi.connections.default.model(modelName)
    await model.collection.updateMany({}, {
      $unset: fields
    })
  }
}

module.exports = new Updater()
