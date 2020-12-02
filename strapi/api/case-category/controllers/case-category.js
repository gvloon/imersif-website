'use strict';

const db = require('db')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getCategoryShort = ({ slug, title, description, children, cases }) => ({
  slug,
  title,
  children: children.map(child => getChild(child)),
  caseCount: cases.length
})
const getCategoryLong = ({ slug, title, description, children, cases }) => ({
  slug,
  title,
  description,
  children: children.map(child => getChild(child)),
  cases: cases.map(useCase => getCase(useCase))
})
const getChild = ({ slug, title }) => ({ slug, title })
const getCase = ({ slug, title, summary, thumbnail, platforms, devices, topic }) => ({
  slug,
  title,
  summary,
  thumbnail,
  platforms: platforms.map(platform => platform.abbreviation),
  devices: devices.map(device => device.title),
  topic
})

module.exports = {
  async find(ctx) {
    const entities = await db.find('case-category', ctx)
    return entities.map(entity => getCategoryShort(entity))
  },
  async findBySlug(ctx) {
    const entity = await db.findBySlug('case-category', ctx, [
      {
        path: 'cases',
        populate: [
          { path: 'platforms' },
          { path: 'devices' }
        ]
      },
      {
        path: 'children'
      }
    ])
    return getCategoryLong(entity)
  }
}
