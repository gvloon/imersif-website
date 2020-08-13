const api = require('./api')
const Cases = require('./cases')
const Devices = require('./devices')
const Glossary = require('./glossary')
const Patterns = require('./patterns')
const Tools = require('./tools')

module.exports = {
  api,
  cases: new Cases(),
  devices: new Devices(),
  glossary: new Glossary(),
  patterns: new Patterns(),
  tools: new Tools()
}
