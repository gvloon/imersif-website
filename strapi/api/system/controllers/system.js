const search = require('../../../src/search')
const slug = require('../../../src/slug')
const update = require('../../../src/update')

module.exports = {
  indexElastic: async () => {
    await search.deleteIndex('case')
    await search.deleteIndex('device')
    await search.deleteIndex('pattern')
    await search.deleteIndex('tool')
    await search.deleteIndex('glossary')
    await search.indexAll('case')
    await search.indexAll('device')
    await search.indexAll('pattern')
    await search.indexAll('tool')
    await search.indexAll('glossary')
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
    return 'ok'
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
    return 'ok'
  },

  updateCaseCategories: async () => {
    await update.items('CaseCategory', item => item.title = item.name)
    return 'ok'
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
    return 'ok'
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
    return 'ok'
  },

  updateTools: async () => {
    const model = strapi.connections.default.model('Tool')
    model.collection.updateMany({}, {
      $unset: {
        name: true
      }
    })
    return 'ok'
  },
}


