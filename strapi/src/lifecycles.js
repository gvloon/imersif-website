const modules = [
  require('search'),
  require('slug'),
  require('label')
]

module.exports = name => {
  const models = []
  modules.forEach(module => {
    const model = module.model(name)
    if (model != null) {
      models.push(model)
    }
  })
  return {
    beforeCreate: async (...params) => {
      for (let model of models) {
        await model.beforeCreate(...params)
      }
    },
    beforeUpdate: async (...params) => {
      for (let model of models) {
        await model.beforeUpdate(...params)
      }
    },
    afterCreate: async (...params) => {
      for (let model of models) {
        await model.afterCreate(...params)
      }
    },
    afterUpdate: async (...params) => {
      for (let model of models) {
        await model.afterUpdate(...params)
      }
    }
  }
}
