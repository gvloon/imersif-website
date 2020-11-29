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
    await update.remove('PatternVariant', {
      $unset: {
        slug: true,
        supported: true,
        platforms: true,
        pattern: true,
        pros_and_cons: true,
        subtitle: true,
        examples: true,
        additions: true,
        interaction: true,
        interactions: true
      }
    })
    await update.set('ComponentPatternInteractionStep', item => {
      if (item.image) {
        return {
          media: [item.image]
        }
      }
      return null
    })
    await update.remove('ComponentPatternInteractionStep', {
      image: true
    })

    return 'ok'
  },

  updatePatternExamples: async () => {
    const variant = strapi.query('pattern-example').model
    const res = await variant.updateMany({
      $rename: { content: 'content_old' }
    })

    return 'ok'
  }


}


