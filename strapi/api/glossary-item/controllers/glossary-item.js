'use strict';

const db = require('db')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getGlossaryItem = ({ slug, term, explanation }) => ({ slug, term, explanation })

module.exports = {
  async find(ctx) {
    const entities = await db.find('glossary-item', ctx)
    return entities.map(entity => getGlossaryItem(entity))
  },
  async findBySlug(ctx) {
    const entity = await db.findBySlug('glossary-item', ctx)
    return getGlossaryItem(entity)
  }
}
