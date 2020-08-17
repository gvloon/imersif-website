'use strict';

/**
 * Lifecycle callbacks for the `glossary` model.
 */
const search = require('../../../src/search')
const slug = require('../../../src/slug')

module.exports = {
  beforeSave: async model => {
    slug.beforeSave(model, 'term')
  },
  beforeUpdate: async model => {
    slug.beforeUpdate(model, 'term')
  },
  afterCreate: async model => {
    await search.updateIndex('glossary', model)
  },
  afterUpdate: async model => {
    await search.updateIndex('glossary', model)
  }
};
