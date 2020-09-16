'use strict';

const db = require('db')
const { sanitizeEntity } = require('strapi-utils');
const util = require('util')
const sort = require('fast-sort')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getDeviceShort = ({ slug, title, display, tethering, tracking_type, dof, fov, resolution }) => ({
  slug,
  title,
  display: display ? getDisplay(display) : null,
  tethering: tethering ? getTethering(tethering) : null,
  tracking_type: tracking_type ? getTrackingType(tracking_type) : null,
  dof: dof ? getDof(dof) : null,
  fov: fov ? getFov(fov): null,
  resolution: resolution ? getResolution(resolution) : ''
})
const getDeviceLong = ({ slug, title, description, url, device_type, display, tethering, tracking_type, dof, fov, resolution }) => ({
  slug,
  title,
  description,
  url,
  device_type: device_type ? getDeviceType(device_type) : null,
  display: display ? getDisplay(display) : null,
  tethering: tethering ? getTethering(tethering) : null,
  tracking_type: tracking_type ? getTrackingType(tracking_type) : null,
  dof: dof ? getDof(dof) : null,
  fov: fov ? getFov(fov): null,
  resolution: resolution ? getResolution(resolution) : ''
})
const getDeviceType = ({ slug, name }) => ({ slug, name })
const getDisplay = ({ name }) => name
const getTethering = ({ name }) => name
const getTrackingType = ({ name }) => name
const getDof = ({ name }) => name
const getResolution = ({ width, height }) => width + 'x' + height
const getFov = ({ text }) => text
const getSorter = field => {
  switch (field) {
    case 'title':
      return 'title'
    case 'display':
      return ({ display }) => display ? display.name : null
    case 'tethering':
      return ({ tethering }) => tethering ? tethering.name : null
    case 'tracking_type':
      return ({ tracking_type }) => tracking_type ? tracking_type : null
    case 'dof':
      return ({ dof }) => dof ? dof.sort : null
    case 'resolution':
      return ({ resolution }) => resolution ? resolution.width * resolution.height : null
    case 'fov':
      return ({ fov }) => fov ? fov.sort : null
    default:
      return null
  }
}

module.exports = {
  async find(ctx) {
    const query = { ...ctx.query }
    delete query._sort
    delete query._limit
    delete query._start
    let entities = await strapi.services.device.find(query)
    if (ctx.query._sort) {
      const [field, direction] = ctx.query._sort.split(':')
      const sorter = getSorter(field)
      if (sorter) {
        if (direction === 'desc') {
          entities = sort(entities).desc(sorter)
        } else {
          entities = sort(entities).asc(sorter)
        }
      }
    }
    if (ctx.query._limit) {
      const start = parseInt(ctx.query._start) || 0
      const limit = parseInt(ctx.query._limit) || 10
      entities = entities.slice(start, start + limit)
    }

    return entities.map(entity => getDeviceShort(entity))
  },
  async findBySlug(ctx) {
    const entity = await db.findBySlug('device', ctx)
    return getDeviceLong(entity)
  }
}
