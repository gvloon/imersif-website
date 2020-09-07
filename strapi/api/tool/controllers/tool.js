'use strict';

const db = require('db')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getToolShort = ({ slug, title }) => ({ slug, title })
const getToolLong = ({ slug, title, description }) => ({
  slug,
  title,
  description
})

module.exports = {
  async find(ctx) {
    const entities = await db.find('tool', ctx)
    return entities.map(entity => getToolShort(entity))
  },
  async findBySlug(ctx) {
    const entity = await db.findBySlug('tool', ctx)
    return getToolLong(entity)
  }
}
