'use strict';

/**
 * Lifecycle callbacks for the `glossary` model.
 */
const {glossary: search} = require('../../../src/search')
const slug = require('../../../src/slug')

module.exports = {
  beforeSave: async model => {
    slug.beforeSave(model, 'term')
  },
  beforeUpdate: async model => {
    slug.beforeUpdate(model, 'term')
  },
  afterCreate: async model => {
    await search.update(model)
  },
  afterUpdate: async model => {
    await search.update(model)
  }
};
