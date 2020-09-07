'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
const search = require('search')
const slug = require('slug')

module.exports = {
  lifecycles: {
    beforeCreate: async (...params) => {
      slug.beforeCreate('name', ...params)
    },
    beforeUpdate: async (...params) => {
      slug.beforeUpdate('name', ...params)
    },
    afterCreate: async (...params) => {
      await search.afterCreate('case', ...params)
    },
    afterUpdate: async (...params) => {
      await search.afterUpdate('case', ...params)
    }
  }
}
