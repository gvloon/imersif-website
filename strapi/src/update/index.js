const util = require('util')

class Updater {

  async items(modelName, updater) {
    const db = strapi.connections.default
    const model = db.model(modelName)
    console.log(model.find())
    const cursor = await model.find()
    while (cursor.hasNext()) {
      const item = cursor.next()
      updater(item)
      await item.save()
    }
  }
}

module.exports = new Updater()
