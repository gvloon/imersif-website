const _ = require('lodash')
const util = require('util')
const dynamicZone = require('../common/dynamic-zone')

const example = (obj, components) => {
  if (!obj) return null

  const { title, intro, content } = obj
  return {
    title: title || null,
    intro: intro || null,
    content: dynamicZone(content, components)
  }
}

const examples = (obj, components) => {
  if (!obj) return null

  const { intro, examples } = obj
  return {
    intro: intro || null,
    examples: _.map(examples, obj => example(obj, components))
  }
}
examples._name = 'pattern.examples'

module.exports = examples

// {
//   __component: 'pattern.examples',
//     title: 'Examples',
//   examples: [
//   {
//     _id: 5f86da758d7ef300512ca412,
//     content: '<Youtube id="2sj2iQyBTQs" />\n\n',
//     title: 'Game app by Pokémon',
//     createdAt: 2020-10-14T11:01:09.538Z,
//   updatedAt: 2020-10-15T15:15:54.266Z,
//   __v: 0,
//   created_by: 5ebe73ced556f900102168e7,
//   updated_by: 5ebe73ced556f900102168e7,
//   id: '5f86da758d7ef300512ca412'
// },
//   [length]: 1
// ],
//   _id: 5fa480675de291000d4aba86,
//   createdAt: 2020-11-05T22:44:55.520Z,
//   updatedAt: 2020-11-05T22:44:55.522Z,
//   __v: 0,
//   id: '5fa480675de291000d4aba86'
// }
