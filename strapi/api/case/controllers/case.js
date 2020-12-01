'use strict';

const db = require('db')
const util = require('util')
const { common } = require('serialize')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getCaseShort = ({ slug, title, thumbnail, topic }) => ({
  slug,
  title,
  thumbnail,
  topic
})
const getCaseLong = ({ slug, title, topic, url, content, category, platforms, devices }) => ({
  slug,
  title,
  topic,
  url,
  platforms: platforms.map(platform => platform.name),
  devices: devices.map(device => device.title),
  content: common.dynamicZone(content),
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
    console.log(util.inspect(entity, true, 5))
    return getCaseLong(entity)
  }
}
