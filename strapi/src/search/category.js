class Category {
  constructor(name, ...models) {
    this.name = name
    this.models = models
    for (let model of models) {
      model.category = name
    }
  }

  getPath() {
    return '/' + this.models.map(model => model.name).join(',') + '/_search'
  }
}

module.exports = Category
