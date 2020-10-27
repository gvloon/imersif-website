'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const util = require('util')
const _ = require('lodash')
const lifecycles = require('lifecycles')('pattern-category')

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      await lifecycles.beforeCreate(data)
    },
    beforeUpdate: async (params, data) => {
      await lifecycles.beforeUpdate(params, data)
    },
    afterCreate: async (result, data) => {
      await update(result._id, data)
      await lifecycles.afterCreate(result, data)
    },
    afterUpdate: async (result, params, data) => {
      await update(result._id, data)
      await lifecycles.afterUpdate(result, params, data)
    }
  }
}

const update = async (id, category) => {
  await removePatternFromCategories(id, category)
  await clearCategory(id, category)
  await updateCategory(id, category)
}

const removePatternFromCategories = async (id, category) => {
  const model = strapi.query('pattern-category').model
  const categories = await model.find(
    {
      _id: { $ne: id },
      patterns: { $in: category.patterns }
    }
  )
  for (let current of categories) {
    const patterns = _.differenceBy(current.patterns, category.patterns, id => id.toString())
    await model.updateOne(
      { _id: current._id },
      { patterns }
    )
  }
}

const clearCategory = async (id, category) => {
  const model = strapi.query('pattern').model
  await model.updateMany(
    {
      _id: { $nin: category.patterns },
      category: id
    },
    {
      $unset: { category: true }
    }
  )
}

const updateCategory = async (id, category) => {
  const model = strapi.query('pattern').model
  await model.updateMany(
    {
      _id: { $in: category.patterns }
    },
    {
      $set: { category: id }
    }
  )
}

