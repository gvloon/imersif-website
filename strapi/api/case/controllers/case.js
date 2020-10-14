'use strict';

const db = require('db')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getCaseShort = ({ slug, title }) => ({
  slug,
  title
})
const getCaseLong = ({ slug, title, summary, description, category }) => ({
  slug,
  title,
  summary,
  description,
  category: category ? getCategory(category) : null
})
const getCategory = ({ slug, title }) => ({ slug, title })

module.exports = {
  async find(ctx) {
    const entities = await db.find('case', ctx)
    return entities.map(entity => getCaseShort(entity))
  },
  async findBySlug(ctx) {
    const entity = await db.findBySlug('case', ctx)
    return getCaseLong(entity)
  }
}
