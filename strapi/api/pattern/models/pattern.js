'use strict';

/**
 * Lifecycle callbacks for the `pattern` model.
 */
const slug = require('../../../src/slug')
const search = require('../../../src/search')

module.exports = {
  beforeSave: async model => {
    slug.beforeSave(model, 'title')
  },
  beforeUpdate: async model => {
    slug.beforeUpdate(model, 'title')
  },
  afterCreate: async model => {
    await search.updateIndex('pattern', model)
  },
  afterUpdate: async model => {
    await search.updateIndex('pattern', model)
  }
}
