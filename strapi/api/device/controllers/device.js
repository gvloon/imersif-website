'use strict';

const db = require('db')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getDeviceShort = ({ slug, title }) => ({ slug, title })
const getDeviceLong = ({ slug, title, description, device_type, screen, tethering, tracking_type, dof }) => ({
  slug,
  title,
  description,
  device_type: device_type ? getDeviceType(device_type) : null,
  screen: screen ? getScreen(screen) : null,
  tethering: tethering ? getTethering(tethering) : null,
  tracking_type: tracking_type ? getTrackingType(tracking_type) : null,
  dof: dof ? getDof(dof) : null
})
const getDeviceType = ({ slug, name }) => ({ slug, name })
const getScreen = ({ name }) => ({ name })
const getTethering = ({ name }) => ({ name })
const getTrackingType = ({ name }) => ({ name })
const getDof = ({ name }) => ({ name })

module.exports = {
  async find(ctx) {
    const entities = await db.find('device', ctx)
    return entities.map(entity => getDeviceShort(entity))
  },
  async findBySlug(ctx) {
    const entity = await db.findBySlug('device', ctx)
    return getDeviceLong(entity)
  }
}
