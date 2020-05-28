'use strict';

/**
 * Lifecycle callbacks for the `case` model.
 */
const {cases: search} = require('../../../src/search')

module.exports = {
  afterCreate: async model => search.update(model),
  afterUpdate: async model => search.update(model)
}
