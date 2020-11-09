const components = {}

const merge = path => {
  const serializers = require(path)
  for (let i in serializers) {
    const serializer = serializers[i]
    components[serializer._name] = serializer
  }
  return serializers
}

const inject = (serializers, components) => {
  for (let i in serializers) {
    const serializer = serializers[i]
    serializers[i] = obj => serializer(obj, components)
  }
  return serializers
}

let media = merge('./media')
let pattern = merge('./pattern')
let common = merge('./common')

module.exports = {
  media: inject(media, components),
  pattern: inject(pattern, components),
  common: inject(common, components)
}
