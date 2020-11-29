const util = require('util')

const serialize = (obj, components) => {
  const type = obj.__component
  if (components.hasOwnProperty(type)) {
    const result = components[type](obj, components)
    if (result) {
      result.__type = type
    }
    return result
  }
  return null
}

const dynamicZone = (obj, components) => {
  const result = []
  if (!obj || !obj.length)
    return result

  obj.forEach(current => {
    const component = serialize(current, components)
    if (component) {
      result.push(component)
    }
  })

  return result
}
dynamicZone._name = 'common.dynamic-zone'

module.exports = dynamicZone
