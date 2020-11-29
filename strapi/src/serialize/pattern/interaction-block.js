const _ = require('lodash')
const media = require('../media')
const util = require('util')

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

  return {
    media: media.upload(obj.media),
    annotations: _.map(obj.annotations, annotation => getAnnotation(annotation, data))
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
