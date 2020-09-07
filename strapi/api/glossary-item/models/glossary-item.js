'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const search = require('../../../src/search')
const slug = require('../../../src/slug')

module.exports = {
  lifecycles: {
    beforeCreate: async (...params) => {
      slug.beforeCreate('term', ...params)
    },
    beforeUpdate: async (...params) => {
      slug.beforeUpdate('term', ...params)
    },
    afterCreate: async (...params) => {
      await search.afterCreate('glossary', ...params)
    },
    afterUpdate: async (...params) => {
      await search.afterUpdate('glossary', ...params)
    }
  }
};
