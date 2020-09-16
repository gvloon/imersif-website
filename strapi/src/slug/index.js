const Module = require('../module')
const Model = require('./model')
const util = require('util')

class Slug extends Module {
  constructor()
  {
    super()

    this.register(new Model('case', 'Case', 'title'))
    this.register(new Model('case-category', 'CaseCategory', 'title'))
    this.register(new Model('device', 'Device', 'title'))
    this.register(new Model('device-type', 'DeviceType', 'name'))
    this.register(new Model('peripheral', 'Peripheral', 'title'))
    this.register(new Model('peripheral-type', 'PeripheralType', 'name'))
    this.register(new Model('pattern', 'Pattern', 'title'))
    this.register(new Model('pattern-category', 'PatternCategory', 'name'))
    this.register(new Model('tool', 'Tool', 'title'))
  }

  async updateAll() {
    for (let model of this.models) {
      await model.updateAll()
    }
  }
}

module.exports = new Slug()
