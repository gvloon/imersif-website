class Updater {
  async items(modelName, updater) {
    const db = strapi.connections.default
    const model = db.model(modelName)
    const items = await model.find()
    for (let item of items) {
      updater(item)
      await item.save()
    }
  }
}

module.exports = new Updater()
