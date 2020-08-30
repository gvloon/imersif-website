class Model {
  constructor(name, mongoName, definition) {
    this.name = name
    this.mongoName = mongoName
    this.definition = definition
  }
}

module.exports = Model
