'use strict';

const db = require('db')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getPatternCategoryShort = ({ slug, name, children }) => ({
  slug,
  name,
  children: children ? children.map(({ slug, name, children }) => ({
    slug,
    name,
    children: children ? children.map(({ slug, name }) => ({ slug, name })) : []
  })) : []
})
const getPatternCategoryLong = ({ slug, name, patterns }) => ({
  slug,
  name,
  patterns: patterns ? patterns.map(pattern => getPattern(pattern)) : []
})
const getPattern = ({ slug, title, image, pros_and_cons, filters }) => ({
  slug,
  title,
  image: image ? getImage(image) : null,
  pros_and_cons: pros_and_cons ? getProsAndCons(pros_and_cons) : null,
  filters: filters ? filters.map(filter => getFilter(filter)) : []
})
const getImage = ({ url }) => ({ url })
const getProsAndCons = ({ pros, cons }) => ({
  pros: pros.map(({ text }) => ({ text })),
  cons: cons.map(({ text }) => ({ text }))
})
const getFilter = ({ name }) => ({ name })

module.exports = {
  async find(ctx) {
    const entities = await db.find('pattern-category', ctx)
    return entities.map(entity => getPatternCategoryShort(entity))
  },
  async findBySlug(ctx) {
    const entity = await db.findBySlug('pattern-category', ctx, [{
      path: 'patterns',
      populate: [{
        path: 'filters'
      }]
    }])
    return getPatternCategoryLong(entity)
  }
}

