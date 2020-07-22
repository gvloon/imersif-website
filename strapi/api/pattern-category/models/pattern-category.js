'use strict';

/**
 * Lifecycle callbacks for the `pattern-category` model.
 */
const slug = require('../../../src/slug')
const util = require('util')

module.exports = {
  beforeSave: async (model, attrs, options) => {
    console.log('model: ' + util.inspect(model))
    console.log('attrs: ' + util.inspect(attrs))
    console.log('options: ' + util.inspect(options))
    slug.beforeSave(model, 'name')
  },
  beforeUpdate: async (model, attrs, options) => {
    console.log('model: ' + util.inspect(model))
    console.log('attrs: ' + util.inspect(attrs))
    console.log('options: ' + util.inspect(options))
    slug.beforeUpdate(model, 'name')
  }
}
