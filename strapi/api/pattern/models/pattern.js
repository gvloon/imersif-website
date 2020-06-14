'use strict';

/**
 * Lifecycle callbacks for the `pattern` model.
 */
const slug = require('../../../src/slug')
const { patterns: search } = require('../../../src/search')

module.exports = {
  beforeSave: async model => {
    slug.beforeSave(model, 'title')
  },
  beforeUpdate: async model => {
    slug.beforeUpdate(model, 'title')
  },
  afterCreate: async model => {
    await search.update(model)
  },
  afterUpdate: async model => {
    await search.update(model)
  }
}
