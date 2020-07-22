const {devices, cases, patterns, tools} = require('../../../src/search')
const slug = require('../../../src/slug')
const update = require('../../../src/update')

module.exports = {
  indexElastic: async () => {
    await cases.index()
    await devices.index()
    await patterns.index()
    await tools.index()
    return 'ok'
  },

  updateSlugs: async () => {
    await slug.updateAll('Case', 'title')
    await slug.updateAll('CaseCategory', 'title')
    await slug.updateAll('Device', 'title')
    await slug.updateAll('Pattern', 'title')
    await slug.updateAll('PatternCategory', 'name')
    await slug.updateAll('Tool', 'title')
    await slug.updateAll('DeviceType', 'name')
  },

  updateCases: async () => {
    await update.items('Case', item => item.description = item.content)
  },

  updateCaseCategories: async () => {
    await update.items('CaseCategory', item => item.title = item.name)
  },

  updateDevices: async () => {
    await update.items('Device', item => item.title = item.name)
  },

  updatePatterns: async () => {
    await update.items('Pattern', item => item.description = item.content)
  },

  updateTools: async () => {
    await update.items('Tool', item => item.title = item.name)
  },
}


