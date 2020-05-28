'use strict';

/**
 * Lifecycle callbacks for the `pattern` model.
 */
const {patterns: search} = require('../../../src/search')

module.exports = {
  afterCreate: async model => search.update(model),
  afterUpdate: async model => search.update(model)
}
