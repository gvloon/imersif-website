const _ = require('lodash')
const media = require('../media')

const getAnnotation = (obj, data) => {
  if (!obj) return null

  const { text } = obj
  return {
    text,
    index: ++data.annotationIndex
  }
}

const getInteractionStep = (obj, data) => {
  if (!obj) return null

  const { image, annotations } = obj
  return {
    image: media.image(image),
    annotations: _.map(annotations, annotation => getAnnotation(annotation, data))
  }
}

const interactionBlock = obj => {
  if (!obj) return null

  const { title, intro, interaction: steps } = obj
  const data = { annotationIndex: 0 }
  return {
    title,
    intro,
    steps: _.map(steps, step => getInteractionStep(step, data))
  }
}
interactionBlock._name = 'pattern.interaction-block'

module.exports = interactionBlock
