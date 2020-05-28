const {devices, cases, patterns} = require('../../../src/search')

module.exports = {
  updateSearch: async () => {
    await devices.index()
    await cases.index()
    await patterns.index()
    return 'ok'
  }
}
