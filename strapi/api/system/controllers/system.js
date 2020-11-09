const search = require('search')
const slug = require('slug')
const update = require('update')
const util = require('util')

module.exports = {
  indexElastic: async () => {
    await search.indexAll()
    return 'ok'
  },

  updateSlugs: async () => {
    await slug.updateAll()
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
        dof: true,
        tethering: true,
        screen: true,
        resolution: true,
        resolution_sort: true,
        tracking_type: true,
        fov: true,
        fov_sort: true
      }
    })
    return 'ok1'
  },

  updatePatterns: async () => {
    const model = strapi.connections.default.model('Pattern')
    model.collection.updateMany({}, {
      $unset: {
        filters: true
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

  updatePatternVariants: async () => {
    const variant = strapi.query('pattern-variant').model
    const variants = await variant.find()
    for (let current of variants) {
      current = current.toJSON()
      const res = await variant.updateOne(
        { _id: current._id },
        {
          $set: { content: current.interactions },
          $unset: { interactions: true, examples: true, additions: true },
        }
      )
    }
    return 'ok'
  },

  updatePatternExamples: async () => {
    const variant = strapi.query('pattern-example').model
    const res = await variant.updateMany({
      $rename: { content: 'content_old' }
    })
    console.log(util.inspect(res))

    return 'ok'
  }


}


