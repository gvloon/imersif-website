const Module = require('../module')

class Label extends Module {
  constructor()
  {
    super()

//    this.register(new Device())
  }

  async updateAll() {
    for (let model of this.models) {
      await model.updateAll()
    }
  }
}

module.exports = new Label()
