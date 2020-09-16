'use strict';

const db = require('db')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getPeripheralType = ({ id, slug, name, peripherals }) => ({ id, slug, name, peripheralCount: peripherals.length })

module.exports = {
  async find(ctx) {
    const entities = await db.find('peripheral-type', ctx)
    return entities.map(entity => getPeripheralType(entity))
  },
  async findBySlug(ctx) {
    const entity = await db.findBySlug('peripheral-type', ctx)
    return getPeripheralType(entity)
  }
}
