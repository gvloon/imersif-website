'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const slug = require('../../../src/slug')
const search = require('../../../src/search')

module.exports = {
  lifecycles: {
    beforeCreate: async (...params) => {
      slug.beforeCreate('title', ...params)
    },
    beforeUpdate: async (...params) => {
      slug.beforeUpdate('title', ...params)
    },
    afterCreate: async (...params) => {
      await search.afterCreate('pattern', ...params)
    },
    afterUpdate: async (...params) => {
      await search.afterUpdate('pattern', ...params)
    }
  }
}
