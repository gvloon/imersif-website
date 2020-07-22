'use strict';

/**
 * Lifecycle callbacks for the `case` model.
 */
const slug = require('../../../src/slug')

module.exports = {
  beforeSave: async model => {
    slug.beforeSave(model, 'name')
  },
  beforeUpdate: async model => {
    slug.beforeUpdate(model, 'name')
  }
}

