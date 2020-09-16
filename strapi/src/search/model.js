const axios = require('./axios')
const _Model = require('../model')

class Model extends _Model {
  constructor(name, mongoName, definition) {
    super(name)

    this.mongoName = mongoName
    this.definition = definition
  }

  async afterCreate(result, data) {
    await this.index(result)
  }

  async afterUpdate(result, params, data) {
    await this.index(result)
  }

  async index(doc) {
    try {
      const id = this.getId(doc)
      return await axios('put',`/${this.name}/_doc/${id}`, this.serialize(doc))
    } catch (error) {
      console.error(error)
    }
  }

  async indexAll() {
    try {
      await axios('delete', `/${this.name}`)
      await axios('put', `/${this.name}`, {
        mappings: {
          properties: this.definition
        }
      })
      const db = strapi.connections.default
      const dbModel = db.model(this.mongoName)
      const docs = await dbModel.find()
      for (let doc of docs) {
        await this.index(doc)
      }
    } catch (error) {
      console.error(error)
    }
  }

  serialize(doc) {
  }

  getId(doc) {
  }

  getSuggestResult(id, { title }) {
  }

  getSearchResult(id, { title }, highlight) {
  }

}

module.exports = Model
