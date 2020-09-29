'use strict';

const db = require('db')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getPatternShort = ({ slug, title }) => ({ slug, title })
const getPatternLong = ({ title, solution, image, category, variants }) => ({
  title,
  solution: solution ? getSolution(solution) : null,
  image: image ? getImage(image) : null,
  category: category ? getCategory(category) : null,
  variants: variants.map(variant => getVariant(variant)),
})
const getSolution = ({ what, why, when, how }) => ({ what, why, when, how })
const getImage = ({ url }) => ({ url })
const getCategory = ({ name, slug }) => ({ name, slug })
const getVariant = ({ title, slug, interaction: interactions, examples, additions }) => {
  const data = { annotationIndex: 0 }
  return {
    title,
    slug,
    interactions: interactions.map(interaction => getInteraction(interaction, data)),
    examples: examples.map(example => getExample(example)),
    additions: additions.map(addition => getAddition(addition))
  }
}
const getInteraction = ({ image, annotations }, data) => ({
  image: image ? getImage(image) : null,
  annotations: annotations.map(annotation => getAnnotation(annotation, data))
})
const getAnnotation = ({ text }, data) => ({ text, index: ++data.annotationIndex })
const getExample = ({ title, content }) => ({ title, content })
const getAddition = ({ title, content }) => ({ title, content })

module.exports = {
  async find(ctx) {
    const entities = await db.find('pattern', ctx)
    return entities.map(entity => getPatternShort(entity))
  },
  async findBySlug(ctx) {
    const entity = await db.findBySlug('pattern', ctx)
    return getPatternLong(entity)
  }
}
