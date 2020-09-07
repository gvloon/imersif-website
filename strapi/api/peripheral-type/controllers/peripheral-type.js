'use strict';

const db = require('db')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getPeripheralTypeShort = ({ slug, name }) => ({ slug, name })
const getPeripheralTypeLong = ({ slug, name, peripherals }) => ({
  slug,
  name,
  peripherals: peripherals.map(peripheral => getPeripheral(peripheral))
})
const getPeripheral = ({ slug, title }) => ({ slug, title })

module.exports = {
  async find(ctx) {
    const entities = await db.find('peripheral-type', ctx)
    return entities.map(entity => getPeripheralTypeShort(entity))
  },
  async findBySlug(ctx) {
    const entity = await db.findBySlug('peripheral-type', ctx)
    return getPeripheralTypeLong(entity)
  }
}
