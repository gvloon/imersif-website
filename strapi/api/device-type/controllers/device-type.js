'use strict';

const db = require('db')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getDeviceType = ({ id, slug, name, devices }) => ({ id, slug, name, deviceCount: devices.length })

module.exports = {
  async find(ctx) {
    const entities = await db.find('device-type', ctx)
    return entities.map(entity => getDeviceType(entity))
  },
  async findBySlug(ctx) {
    const entity = await db.findBySlug('device-type', ctx)
    return getDeviceType(entity)
  }
}
