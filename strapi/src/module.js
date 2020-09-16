class Module {
  constructor() {
    this.models = {}
  }

  model(modelName) {
    if (!modelName) {
      return null
    }
    if (this.models.hasOwnProperty(modelName)) {
      return this.models[modelName]
    }
    return null
  }

  register(model) {
    this.models[model.name] = model
  }
}

module.exports = Module
