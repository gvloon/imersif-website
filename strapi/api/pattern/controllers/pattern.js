'use strict';

const config = require('config')
const db = require('db')
const _ = require('lodash')
const util = require('util')
const { media, common } = require('serialize')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getPatternShort = ({ slug, title }) => ({ slug, title })
const getPatternLong = ({ title, solution, image, category, variants }) => ({
  title,
  solution: solution ? getSolution(solution) : null,
  image: media.upload(image),
  category: category ? getCategory(category) : null,
  variants: variants.map(variant => variant ? getVariant(variant) : null),
})
const getSolution = ({ what, why, when, how }) => ({ what, why, when, how })
const getCategory = ({ name, slug }) => ({ name, slug })
const getVariant = ({ title, slug, content, filters }) => ({
  title,
  slug,
  content: common.dynamicZone(content),
  filters: filters.map(filter => filter ? getFilter(filter) : null)
})
const getFilter = ({ name, icon }) => ({
  name,
  icon: icon ? config.mediaUrl + icon.url : null
})

module.exports = {
  async find(ctx) {
    const entities = await db.find('pattern', ctx)
    return entities.map(entity => getPatternShort(entity))
  },
  async findBySlug(ctx) {
    const entity = await db.findBySlug('pattern', ctx, [
      {
        path: 'variants',
        populate: [
          {
            path: 'filters'
          }
        ],
      },
      {
        path: 'category'
      }
    ])
    return getPatternLong(entity)
  }
}
