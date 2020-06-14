'use strict';

/**
 * Lifecycle callbacks for the `case` model.
 */
const {cases: search} = require('../../../src/search')
const slug = require('../../../src/slug')

module.exports = {
  beforeSave: async model => {
    slug.beforeSave(model, 'name')
  },
  beforeUpdate: async model => {
    slug.beforeUpdate(model, 'name')
  },
  afterCreate: async model => {
    await search.update(model)
  },
  afterUpdate: async model => {
    await search.update(model)
  }
}
