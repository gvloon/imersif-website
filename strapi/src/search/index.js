const Cases = require('./cases')
const Devices = require('./devices')
const Patterns = require('./patterns')

module.exports = {
  cases: new Cases(),
  devices: new Devices(),
  patterns: new Patterns()
}
