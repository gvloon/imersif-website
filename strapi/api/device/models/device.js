'use strict';

/**
 * Lifecycle callbacks for the `device` model.
 */
const slug = require('../../../src/slug')
const {devices: search} = require('../../../src/search')

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
