'use strict';

const db = require('db')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getDeviceTypeShort = ({ slug, name }) => ({ slug, name })
const getDeviceTypeLong = ({ slug, name, devices }) => ({
  slug,
  name,
  devices: devices.map(device => getDevice(device))
})
const getDevice = ({ slug, title }) => ({ slug, title })

module.exports = {
  async find(ctx) {
    const entities = await db.find('device-type', ctx)
    return entities.map(entity => getDeviceTypeShort(entity))
  },
  async findBySlug(ctx) {
    const entity = await db.findBySlug('device-type', ctx)
    return getDeviceTypeLong(entity)
  }
}
