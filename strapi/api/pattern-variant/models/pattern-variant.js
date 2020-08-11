'use strict';

/**
 * Lifecycle callbacks for the `pattern-variant` model.
 */
const slug = require('../../../src/slug')

module.exports = {
  beforeSave: async model => {
    slug.beforeSave(model, 'title')
  },
  beforeUpdate: async model => {
    slug.beforeUpdate(model, 'title')
  },
};
