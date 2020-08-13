const {devices, cases, patterns, tools, glossary} = require('../../../src/search')
const slug = require('../../../src/slug')
const update = require('../../../src/update')

module.exports = {
  indexElastic: async () => {
    await cases.index()
    await devices.index()
    await patterns.index()
    await tools.index()
    await glossary.index()
    return 'ok'
  },

  updateSlugs: async () => {
    await slug.updateAll('Case', 'title')
    await slug.updateAll('CaseCategory', 'title')
    await slug.updateAll('Device', 'title')
    await slug.updateAll('Pattern', 'title')
    await slug.updateAll('PatternCategory', 'name')
    await slug.updateAll('PatternVariant', 'title')
    await slug.updateAll('Tool', 'title')
    await slug.updateAll('DeviceType', 'name')
  },

  updateCases: async () => {
    const model = strapi.connections.default.model('Case')
    model.collection.updateMany({}, {
      $unset: {
        categories: true,
        platform_old: true,
        platform: true,
        content: true
      }
    })
  },

  updateCaseCategories: async () => {
    await update.items('CaseCategory', item => item.title = item.name)
  },

  updateDevices: async () => {
    const model = strapi.connections.default.model('Device')
    model.collection.updateMany({}, {
      $unset: {
        xr_type: true,
        device_types: true
      },
      $rename: {
        device_dof: 'dof',
        device_screen: 'screen',
        device_tracking_type: 'tracking_type',
        device_tethering: 'tethering'
      }
    })
  },

  updatePatterns: async () => {
    const model = strapi.connections.default.model('Pattern')
    model.collection.updateMany({}, {
      $unset: {
        description: true,
        test: true,
        supported: true,
        media: true
      }
    })
  },

  updateTools: async () => {
    const model = strapi.connections.default.model('Tool')
    model.collection.updateMany({}, {
      $unset: {
        name: true
      }
    })
  },
}


