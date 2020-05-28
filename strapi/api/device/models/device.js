'use strict';

/**
 * Lifecycle callbacks for the `device` model.
 */
const {devices: search} = require('../../../src/search')

module.exports = {
  afterCreate: async model => search.update(model),
  afterUpdate: async model => search.update(model)
}
