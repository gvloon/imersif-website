'use strict';

const db = require('db')
const { common } = require('serialize')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const entity = await db.findOne('hardware-page')
    return common.page(entity)
  }
}
