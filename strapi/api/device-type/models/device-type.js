'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const slug = require('../../../src/slug')

module.exports = {
  lifecycles: {
    beforeCreate: async (...params) => {
      slug.beforeCreate('name', ...params)
    },
    beforeUpdate: async (...params) => {
      slug.beforeUpdate('name', ...params)
    }
  }
}

