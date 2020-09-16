'use strict';

const db = require('db')
const sort = require('fast-sort')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getPeripheralShort = ({ slug, title }) => ({
  slug,
  title,
})
const getPeripheralLong = ({ slug, title, description, url, peripheral_type }) => ({
  slug,
  title,
  description,
  peripheral_type: peripheral_type ? getPeripheralType(peripheral_type) : null,
  url
})
const getPeripheralType = ({ slug, name }) => ({ slug, name })

const getSorter = field => {
  switch (field) {
    case 'title':
      return 'title'
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
    let entities = await strapi.services.peripheral.find(query)
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

    return entities.map(entity => getPeripheralShort(entity))
  },
  async findBySlug(ctx) {
    const entity = await db.findBySlug('peripheral', ctx)
    return getPeripheralLong(entity)
  }
}
